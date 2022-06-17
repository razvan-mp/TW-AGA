'use strict';

let util = newUtil();
let inliner = newInliner();
let fontFaces = newFontFaces();
let images = newImages();

let defaultOptions = {
    imagePlaceholder: undefined, cacheBust: false
};

let domtoimage = {
    toSvg: toSvg, toJpeg: toJpeg, toBlob: toBlob, impl: {
        fontFaces: fontFaces, images: images, util: util, inliner: inliner, options: {}
    }
};

function toSvg(node, options) {
    options = options || {};
    copyOptions(options);
    return Promise.resolve(node)
        .then(function (node) {
            return cloneNode(node, options.filter, true);
        })
        .then(embedFonts)
        .then(inlineImages)
        .then(applyOptions)
        .then(function (clone) {
            return makeSvgDataUri(clone, options.width || util.width(node), options.height || util.height(node));
        });

    function applyOptions(clone) {
        if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;

        if (options.width) clone.style.width = options.width + 'px';
        if (options.height) clone.style.height = options.height + 'px';

        if (options.style) Object.keys(options.style).forEach(function (property) {
            clone.style[property] = options.style[property];
        });

        return clone;
    }
}

function toJpeg(node, options) {
    options = options || {};
    return draw(node, options)
        .then(function (canvas) {
            return canvas.toDataURL('image/jpeg', options.quality || 1.0);
        });
}

function toBlob(node, options) {
    return draw(node, options || {})
        .then(util.canvasToBlob);
}

function copyOptions(options) {
    if (typeof (options.imagePlaceholder) === 'undefined') {
        domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
    } else {
        domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
    }

    if (typeof (options.cacheBust) === 'undefined') {
        domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
    } else {
        domtoimage.impl.options.cacheBust = options.cacheBust;
    }
}

function draw(domNode, options) {
    return toSvg(domNode, options)
        .then(util.makeImage)
        .then(util.delay(100))
        .then(function (image) {
            let canvas = newCanvas(domNode);
            canvas.getContext('2d').drawImage(image, 0, 0);
            return canvas;
        });

    function newCanvas(domNode) {
        let canvas = document.createElement('canvas');
        canvas.width = options.width || util.width(domNode);
        canvas.height = options.height || util.height(domNode);

        if (options.bgcolor) {
            let ctx = canvas.getContext('2d');
            ctx.fillStyle = options.bgcolor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        return canvas;
    }
}

function cloneNode(node, filter, root) {
    if (!root && filter && !filter(node)) return Promise.resolve();

    return Promise.resolve(node)
        .then(makeNodeCopy)
        .then(function (clone) {
            return cloneChildren(node, clone, filter);
        })
        .then(function (clone) {
            return processClone(node, clone);
        });

    function makeNodeCopy(node) {
        if (node instanceof HTMLCanvasElement) return util.makeImage(node.toDataURL());
        return node.cloneNode(false);
    }

    function cloneChildren(original, clone, filter) {
        let children = original.childNodes;
        if (children.length === 0) return Promise.resolve(clone);

        return cloneChildrenInOrder(clone, util.asArray(children), filter)
            .then(function () {
                return clone;
            });

        function cloneChildrenInOrder(parent, children, filter) {
            let done = Promise.resolve();
            children.forEach(function (child) {
                done = done
                    .then(function () {
                        return cloneNode(child, filter);
                    })
                    .then(function (childClone) {
                        if (childClone) parent.appendChild(childClone);
                    });
            });
            return done;
        }
    }

    function processClone(original, clone) {
        if (!(clone instanceof Element)) return clone;

        return Promise.resolve()
            .then(cloneStyle)
            .then(clonePseudoElements)
            .then(copyUserInput)
            .then(fixSvg)
            .then(function () {
                return clone;
            });

        function cloneStyle() {
            copyStyle(window.getComputedStyle(original), clone.style);

            function copyStyle(source, target) {
                if (source.cssText) target.cssText = source.cssText; else copyProperties(source, target);

                function copyProperties(source, target) {
                    util.asArray(source).forEach(function (name) {
                        target.setProperty(name, source.getPropertyValue(name), source.getPropertyPriority(name));
                    });
                }
            }
        }

        function clonePseudoElements() {
            [':before', ':after'].forEach(function (element) {
                clonePseudoElement(element);
            });

            function clonePseudoElement(element) {
                let style = window.getComputedStyle(original, element);
                let content = style.getPropertyValue('content');

                if (content === '' || content === 'none') return;

                let className = util.uid();
                clone.className = clone.className + ' ' + className;
                let styleElement = document.createElement('style');
                styleElement.appendChild(formatPseudoElementStyle(className, element, style));
                clone.appendChild(styleElement);

                function formatPseudoElementStyle(className, element, style) {
                    let selector = '.' + className + ':' + element;
                    let cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
                    return document.createTextNode(selector + '{' + cssText + '}');

                    function formatCssText(style) {
                        let content = style.getPropertyValue('content');
                        return style.cssText + ' content: ' + content + ';';
                    }

                    function formatCssProperties(style) {

                        return util.asArray(style)
                            .map(formatProperty)
                            .join('; ') + ';';

                        function formatProperty(name) {
                            return name + ': ' + style.getPropertyValue(name) + (style.getPropertyPriority(name) ? ' !important' : '');
                        }
                    }
                }
            }
        }

        function copyUserInput() {
            if (original instanceof HTMLTextAreaElement) clone.innerHTML = original.value;
            if (original instanceof HTMLInputElement) clone.setAttribute("value", original.value);
        }

        function fixSvg() {
            if (!(clone instanceof SVGElement)) return;
            clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

            if (!(clone instanceof SVGRectElement)) return;
            ['width', 'height'].forEach(function (attribute) {
                let value = clone.getAttribute(attribute);
                if (!value) return;

                clone.style.setProperty(attribute, value);
            });
        }
    }
}

function embedFonts(node) {
    return fontFaces.resolveAll()
        .then(function (cssText) {
            let styleNode = document.createElement('style');
            node.appendChild(styleNode);
            styleNode.appendChild(document.createTextNode(cssText));
            return node;
        });
}

function inlineImages(node) {
    return images.inlineAll(node)
        .then(function () {
            return node;
        });
}

function makeSvgDataUri(node, width, height) {
    return Promise.resolve(node)
        .then(function (node) {
            node.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
            return new XMLSerializer().serializeToString(node);
        })
        .then(util.escapeXhtml)
        .then(function (xhtml) {
            return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>';
        })
        .then(function (foreignObject) {
            return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' + foreignObject + '</svg>';
        })
        .then(function (svg) {
            return 'data:image/svg+xml;charset=utf-8,' + svg;
        });
}

function newUtil() {
    return {
        escape: escape,
        mimeType: mimeType,
        dataAsUrl: dataAsUrl,
        isDataUrl: isDataUrl,
        canvasToBlob: canvasToBlob,
        resolveUrl: resolveUrl,
        getAndEncode: getAndEncode,
        uid: uid(),
        delay: delay,
        asArray: asArray,
        escapeXhtml: escapeXhtml,
        makeImage: makeImage,
        width: width,
        height: height
    };

    function mimes() {
        let WOFF = 'application/font-woff';
        let JPEG = 'image/jpeg';

        return {
            'woff': WOFF,
            'woff2': WOFF,
            'ttf': 'application/font-truetype',
            'eot': 'application/vnd.ms-fontobject',
            'png': 'image/png',
            'jpg': JPEG,
            'jpeg': JPEG,
            'gif': 'image/gif',
            'tiff': 'image/tiff',
            'svg': 'image/svg+xml'
        };
    }

    function parseExtension(url) {
        let match = /\.([^\.\/]*?)$/g.exec(url);
        if (match) return match[1]; else return '';
    }

    function mimeType(url) {
        let extension = parseExtension(url).toLowerCase();
        return mimes()[extension] || '';
    }

    function isDataUrl(url) {
        return url.search(/^(data:)/) !== -1;
    }

    function toBlob(canvas) {
        return new Promise(function (resolve) {
            let binaryString = window.atob(canvas.toDataURL().split(',')[1]);
            let length = binaryString.length;
            let binaryArray = new Uint8Array(length);

            for (let i = 0; i < length; i++) binaryArray[i] = binaryString.charCodeAt(i);

            resolve(new Blob([binaryArray], {
                type: 'image/png'
            }));
        });
    }

    function canvasToBlob(canvas) {
        if (canvas.toBlob) return new Promise(function (resolve) {
            canvas.toBlob(resolve);
        });

        return toBlob(canvas);
    }

    function resolveUrl(url, baseUrl) {
        let doc = document.implementation.createHTMLDocument();
        let base = doc.createElement('base');
        doc.head.appendChild(base);
        let a = doc.createElement('a');
        doc.body.appendChild(a);
        base.href = baseUrl;
        a.href = url;
        return a.href;
    }

    function uid() {
        let index = 0;

        return function () {
            return 'u' + fourRandomChars() + index++;

            function fourRandomChars() {
                return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
            }
        };
    }

    function makeImage(uri) {
        return new Promise(function (resolve, reject) {
            let image = new Image();
            image.onload = function () {
                resolve(image);
            };
            image.onerror = reject;
            image.src = uri;
        });
    }

    function getAndEncode(url) {
        let TIMEOUT = 30000;
        if (domtoimage.impl.options.cacheBust) {
            // bypass pentru cache ca sa nu fie probleme cu CORS
            url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
        }

        return new Promise(function (resolve) {
            let request = new XMLHttpRequest();

            request.onreadystatechange = done;
            request.ontimeout = timeout;
            request.responseType = 'blob';
            request.timeout = TIMEOUT;
            request.open('GET', url, true);
            request.send();

            let placeholder;
            if (domtoimage.impl.options.imagePlaceholder) {
                let split = domtoimage.impl.options.imagePlaceholder.split(/,/);
                if (split && split[1]) {
                    placeholder = split[1];
                }
            }

            function done() {
                if (request.readyState !== 4) return;

                if (request.status !== 200) {
                    if (placeholder) {
                        resolve(placeholder);
                    } else {
                        fail('cannot fetch resource: ' + url + ', status: ' + request.status);
                    }

                    return;
                }

                let encoder = new FileReader();
                encoder.onloadend = function () {
                    let content = encoder.result.split(/,/)[1];
                    resolve(content);
                };
                encoder.readAsDataURL(request.response);
            }

            function timeout() {
                if (placeholder) {
                    resolve(placeholder);
                } else {
                    fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
                }
            }

            function fail(message) {
                console.error(message);
                resolve('');
            }
        });
    }

    function dataAsUrl(content, type) {
        return 'data:' + type + ';base64,' + content;
    }

    function escape(string) {
        return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
    }

    function delay(ms) {
        return function (arg) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(arg);
                }, ms);
            });
        };
    }

    function asArray(arrayLike) {
        let array = [];
        let length = arrayLike.length;
        for (let i = 0; i < length; i++) array.push(arrayLike[i]);
        return array;
    }

    function escapeXhtml(string) {
        return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
    }

    function width(node) {
        let leftBorder = px(node, 'border-left-width');
        let rightBorder = px(node, 'border-right-width');
        return node.scrollWidth + leftBorder + rightBorder;
    }

    function height(node) {
        let topBorder = px(node, 'border-top-width');
        let bottomBorder = px(node, 'border-bottom-width');
        return node.scrollHeight + topBorder + bottomBorder;
    }

    function px(node, styleProperty) {
        let value = window.getComputedStyle(node).getPropertyValue(styleProperty);
        return parseFloat(value.replace('px', ''));
    }
}

function newInliner() {
    let URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

    return {
        inlineAll: inlineAll, shouldProcess: shouldProcess, impl: {
            inline: inline
        }
    };

    function shouldProcess(string) {
        return string.search(URL_REGEX) !== -1;
    }

    function readUrls(string) {
        let result = [];
        let match;
        while ((match = URL_REGEX.exec(string)) !== null) {
            result.push(match[1]);
        }
        return result.filter(function (url) {
            return !util.isDataUrl(url);
        });
    }

    function inline(string, url, baseUrl, get) {
        return Promise.resolve(url)
            .then(function (url) {
                return baseUrl ? util.resolveUrl(url, baseUrl) : url;
            })
            .then(get || util.getAndEncode)
            .then(function (data) {
                return util.dataAsUrl(data, util.mimeType(url));
            })
            .then(function (dataUrl) {
                return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
            });

        function urlAsRegex(url) {
            return new RegExp('(url\\([\'"]?)(' + util.escape(url) + ')([\'"]?\\))', 'g');
        }
    }

    function inlineAll(string, baseUrl, get) {
        if (nothingToInline()) return Promise.resolve(string);

        return Promise.resolve(string)
            .then(readUrls)
            .then(function (urls) {
                let done = Promise.resolve(string);
                urls.forEach(function (url) {
                    done = done.then(function (string) {
                        return inline(string, url, baseUrl, get);
                    });
                });
                return done;
            });

        function nothingToInline() {
            return !shouldProcess(string);
        }
    }
}

function newFontFaces() {
    return {
        resolveAll: resolveAll, impl: {}
    };

    function resolveAll() {
        return readAll(document)
            .then(function (webFonts) {
                return Promise.all(webFonts.map(function (webFont) {
                    return webFont.resolve();
                }));
            })
            .then(function (cssStrings) {
                return cssStrings.join('\n');
            });
    }

    function readAll() {
        return Promise.resolve(util.asArray(document.styleSheets))
            .then(getCssRules)
            .then(selectWebFontRules)
            .then(function (rules) {
                return rules.map(newWebFont);
            });

        function selectWebFontRules(cssRules) {
            return cssRules
                .filter(function (rule) {
                    return rule.type === CSSRule.FONT_FACE_RULE;
                })
                .filter(function (rule) {
                    return inliner.shouldProcess(rule.style.getPropertyValue('src'));
                });
        }

        function getCssRules(styleSheets) {
            let cssRules = [];
            styleSheets.forEach(function (sheet) {
                try {
                    util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
                } catch (e) {
                    console.log('Error while reading CSS rules from ' + sheet.href, e.toString());
                }
            });
            return cssRules;
        }

        function newWebFont(webFontRule) {
            return {
                resolve: function resolve() {
                    let baseUrl = (webFontRule.parentStyleSheet || {}).href;
                    return inliner.inlineAll(webFontRule.cssText, baseUrl);
                }, src: function () {
                    return webFontRule.style.getPropertyValue('src');
                }
            };
        }
    }
}

function newImages() {
    return {
        inlineAll: inlineAll, impl: {}
    };

    function newImage(element) {
        return {
            inline: inline
        };

        function inline(get) {
            if (util.isDataUrl(element.src)) return Promise.resolve();

            return Promise.resolve(element.src)
                .then(get || util.getAndEncode)
                .then(function (data) {
                    return util.dataAsUrl(data, util.mimeType(element.src));
                })
                .then(function (dataUrl) {
                    return new Promise(function (resolve, reject) {
                        element.onload = resolve;
                        element.onerror = reject;
                        element.src = dataUrl;
                    });
                });
        }
    }

    function inlineAll(node) {
        if (!(node instanceof Element)) return Promise.resolve(node);

        return inlineBackground(node)
            .then(function () {
                if (node instanceof HTMLImageElement) return newImage(node).inline(); else return Promise.all(util.asArray(node.childNodes).map(function (child) {
                    return inlineAll(child);
                }));
            });

        function inlineBackground(node) {
            let background = node.style.getPropertyValue('background');

            if (!background) return Promise.resolve(node);

            return inliner.inlineAll(background)
                .then(function (inlined) {
                    node.style.setProperty('background', inlined, node.style.getPropertyPriority('background'));
                })
                .then(function () {
                    return node;
                });
        }
    }
}

function getStatsImage(chart, format) {
    let outputName = ''
    let node;
    if (chart === 'bar') {
        outputName = 'top-10-awarded'
        node = document.getElementsByClassName('card-bar')
    } else {
        outputName = 'percentage-won'
        node = document.getElementsByClassName('card-pie')
    }

    let oldW = node[0].style.width
    let oldH = node[0].style.height
    node[0].style.height = '100%'
    node[0].style.width = '100%'

    if (format === 'svg') {
        domtoimage.toSvg(node[0]).then(function (dataUrl) {
            node[0].style.width = oldW
            node[0].style.height = oldH
            let link = document.createElement('a');
            link.download = outputName + '.svg';
            link.href = dataUrl;
            link.click();
        }).catch(function (error) {
            console.error('Error on image save: ', error)
        })
    } else {
        domtoimage.toJpeg(node[0]).then(function (dataUrl) {
            node[0].style.width = oldW
            node[0].style.height = oldH
            let link = document.createElement('a');
            link.download = outputName + '.webp';
            link.href = dataUrl;
            link.click();
        }).catch(function (error) {
            console.error('Error on image save: ', error)
        })
    }
}

function getCSV(chart) {
    let outputName = ''
    if (chart === 'bar') {
        outputName = 'top-10-awarded.csv'
    } else {
        outputName = 'percentage-won.csv'
    }

    let top10 = new Promise((res, rej) => {
            let requestURL = "http://localhost:5000/api/topActors"
            let request = new XMLHttpRequest()
            request.open('GET', requestURL, true)
            request.send()

            request.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    res(JSON.parse(request.responseText))
                }
            }
        })

    top10.then(res => {
        if(chart === 'bar'){
            let csvContent = 'Name, Won count\n'

            for (let i = 0; i < 10; i++)
                csvContent += res[i]["NAME"] + "," + res[i]["WonCount"] + "\n"

            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
            hiddenElement.target = '_blank';
            hiddenElement.download = outputName;
            hiddenElement.click();
        }
        else {
            let csvContent = 'Name, Won percentage\n'

            for (let i = 0; i < 10; i++)
            {
                let percentage = (res[i]["WonCount"] / res[i]["total"]) * 100
                csvContent += res[i]["NAME"] + "," + percentage + "\n"
            }

            let hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
            hiddenElement.target = '_blank';
            hiddenElement.download = outputName;
            hiddenElement.click();
        }
    })
}

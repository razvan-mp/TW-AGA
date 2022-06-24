hexColors = ["#9B59B6", "#F1C40F", "#3498DB", "#27b7b7", "#2ECC71", "#16A085"]
hexColorsBg = ["#d47bfc", "#f6d778", "#71b9e3", "#76c7c7", "#73ce98", "#6db29b"]

function getTopActors() {
    return new Promise((res, rej) => {
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
}

let chartjson = {
    "title": "Top 10 Most Awarded Actors",
    "data": '',
    "ymax": 100,
    "ykey": "WonCount",
    "xkey": "NAME"
}

function generateCharts(r) {
    return new Promise((res, rej) => {
        let pieCharts = document.querySelector(".pie-charts")

        for (let j = 0; j < 6; j++) {
            let percent = (r[j]["WonCount"] / r[j]["total"]) * 100
            pieCharts.innerHTML += "<div class = 'pie-chart' " +
                "data-name='" + r[j]["NAME"] + "' " +
                "data-percentage=" + percent + " " +
                "data-fill-color=" + hexColors[j] + " " +
                "data-bg-color=" + hexColorsBg[j] + " " +
                "data-diameter='300' " +
                "data-stroke-width='20'></div>"
        }

        res("")
    })
}

getTopActors().then(r => {

    generateCharts(r).then(res => {
        let pieCharts = document.querySelectorAll('.pie-chart');

        Array.prototype.forEach.call(pieCharts, function (wrapperEl) {
            let dataset = wrapperEl.dataset;
            let actorName = dataset.name;
            let percentage = dataset.percentage ? parseInt(dataset.percentage, 10) : 0;
            let diameter = dataset.diameter ? parseInt(dataset.diameter, 10) : 150;
            let strokeWidth = dataset.strokeWidth ? parseInt(dataset.strokeWidth, 10) : 15;
            let fillColor = dataset.fillColor || '#f47b28';
            let bgColor = dataset.bgColor || '#fac5a1';

            wrapperEl.style.height = diameter + 'px';
            wrapperEl.style.width = diameter + 'px';
            let percentageEl = document.createElement('span');
            percentageEl.classList.add('pie-chart__percentage');
            percentageEl.style.color = fillColor;
            percentageEl.innerText = actorName + "\n won \n" + percentage + "%" + "\nawards";
            wrapperEl.appendChild(percentageEl);

            let center = diameter;
            let radius = center - (strokeWidth);
            let startAngle = degreesToRadians(-90);
            let fullCircle = degreesToRadians(365);
            let endAngle = startAngle + degreesToRadians(percentage / 100 * 365);

            let canvas = document.createElement('canvas');
            canvas.classList.add('pie-chart__canvas');
            canvas.height = diameter * 2;
            canvas.width = diameter * 2;
            let ctx = canvas.getContext('2d');
            ctx.lineWidth = strokeWidth * 2;
            ctx.strokeStyle = bgColor;
            ctx.beginPath();
            ctx.arc(center, center, radius, startAngle, fullCircle);
            ctx.stroke();
            ctx.strokeStyle = fillColor;
            ctx.beginPath();
            ctx.arc(center, center, radius, startAngle, endAngle);
            ctx.stroke();

            wrapperEl.appendChild(canvas);
        });

        function degreesToRadians(degrees) {
            return (degrees / 360) * (2 * Math.PI);
        }
    })

    for (let i = r.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [r[i], r[j]] = [r[j], r[i]];
    }
    chartjson.data = r
    let colors = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
    let TROW = 'tr',
        TDATA = 'td';

    let chart = document.createElement('div');
    let barchart = document.createElement('table');
    let titlerow = document.createElement(TROW);
    let titledata = document.createElement(TDATA);
    titledata.setAttribute('colspan', chartjson.data.length + 1);
    titledata.setAttribute('class', 'charttitle');
    titledata.innerText = chartjson.title;
    titlerow.appendChild(titledata);
    barchart.appendChild(titlerow);
    chart.appendChild(barchart);

    let barrow = document.createElement(TROW);

    for (let i = 0; i < chartjson.data.length; i++) {
        barrow.setAttribute('class', 'bars');
        //create the bar data
        let bardata = document.createElement(TDATA);
        let bar = document.createElement('div');
        bar.setAttribute('class', colors[i]);
        bar.style.height = (parseInt(chartjson.data[i][chartjson.ykey]) * 35).toString() + 'px';
        bardata.innerText = chartjson.data[i][chartjson.ykey];
        bardata.appendChild(bar);
        barrow.appendChild(bardata);
    }

//create legends
    let legendrow = document.createElement(TROW);
    let legend = document.createElement(TDATA);
    legend.setAttribute('class', 'legend');
    legend.setAttribute('colspan', chartjson.data.length);

//add legend data
    for (let i = 0; i < chartjson.data.length; i++) {
        let legbox = document.createElement('span');
        legbox.setAttribute('class', 'legbox');
        let barname = document.createElement('span');
        barname.setAttribute('class', colors[i] + ' xaxisname');
        let bartext = document.createElement('span');
        bartext.innerText = chartjson.data[i][chartjson.xkey];
        legbox.appendChild(barname);
        legbox.appendChild(bartext);
        legend.appendChild(legbox);
    }
    barrow.appendChild(legend);
    barchart.appendChild(barrow);
    barchart.appendChild(legendrow);
    chart.appendChild(barchart);
    document.getElementById('chart').innerHTML = chart.outerHTML;
})

function getAllYearStats() {
    return new Promise((res, rej) => {
        let requestURL = "http://localhost:5000/api/all_time"
        let request = new XMLHttpRequest()
        request.open('GET', requestURL, true)
        request.send()

        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(request.responseText)
                let yearList = []
                let wonList = []
                let totalList = []
                let loserList = []
                for (let i = 0; i < response.length; i++) {
                    yearList.push(response[i]['YEAR'])
                    wonList.push(response[i]['WINS'])
                    totalList.push(response[i]['TOTAL'])
                    loserList.push(response[i]['LOSSES'])
                }
                let resolveValue = []
                resolveValue.push(yearList.reverse())
                resolveValue.push(wonList.reverse())
                resolveValue.push(totalList.reverse())
                resolveValue.push(loserList.reverse())

                res(resolveValue)
            }
        }
    })
}

getAllYearStats().then(r => {
    let lineChart = new Chart("won-chart", {
        type: "line",
        data: {
            labels: r[0],
            datasets: [{
                data: r[1],
                borderColor: "lightgreen",
                fill: false,
                label: 'Number of winners'
            }, {
                data: r[2],
                borderColor: "lightblue",
                fill: false,
                label: 'Total number of nominations'
            }, {
                data: r[3],
                borderColor: "magenta",
                fill: false,
                label: 'Number of losers'
            }]
        },
        options: {
            legend: {
                display: true,
                position: "right"
            }
        }
    })
})
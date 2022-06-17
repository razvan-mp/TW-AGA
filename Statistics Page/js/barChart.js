hexColors = ["#9B59B6", "#F1C40F", "#3498DB", "#27b7b7", "#2ECC71", "#16A085"]
hexColorsBg = [ "#d47bfc", "#f6d778", "#71b9e3", "#76c7c7", "#73ce98", "#6db29b"]
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
                "data-percentage=" + percent + " "+
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
            // Pull our letiables out of our helper div
            let dataset = wrapperEl.dataset;
            let actorName = dataset.name;
            let percentage = dataset.percentage ? parseInt(dataset.percentage, 10) : 0;
            let diameter = dataset.diameter ? parseInt(dataset.diameter, 10) : 150;
            let strokeWidth = dataset.strokeWidth ? parseInt(dataset.strokeWidth, 10) : 15;
            let fillColor = dataset.fillColor || '#f47b28'; // orange
            let bgColor = dataset.bgColor || '#fac5a1'; // light orange

            // Size our wrapper element and add our percentage
            wrapperEl.style.height = diameter + 'px';
            wrapperEl.style.width = diameter + 'px';
            let percentageEl = document.createElement('span');
            percentageEl.classList.add('pie-chart__percentage');
            percentageEl.style.color = fillColor;
            percentageEl.innerText = actorName + "\n won \n" + percentage + "%" + "\nawards";
            wrapperEl.appendChild(percentageEl);

            // Setting up the values we're gonna use to draw our circles
            let center = diameter;
            let radius = center - (strokeWidth);
            let startAngle = degreesToRadians(-90);
            let fullCircle = degreesToRadians(365);
            let endAngle = startAngle + degreesToRadians(percentage / 100 * 365);

            // Draw our canvas! Note we're doubling our sizes so we look good on high res displays
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
//create the chart canvas
    let barchart = document.createElement('table');
//create the title row
    let titlerow = document.createElement(TROW);
//create the title data
    let titledata = document.createElement(TDATA);
//make the colspan to number of records
    titledata.setAttribute('colspan', chartjson.data.length + 1);
    titledata.setAttribute('class', 'charttitle');
    titledata.innerText = chartjson.title;
    titlerow.appendChild(titledata);
    barchart.appendChild(titlerow);
    chart.appendChild(barchart);

//create the bar row
    let barrow = document.createElement(TROW);

//lets add data to the chart
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



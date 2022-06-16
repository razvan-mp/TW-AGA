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
    "ykey": "NumberOfAwards",
    "xkey": "NAME"
}

getTopActors().then(r => {
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
        console.log(chartjson.data[i][chartjson.ykey])
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



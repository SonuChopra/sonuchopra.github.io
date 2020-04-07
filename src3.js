let COUNTRY = "US";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setDate(param) {
    var dateParts = param.substring(0, 10).split('-');
    myDate = dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0];
    document.getElementById("p-date").innerHTML = "Last updated " + myDate;
}

function setDaysLeft(param) {
    document.getElementById("h1-body-days-displayed").innerHTML = param;
    document.getElementById("h1-display-days-left").innerHTML = param;
}

function setConfirmed(param1, param2) {
    document.getElementById("table-confirmed-total").innerHTML = numberWithCommas(param1);
    document.getElementById("table-confirmed-new").innerHTML = numberWithCommas(param2);
}

function setRecovered(param1, param2) {
    document.getElementById("table-recovered-total").innerHTML = numberWithCommas(param1);
    document.getElementById("table-recovered-new").innerHTML = numberWithCommas(param2);
}

function setDeaths(param1, param2) {
    document.getElementById("table-deaths-total").innerHTML = numberWithCommas(param1);
    document.getElementById("table-deaths-new").innerHTML = numberWithCommas(param2);
}


function getTodaysData(data) {
    return data[COUNTRY][data[COUNTRY].length - 1];
}

function getTodaysNewConfirmed(data) {
    return data[COUNTRY][data[COUNTRY].length - 1].confirmed - data[COUNTRY][data[COUNTRY].length - 2].confirmed;
}

function getTodaysNewRecovered(data) {
    return data[COUNTRY][data[COUNTRY].length - 1].recovered - data[COUNTRY][data[COUNTRY].length - 2].recovered;
}

function getTodaysNewDeaths(data) {
    return data[COUNTRY][data[COUNTRY].length - 1].deaths - data[COUNTRY][data[COUNTRY].length - 2].deaths;
}

function getTodaysRateConfirmed(data) {
    return (((data[COUNTRY][data[COUNTRY].length - 1].newConfirmed - data[COUNTRY][data[COUNTRY].length - 2].newConfirmed) / data[COUNTRY][data[COUNTRY].length - 2].newConfirmed) * 100)
}

function getTodaysRateRecovered(data) {
    return ((data[COUNTRY][data[COUNTRY].length - 1].newRecovered - data[COUNTRY][data[COUNTRY].length - 2].newRecovered) / data[COUNTRY][data[COUNTRY].length - 2].newRecovered) * 100
}

function getTodaysRateDeaths(data) {
    return ((data[COUNTRY][data[COUNTRY].length - 1].newDeaths - data[COUNTRY][data[COUNTRY].length - 2].newDeaths) / data[COUNTRY][data[COUNTRY].length - 2].newDeaths) * 100
}

function setTodaysConfirmedRate(param1) {
    document.getElementById("table-confirmed-rate").innerHTML = param1 + "%";
    if (param1 > 0) {
        document.getElementById("table-confirmed-arrow").style.color = "red"
        document.getElementById("table-confirmed-arrow").innerHTML = "&#8679;";
    }
    else if (param1 < 0) {
        document.getElementById("table-confirmed-arrow").style.color = "green"
        document.getElementById("table-confirmed-arrow").innerHTML = "&#8681;";
    }
    else {
        document.getElementById("table-confirmed-arrow").innerHTML = "&#9473;";
    }
}

function setTodaysRecoveredRate(param1) {
    document.getElementById("table-recovered-rate").innerHTML = param1 + "%";
    if (param1 > 0) {
        document.getElementById("table-recovered-arrow").style.color = "green"
        document.getElementById("table-recovered-arrow").innerHTML = "&#8679;";
    }
    else if (param1 < 0) {
        document.getElementById("table-recovered-arrow").style.color = "red"
        document.getElementById("table-recovered-arrow").innerHTML = "&#8681;";
    }
    else {
        document.getElementById("table-recovered-arrow").innerHTML = "&#9473;";
    }
}

function setTodaysDeathsRate(param1) {
    document.getElementById("table-deaths-rate").innerHTML = param1 + "%";
    if (param1 > 0) {
        document.getElementById("table-deaths-arrow").style.color = "red"
        document.getElementById("table-deaths-arrow").innerHTML = "&#8679;";
    }
    else if (param1 < 0) {
        document.getElementById("table-deaths-arrow").style.color = "green"
        document.getElementById("table-deaths-arrow").innerHTML = "&#8681;";
    }
    else {
        document.getElementById("table-deaths-arrow").innerHTML = "&#9473;";
    }
}

function setNewForAll(data) {
    data[COUNTRY][0].newConfirmed = 0;
    for (let i = 1; i < data[COUNTRY].length; i++) {
        data[COUNTRY][i].newConfirmed = data[COUNTRY][i].confirmed - data[COUNTRY][i-1].confirmed
        data[COUNTRY][i].newRecovered = data[COUNTRY][i].recovered - data[COUNTRY][i-1].recovered
        data[COUNTRY][i].newDeaths = data[COUNTRY][i].deaths - data[COUNTRY][i-1].deaths
    }
}

function setGraphBar(confirmed, recovered, deaths) {
    let MAX_WIDTH = 800;
    if (confirmed > recovered && confirmed > deaths) {
        document.getElementById("div-confirmed-progress").style.width = MAX_WIDTH + "px";
        document.getElementById("div-recovered-progress").style.width = parseInt((recovered / confirmed * MAX_WIDTH), 10) + "px";
        document.getElementById("div-deaths-progress").style.width = parseInt((deaths / confirmed * MAX_WIDTH), 10) + "px";
    }
}

function barGraph(data) {
    let leftShift = 0;
    let MAXCONFIRMED = Math.max(...(data[COUNTRY].map(a => parseInt(a.newConfirmed, 10))));
    for (let i = data[COUNTRY].length - 20; i < data[COUNTRY].length; i++) {
        let height = ((data[COUNTRY][i].newConfirmed/MAXCONFIRMED)*200 < 20)? 20: (data[COUNTRY][i].newConfirmed/MAXCONFIRMED)*200;
        
        let newLabel = document.createElement("P");
        newLabel.innerHTML = "+" + data[COUNTRY][i].newConfirmed;
        newLabel.className = "div-bar-label";
        newLabel.style.top = "0px";
        newLabel.style.margin = "0px";
        newLabel.style.textAlign = "center";
        newLabel.style.fontSize = "8px";

        var dateParts = data[COUNTRY][i].date.substring(0, 10).split('-');
        myDate = dateParts[1] + '/' + dateParts[2];

        let dateLabel = document.createElement("P");
        dateLabel.innerHTML = myDate;
        dateLabel.className = "div-bar-label";
        dateLabel.style.bottom = "0px";
        dateLabel.style.margin = "0px";
        dateLabel.style.textAlign = "center";
        dateLabel.style.fontSize = "8px";

        let newDiv = document.createElement("DIV");
        newDiv.className = "div-bar";
        newDiv.style.height = height + "px";
        newDiv.style.top = (200 - height) + "px";
        newDiv.style.left = leftShift + "px";
        leftShift = leftShift + 40;

        document.getElementById("div-bar-graph").appendChild(newDiv);
        newDiv.appendChild(newLabel);
        newDiv.appendChild(dateLabel);
    }

    let lastUpdated = data[COUNTRY][data[COUNTRY].length-1].date.substring(0, 10).split('-');
    lastUpdatedDate = lastUpdated[1] + '/' + lastUpdated[2] + '/' + lastUpdated[0];

    let barTitle = document.createElement("P");
    barTitle.innerHTML = "New confirmed cases by date for past 20 days from " + lastUpdatedDate;
    barTitle.id = "p-bar-graph-title";
    document.getElementById("div-bar-graph").appendChild(barTitle);


}

fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json())
    .then((data) => {

        setDate(data[COUNTRY][data[COUNTRY].length - 1].date);

        setConfirmed(getTodaysData(data).confirmed, getTodaysNewConfirmed(data));
        setRecovered(getTodaysData(data).recovered, getTodaysNewRecovered(data));
        setDeaths(getTodaysData(data).deaths, getTodaysNewDeaths(data));
        setNewForAll(data);

        setTodaysConfirmedRate(parseInt(getTodaysRateConfirmed(data), 10));
        setTodaysRecoveredRate(parseInt(getTodaysRateRecovered(data), 10));
        setTodaysDeathsRate(parseInt(getTodaysRateDeaths(data), 10));

        setGraphBar(getTodaysData(data).confirmed, getTodaysData(data).recovered, getTodaysData(data).deaths);

        barGraph(data);
    });






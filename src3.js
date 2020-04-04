let COUNTRY = "US";

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setDate(param) {
    let lastUpdatedDate = new Date(param);
    document.getElementById("p-date").innerHTML = "Last updated " + lastUpdatedDate.toDateString();
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
        document.getElementById("table-confirmed-arrow").innerHTML = "&#8681;";
    } 
    else if(param1 < 0) {
        document.getElementById("table-confirmed-arrow").style.color = "green"
        document.getElementById("table-confirmed-arrow").innerHTML = "&#8679;";
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
    else if(param1 < 0) {
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
        document.getElementById("table-deaths-arrow").innerHTML = "&#8681;";
    } 
    else if(param1 < 0) {
        document.getElementById("table-deaths-arrow").style.color = "green"
        document.getElementById("table-deaths-arrow").innerHTML = "&#8679;";
    }
    else {
        document.getElementById("table-deaths-arrow").innerHTML = "&#9473;";
    }
}

function setNewForTodayAndYesturdayData(data) {
    data[COUNTRY][data[COUNTRY].length - 1].newConfirmed = data[COUNTRY][data[COUNTRY].length - 1].confirmed - data[COUNTRY][data[COUNTRY].length - 2].confirmed
    data[COUNTRY][data[COUNTRY].length - 1].newRecovered = data[COUNTRY][data[COUNTRY].length - 1].recovered - data[COUNTRY][data[COUNTRY].length - 2].recovered
    data[COUNTRY][data[COUNTRY].length - 1].newDeaths = data[COUNTRY][data[COUNTRY].length - 1].deaths - data[COUNTRY][data[COUNTRY].length - 2].deaths

    data[COUNTRY][data[COUNTRY].length - 2].newConfirmed = data[COUNTRY][data[COUNTRY].length - 2].confirmed - data[COUNTRY][data[COUNTRY].length - 3].confirmed
    data[COUNTRY][data[COUNTRY].length - 2].newRecovered = data[COUNTRY][data[COUNTRY].length - 2].recovered - data[COUNTRY][data[COUNTRY].length - 3].recovered
    data[COUNTRY][data[COUNTRY].length - 2].newDeaths = data[COUNTRY][data[COUNTRY].length - 2].deaths - data[COUNTRY][data[COUNTRY].length - 3].deaths
}

function setGraphBar(confirmed, recovered, deaths){
    let MAX_WIDTH = 800;
    if (confirmed > recovered && confirmed > deaths){
        document.getElementById("div-confirmed-progress").style.width = MAX_WIDTH + "px";
        document.getElementById("div-recovered-progress").style.width = parseInt((recovered/confirmed*MAX_WIDTH), 10) + "px";
        document.getElementById("div-deaths-progress").style.width = parseInt((deaths/confirmed*MAX_WIDTH), 10) + "px";
    }
}

fetch("https://pomber.github.io/covid19/timeseries.json")
    .then(response => response.json())
    .then((data) => {

        setDate(data[COUNTRY][data[COUNTRY].length - 1].date);

        setConfirmed(getTodaysData(data).confirmed, getTodaysNewConfirmed(data));
        setRecovered(getTodaysData(data).recovered, getTodaysNewRecovered(data));
        setDeaths(getTodaysData(data).deaths, getTodaysNewDeaths(data));
        setNewForTodayAndYesturdayData(data);

        setTodaysConfirmedRate(parseInt(getTodaysRateConfirmed(data), 10));
        setTodaysRecoveredRate(parseInt(getTodaysRateRecovered(data), 10));
        setTodaysDeathsRate(parseInt(getTodaysRateDeaths(data), 10));

        setGraphBar(getTodaysData(data).confirmed, getTodaysData(data).recovered, getTodaysData(data).deaths);

    });






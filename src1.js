let COUNTRY = "US";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setDate(param) {
  let lastUpdatedDate = new Date(param);
  document.getElementById("h3-top-center-div-label").innerHTML = "As of " + lastUpdatedDate.toDateString();
}

function setDaysLeft(param) {
  document.getElementById("h1-body-days-displayed").innerHTML = param;
  document.getElementById("h1-display-days-left").innerHTML = param;
}

function setConfirmed(param1, param2) {
  document.getElementById("h3-bottom-section-label-infected").innerHTML = "Confirmed " + numberWithCommas(param1) + " (+" + numberWithCommas(param2) + ")";
}

function setRecovered(param1, param2) {
  document.getElementById("h3-bottom-section-label-recovered").innerHTML = "Recovered " + numberWithCommas(param1) + " (+" + numberWithCommas(param2) + ")";
}

function setDeaths(param1, param2) {
  document.getElementById("h3-bottom-section-label-deaths").innerHTML = "Deaths " + numberWithCommas(param1) + " (+" + numberWithCommas(param2) + ")";
}

function getDaysLeft() {
  let today = new Date();
  if (today.getMonth() === 3) {
    return 45 - (today.getDate() - 3);
  } else if (today.getMonth() === 4) {
    return 45 - (today.getDate() - 30);
  }
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
  document.getElementById("h4-img-top-section-text-confirmed").innerHTML = Math.abs(parseInt(param1, 10)) + "%";
  if (param1 >= 0) {
    document.getElementById("h4-img-top-section-text-confirmed").style.color = "rgb(250, 109, 98)"
    document.getElementById("img-top-section-arrows-confirmed").src = "uparrow.png";
  } else {
    document.getElementById("h4-img-top-section-text-confirmed").style.color = "rgb(50,205,50)"
    document.getElementById("img-top-section-arrows-confirmed").src = "downarrow.png";
  }
}

function setTodaysCoveredRate(param1) {
  document.getElementById("h4-img-top-section-text-recovered").innerHTML = Math.abs(parseInt(param1, 10)) + "%";
  if (param1 >= 0) {
    document.getElementById("h4-img-top-section-text-recovered").style.color = "rgb(50,205,50)"
    document.getElementById("img-top-section-arrows-recovered").src = "uparrow.png";
  } else {
    document.getElementById("h4-img-top-section-text-recovered").style.color = "rgb(250, 109, 98)"
    document.getElementById("img-top-section-arrows-recovered").src = "downarrow.png";
  }
}

function setTodaysDeathsRate(param1) {
  document.getElementById("h4-img-top-section-text-deaths").innerHTML = Math.abs(parseInt(param1, 10)) + "%";
  if (param1 >= 0) {
    document.getElementById("h4-img-top-section-text-deaths").style.color = "rgb(250, 109, 98)"
    document.getElementById("img-top-section-arrows-deaths").src = "uparrow.png";
  } else {
    document.getElementById("h4-img-top-section-text-deaths").style.color = "rgb(50,205,50)"
    document.getElementById("img-top-section-arrows-deaths").src = "downarrow.png";
  }
}

function getYBasedOnX(perm) {
  return ((2.165) * perm);
}

function pushMenitaCloser() {
  document.getElementById("img-body-menita").style.left = (document.getElementById("img-body-menita").offsetLeft + 5) + "px";
  let newY = getYBasedOnX(document.getElementById("img-body-menita").offsetLeft);
  document.getElementById("img-body-menita").style.top = parseInt(newY, 10) + "px";
}

function placeMenita(perm) {
  let today = new Date();
  let todaysDate;
  if (today.getMonth() === 3) {
    todaysDate = today.getDate() - 3;
  } else if (today.getMonth() === 4) {
    todaysDate = today.getDate() + 27
  }
  for (let i = 0; i < todaysDate; i++) {
    pushMenitaCloser();
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

function setPicture(confirmRate, recoverRate, deathRate) {
  let goodPoints = 0;
  if (confirmRate < 0) {
    goodPoints = goodPoints + 1;
  }
  if (recoverRate > 0) {
    goodPoints = goodPoints + 1;
  }
  if (deathRate < 0) {
    goodPoints = goodPoints + 1;
  }
  if (goodPoints === 3) {
    document.getElementById("img-body-face").src = "5.png";
  }
  if (goodPoints === 0) {
    document.getElementById("img-body-face").style.width = "340px";
    document.getElementById("img-body-face").style.height = "auto";
    document.getElementById("img-body-face").style.left = "74%";
    document.getElementById("img-body-face").src = "1.png";
  }
  if (goodPoints === 1) {
    document.getElementById("img-body-face").src = "4.png";
  }
  if (goodPoints === 2) {
    document.getElementById("img-body-face").src = "7.png";
  }
  if (recoverRate > 20 && goodPoints == 2) {
    document.getElementById("img-body-face").style.width = "380px";
    document.getElementById("img-body-face").style.height = "auto";
    document.getElementById("img-body-face").style.left = "74%";
    document.getElementById("img-body-face").src = "8.png";
  }
  if (confirmRate > 10 && goodPoints == 1) {
    document.getElementById("img-body-face").src = "2.png";
  }
  if (confirmRate < 10 && goodPoints == 1) {
    document.getElementById("img-body-face").src = "6.png";
  }
}

let shaked = true;

function shakeImage() {
  setTimeout(function () {
    if(shaked){
      document.getElementById("img-body-face").style.transform = "rotate(30deg)";
      shaked = false;
    } else {
      document.getElementById("img-body-face").style.transform = "rotate(15deg)";
      shaked = true;
    }
    shakeImage();
  }, 1000);
}

fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then((data) => {

    setDate(getTodaysData(data).date);
    setDaysLeft(getDaysLeft());
    setConfirmed(getTodaysData(data).confirmed, getTodaysNewConfirmed(data));
    setRecovered(getTodaysData(data).recovered, getTodaysNewRecovered(data));
    setDeaths(getTodaysData(data).deaths, getTodaysNewDeaths(data));
    setNewForTodayAndYesturdayData(data);

    let rateConfirmed = getTodaysRateConfirmed(data);
    let rateRecovered = getTodaysRateRecovered(data);
    let rateDeaths = getTodaysRateDeaths(data);

    setTodaysConfirmedRate(rateConfirmed);
    setTodaysCoveredRate(rateRecovered);
    setTodaysDeathsRate(rateDeaths);

    setPicture(rateConfirmed, rateRecovered, rateDeaths);

    placeMenita();
    shakeImage();

  });






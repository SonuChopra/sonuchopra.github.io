function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var optForBar = {
  events: false,
  tooltips: {
    enabled: false
  },
  hover: {
    animationDuration: 0
  },
  title: {
    display: true,
    text: 'New Cases by Day',
    fontSize: 24
  },
  animation: {
    duration: 1,
    onComplete: function () {
      var chartInstance = this.chart,
        ctx = chartInstance.ctx;
      ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      this.data.datasets.forEach(function (dataset, i) {
        var meta = chartInstance.controller.getDatasetMeta(i);
        meta.data.forEach(function (bar, index) {
          var data = dataset.data[index];
          ctx.fillText(data, bar._model.x, bar._model.y - 5);
        });
      });
    }
  }
};

fetch("https://pomber.github.io/covid19/timeseries.json")
  .then(response => response.json())
  .then((data) => {

    let countriesSelector = document.getElementById("select-countries");
    Object.getOwnPropertyNames(data).forEach((country) => {
      var option = document.createElement("option");
      option.text = country.toString();
      countriesSelector.add(option);
    })

    document.getElementById("range-select-days").value = data[document.getElementById("select-countries").value].length;
    document.getElementById("h3-days").innerHTML = data[document.getElementById("select-countries").value].length + " days"

    document.getElementById("select-countries").value = "US"
    refreshPage(data, "US", 1);

    document.getElementById("select-countries").addEventListener("change", function () {
      refreshPage(data, document.getElementById("select-countries").value);
    });

    document.getElementById("range-select-days").addEventListener("click", function () {
      refreshPage(data, document.getElementById("select-countries").value, 1);
    });
  });


function refreshPage(data, country) {
  data[country][0].newConfirmed = 0;
  data[country][0].newRecovered = 0;
  data[country][0].newDeaths = 0;
  for (let i = 1; i < data[country].length; i++) {
    data[country][i].newConfirmed = data[country][i].confirmed - data[country][i - 1].confirmed
    data[country][i].newRecovered = data[country][i].recovered - data[country][i - 1].recovered
    data[country][i].newDeaths = data[country][i].deaths - data[country][i - 1].deaths
  }

  document.getElementById("range-select-days").max = data[country].length;

  document.getElementById("range-select-days").addEventListener("input", function () {
    document.getElementById("h3-days").innerHTML = document.getElementById("range-select-days").value + " days"
  })

  let lastUpdatedDate = new Date(data[country][data[country].length - 1].date);

  document.getElementById("h1-last-updated").innerHTML = "Last Updated: " + lastUpdatedDate.toDateString();

  confirmedRateIncrease = ((data[country][data[country].length - 1].newConfirmed - data[country][data[country].length - 2].newConfirmed) / data[country][data[country].length - 2].newConfirmed) * 100
  recoveredRateIncrease = ((data[country][data[country].length - 1].newRecovered - data[country][data[country].length - 2].newRecovered) / data[country][data[country].length - 2].newRecovered) * 100
  deathsRateIncrease = ((data[country][data[country].length - 1].newDeaths - data[country][data[country].length - 2].newDeaths) / data[country][data[country].length - 2].newDeaths) * 100

  if (confirmedRateIncrease > 0) {
    document.getElementById("h1-confirmed").style.color = "red"
    document.getElementById("h1-confirmed").innerHTML = "Confirmed: " + numberWithCommas(data[country][data[country].length - 1].confirmed) + " &#8679;" + Math.abs(Math.floor(confirmedRateIncrease)) + "%" + " (+" + data[country][data[country].length - 1].newConfirmed + ")";
  } else {
    document.getElementById("h1-confirmed").style.color = "green"
    document.getElementById("h1-confirmed").innerHTML = "Confirmed: " + numberWithCommas(data[country][data[country].length - 1].confirmed) + " &#8681;" + Math.abs(Math.floor(confirmedRateIncrease)) + "%" + " (+" + data[country][data[country].length - 1].newConfirmed + ")";
  }

  if (recoveredRateIncrease < 0) {
    document.getElementById("h1-recovered").style.color = "red"
    document.getElementById("h1-recovered").innerHTML = "Recovered: " + numberWithCommas(data[country][data[country].length - 1].recovered) + " &#8681;" + Math.abs(Math.floor(recoveredRateIncrease)) + "%" + " (+" + data[country][data[country].length - 1].newRecovered + ")";
  } else {
    document.getElementById("h1-recovered").style.color = "green"
    document.getElementById("h1-recovered").innerHTML = "Recovered: " + numberWithCommas(data[country][data[country].length - 1].recovered) + " &#8679;" + Math.abs(Math.floor(recoveredRateIncrease)) + "%" + " (+" + data[country][data[country].length - 1].newRecovered + ")";
  }

  if (deathsRateIncrease > 0) {
    document.getElementById("h1-deaths").style.color = "red"
    document.getElementById("h1-deaths").innerHTML = "Deaths: " + numberWithCommas(data[country][data[country].length - 1].deaths) + " &#8679;" + Math.abs(Math.floor(deathsRateIncrease)) + "%" + " (+" + data[country][data[country].length - 1].newDeaths + ")";
  } else {
    document.getElementById("h1-deaths").style.color = "green"
    document.getElementById("h1-deaths").innerHTML = "Deaths: " + numberWithCommas(data[country][data[country].length - 1].deaths) + " &#8681;" + Math.abs(Math.floor(deathsRateIncrease)) + "%" + " (+" + data[country][data[country].length - 1].newDeaths + ")";
  }

  let SPLICEDATES = data[country].length - document.getElementById("range-select-days").value;
  var ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data[country].map(a => a.date).splice(SPLICEDATES),
      datasets: [
        {
          label: '# of Deaths',
          data: data[country].map(a => a.deaths).splice(SPLICEDATES),
          backgroundColor: [
            'rgba(0, 0, 0, 0.8)'
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)'
          ],
          borderWidth: 1
        },
        {
          label: '# of Recovered',
          data: data[country].map(a => a.recovered).splice(SPLICEDATES),
          backgroundColor: [
            'rgba(0, 177, 106, 0.6)'
          ],
          borderColor: [
            'rgba(30, 130, 76, 1)'
          ],
          borderWidth: 1
        },
        {
          label: '# of Cases',
          data: data[country].map(a => a.confirmed).splice(SPLICEDATES),
          backgroundColor: [
            'rgba(255, 99, 132, 0.4)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
    },
    options: {
      title: {
          display: true,
          text: 'Total Confirmed, Recovered and Deaths by Day',
          fontSize: 24
      }
  }
  });
  var ctx = document.getElementById('rateOfIncrease');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data[country].map(a => a.date).splice(SPLICEDATES),
      datasets: [
        {
          label: '# of new Cases',
          data: data[country].map(a => a.newConfirmed).splice(SPLICEDATES),
          backgroundColor: 'rgba(0, 0, 0, 1)',
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1
        }
      ]
    },
    options: optForBar
  });
}
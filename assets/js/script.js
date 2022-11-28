var searchFormEl = document.querySelector('#search-form');
var srchButton = document.getElementById('srch-btn');
var todayWeather = document.getElementById('todays-forecast');
var fiveDayWeather = document.getElementById('five-day-forecast');
var apiKey = '3016d689a6a6d1348a3401cdbfd6a18a';
var currentDate = moment().format("l")
var city;
var cities;


function cityInputValue() {
   city = $("search-input").val();
   if (city && cities.includes(city) === false) {
      saveToLocalStorage();
      return city;
   } else if (!city) {
      alert("Please enter a valid city");
   }
}


function getCurrentWeather() {
   var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

   fetch(requestUrl)
      .then(response => response.json())
      .then(function (data) {
         console.log(data);
      })
}

function getFiveDayForecast() {
   var requestUrl = 'api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;
   var coords = [];

   fetch(requestUrl)
      .then(response => response.json())

   coords.push(response.coord.lat);
   coords.push(response.coord.lon);
   let cityName = response.name;
   let cityCond = response.weather[0].description.toUpperCase();
   let cityTemp = response.main.temp;
   let cityHum = response.main.humidity;
   let cityWind = response.wind.speed;
   let icon = response.weather[0].icon;
   $("#icon").html(
      `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
   );
   $("#city-name").html(cityName + " " + "(" + currentDate + ")");
   $("#city-cond").text("Current Conditions: " + cityCond);
   $("#temp").text("Current Temp (F): " + cityTemp.toFixed(1));
   $("#humidity").text("Humidity: " + cityHum + "%");
   $("#wind-speed").text("Wind Speed: " + cityWind + "mph");

   for (var i = 1; i < 5; i++) {
      var day = moment().add(i, "days").format("l");
      var dayTemp = response.daily[i].temp.max;
      var dayWind = response.daily[i].wind;
      var dayHum = response.daily[i].humidity;
      var weatherIcon = response.daily[i].weatherIcon[0].icon;


      var weatherCards = document.createElement('div');
      weatherCards.setAttribute('id', 'date' + i);
      weatherCards.setAttribute('id', 'icon' + i);
      weatherCards.setAttribute('id', 'temp' + i);
      weatherCards.setAttribute('id', 'hum' + i);
      weatherCards.setAttribute('id', 'wind' + i);

      var table = document.querySelector('table');
      table.appendChild(weatherCards);
      document.getElementsByTagName('div')[4].innerHTML = "Placeholder";

      $('#date' + i).text(day);
      $('#temp' + i).text("Temp(F):" + " " + temp.toFixed(1));
      $('#wind' + i).text("Wind:" + " " + temp.toFixed(1));
      $('#hum' + i).text("Humidity:" + " " + temp.toFixed(1));
      $('#icon' + i).html('<img src="http://openweathermap.org/img/wn/${icon}@2x.png">');

   }
}



// for (var i = 1; i < 5; i++) {
//    var day = moment().add(i, "days").format("l");
//    var dayTemp = response.daily[i].temp.max;
//    var dayWind = response.daily[i].wind;
//    var dayHum = response.daily[i].humidity;
//    var weatherIcon = response.daily[i].weatherIcon[0].icon;


//    var weatherCards = document.createElement('div');
//    weatherCards.setAttribute('id', 'date' + i);
//    weatherCards.setAttribute('id', 'icon' + i);
//    weatherCards.setAttribute('id', 'temp' + i);
//    weatherCards.setAttribute('id', 'hum' + i);
//    weatherCards.setAttribute('id', 'wind' + i);

//    var table = document.querySelector('table');
//    table.appendChild(weatherCards);
//    document.getElementsByTagName('div')[4].innerHTML = "Placeholder";

//    $('#temp' + i).text("Temp(F):" + " " + temp.toFixed(1));
//    $('#wind' + i).text("Wind:" + " " + temp.toFixed(1));
//    $('#hum' + i).text("Humidity:" + " " + temp.toFixed(1));
//    $('#icon' + i).html('<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">');

// }

$("#submit").on("click", (event) => {
   event.preventDefault();
   getCity();
   getFiveDayForecast();
   $("#search-input").val("");
   listCities();
});


function loadMostRecent() {
   var lastSearch = localStorage.getItem("mostRecent");
   if (lastSearch) {
      city = lastSearch;
      getFiveDayForecast();;
   } else {
      city = "Austin";
      getFiveDayForecast();;
   }
}


loadMostRecent()

//function to load recently searched cities from local storage
function loadRecentCities() {
   let recentCities = JSON.parse(localStorage.getItem("cities"));

   if (recentCities) {
      cities = recentCities;
   } else {
      cities = [];
   }
}

loadRecentCities()
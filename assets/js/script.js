//declare and initialize variables

var search = document.getElementById("search");
var city = document.getElementById("city");
var citySearch = document.getElementById("city-search")
var currentCityContainer = document.getElementById("current-city-container");
var displayedCity = document.getElementById("displayed-city");
var displayWeather = document.getElementById("displayWeather");
var myCities = document.getElementById("myCities");
var deleteButton = document.getElementById("deleteButton");
var day = document.getElementById("day1");
var date = document.getElementById("date1");



// js for using city search user text input to fetch city information

var searchHandler = function(event) {
    event.preventDefault();

    var searchedCity = city.value.trim();

    if (searchedCity) {
        findCityName(searchedCity);
        city.textContent = "";
        city.value = "";

    } else {
        alert("Please enter a city");
    }
};



var addCity = function(searchName) {
    currentCityContainer.textContent = "";
    displayedCity.textContent = searchName;
    var saveCity = document.createElement("button");
    saveCity.textContent = searchName;
    saveCity.addEventListener("click", function () {
        displayedCity.textContent = this.textContent;
        findCityName(this.textContent);
    });
    myCities.append(saveCity);
};



var findCityName = function(searchedCity) {
    var apiCityName = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&appid=07bdc8ba3d40336f00288a88b3d7d15f";

    fetch(apiCityName).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var lat = data.coord.lat;
                var lon = data.coord.lon;
                findCityData(lat, lon);
            })
        }
    })
};



// using the fetched latitude and longitude info, fetches current weather and five day forecast for input city and displays current weather info

var findCityData = function (lat, lon) {
    var apiCityData = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=07bdc8ba3d40336f00288a88b3d7d15f&units=imperial"

    fetch(apiCityData).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather.innerHTML = "";

                var currentWeatherIcon = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`
                var weatherIcon = document.createElement("img")
                weatherIcon.setAttribute("src", currentWeatherIcon);
                weatherIcon.classList.add("icon");
                displayWeather.appendChild(weatherIcon);

                var currentTemp = data.current.temp;
                var temp = document.createElement("p")
                temp.textContent = "Temp:" + " " + currentTemp + " " + "°F";
                temp.classList.add("infoContent");
                displayWeather.appendChild(temp);

                var currentWind = data.current.wind_speed;
                var wind = document.createElement("p")
                wind.textContent = "Wind:" + " " + currentWind + " " + "MPH";
                wind.classList.add("infoContent");
                displayWeather.appendChild(wind);

                var currentHumidity = data.current.humidity;
                var humidity = document.createElement("p")
                humidity.textContent = "Humidity:" + " " + currentHumidity + " " + "%";
                humidity.classList.add("infoContent");
                displayWeather.appendChild(humidity);

                var currentUvi = data.daily[0].uvi;
                var uvi = document.createElement("p");
                uvi.classList.add("infoContent");
                uvi.textContent = "UV Index:" + " " + currentUvi;
                displayWeather.appendChild(uvi);

                fiveDayForecast(data.daily);
            });
        } else {
            alert("Error: City Not Found");
        }
    })
        .catch(function (error) {
            alert("Unable to Connect");
        })
};


// js for setting the most recently displayed cities into local storage

var saveIntoStorage = function () {
    var savedCities = JSON.parse(localStorage.getItem("cities")) || [];
    savedCities.push(city.value);
    localStorage.setItem("cities", JSON.stringify(savedCities));
};
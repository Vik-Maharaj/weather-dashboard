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
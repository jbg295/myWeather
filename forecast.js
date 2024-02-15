/**
 * Project 5
 * Joshua Gabel
 * CDC-6304
 */
document.getElementById('weather-form').addEventListener('submit', handleClick);


function handleClick(event) {
    event.preventDefault();
    getLocation();
}



/**
 * This method receives office, X, and Y, calls NOAA's Weather API and sends returned information
 * to displayWeather()
 * @param {*} office 
 * @param {*} gridX 
 * @param {*} gridY 
 */
function getWeather(office, gridX, gridY) {
    var url = 'https://api.weather.gov/gridpoints/' + office + '/' + gridX + "," + gridY + "/forecast";
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

/**
 * This function determines users location and routes to appropriate method
 * based on whether or not this is successful.
 */
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) { success(position); },
            function (e) { unsuccess() },
            { enableHighAccuracy: true });
    } else {
        var t = document.getElementById("weather-info");
        t.innerHTML = "&nbsp Geolocation is not supported by this browser.";
    }
}

/**
 * This method takes user's position as input,
 * isolates latitude and longitude, and sends its to NOAA's API
 * to find the current locations office, gridX, and gridY
 * @param {*} position 
 */
function success(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var url = "https://api.weather.gov/points/" + lat + "," + lng;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            getWeatherForLocation(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function unsuccess() {
    var t = document.getElementById("weather-info");
    t.innerHTML = "&nbsp Geolocation was not allowed by the user. " +
        "This may be a one-time refusal or you need to " +
        "check the Location Services on your Settings.";
}

/**
 * This method simply isolated office, gridX, and gridY and sends this information to getWeather()
 * @param {} data 
 */
function getWeatherForLocation(data) {
    var officeId = data.properties.gridId;
    var gridX = data.properties.gridX;
    var gridY = data.properties.gridY;
    getWeather(officeId, gridX, gridY);
}

/**
 * This method displays weather data returned by NOAA's Weather API.
 * @param {} data 
 */
function displayWeather(data) {
    var weatherInfo = document.getElementById('forecast-display');
    weatherInfo.innerHTML = '';
    if (data.type === "Feature") {
        var period = data.properties.periods[0].name;
        var temperature = data.properties.periods[0].temperature;
        var trend = data.properties.periods[0].temperatureTrend;
        var humidity = data.properties.periods[0].relativeHumidity.value;
        var windSpeed = data.properties.periods[0].windSpeed;
        var direction = data.properties.periods[0].windDirection;
        var forecast = data.properties.periods[0].detailedForecast;


        var weatherHtml = "<div class='card' style='width: 18rem;'><div class='card-body'> <div id='icon'></div>" +
            "<p class='card-text'>" + '<h3>Weather Forecast for ' + period + '</h3>' +
            '<p>Temperature: ' + temperature + ' &#8457;</p>' +
            '<p>Humidity: ' + humidity + '%</p>' +
            '<p>Wind Speed: ' + windSpeed + ' ' + direction + '</p>' +
            '<h4> Forecast </h4>' +
            '<p>' + forecast + '</p>' + "<a href='./5day.html' class='btn btn-info'>Get 5-day</a></div>";





        weatherInfo.innerHTML = weatherHtml;
        assignIcon(forecast);
    } else {
        weatherInfo.innerHTML = '<p>Failed to retrieve weather information.</p>';
    }




}


/**
 * 
 * @param {*} shortForecast 
 */
function assignIcon(forecast) {
    var iconString = "icon";
    var todayIcon = document.getElementById(iconString);
    todayIcon.innerHTML = '';
    if (forecast.includes("Clear") || forecast.includes('clear')) {
        todayIcon.innerHTML = "<img class='justify-content-center'  src='./assets/stars.svg'>";
        console.log("clear");

    }
    if (forecast.includes("Cloud") || forecast.includes("cloud")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' style='height:50px;' src='./assets/cloud.svg'>";
    }
    if (forecast.includes("Sunny") || forecast.includes("sunny")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' style='height:50px;' src='./assets/brightness-high.svg'>";
    }
    if (forecast.includes("Windy") || forecast.includes("windy")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' src='./assets/wind.svg'>";
    }
    if (forecast.includes("Fog") || forecast.includes("fog")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' src='./assets/cloud-fog.svg'>";
    }
    if (forecast.includes("Rain") || forecast.includes("rain")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' style='height:50px;' src='./assets/cloud-rain-heavy.svg'>";

    }
    if (forecast.includes("Snow") || forecast.includes("snow")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' style='height:50px;' src='./assets/snow.svg'>";
    }


}
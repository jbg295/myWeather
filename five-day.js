// Define your function
function onPageLoad() {
    // Your code here
    console.log("Page has loaded!");
    addDays();
    getLocation();
}

// Attach event listener to execute onPageLoad function when the page opens
document.addEventListener("DOMContentLoaded", onPageLoad);


/**
 * This function receives the day of the week represented as an integer
 * (0(sunday) - 6(saturday)) and returns a String for that day.
 * @param {*} day, integer representation of day
 * @returns String value of day value received.
 */
function dayAsString(day) {
    if (day == 0) {
        return "Sunday";
    }
    if (day == 1) {
        return "Monday";
    }
    if (day == 2) {
        return "Tuesday";
    }
    if (day == 3) {
        return "Wednesday";
    }
    if (day == 4) {
        return "Thursday";
    }
    if (day == 5) {
        return "Friday";
    }
    if (day == 6) {
        return "Saturday";
    }
    /**
     * problem: my function received an integer representation of the day
     * of the week which was received from the JS function Date.getDay().
     * I used this number and added to it to get my days displayed dynamically.
     * I quickly realized, however, that adding to the number would result
     * in values that would exceed the constraints of this function. I would
     * need to either add endless constraints to this function or consider how
     * to recalculate my dates. 
     * 
     *  I tested what was happening in my head. Today was Thursday
     * which is 4 on a scale of 0-6. Friday and Saturday were displaying properly
     * but the next two days were not. so Saturday (6) was showing properly
     *  +1=7 and thats where the undefinded began and then it was really simple.
     *
     * Solution: if the value of the date received is >6, subtract 7 and
     * recursively call the same function for the answer.
     *
     */
    if (day > 6) {
        day -= 7;
        solution = dayAsString(day);
        return solution;
    }

}

/**
 * 
 * @param {*} forecast 
 * @param {*} location 
 */
function assignIcon(forecast, location) {
    var iconString = "icon";
    var locationString = location.toString();
    console.log(locationString);
    var finalLocation = iconString + locationString;
    console.log(finalLocation)
    var todayIcon = document.getElementById(finalLocation);
    todayIcon.innerHTML = '';
    if (forecast.includes("Clear") || forecast.includes('clear')) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' src='./assets/stars.svg'>";
        console.log("clear");

    }
    if (forecast.includes("Cloud") || forecast.includes("cloud")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' src='./assets/cloud.svg'>";
    }
    if (forecast.includes("Sunny") || forecast.includes("sunny")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' src='./assets/brightness-high.svg'>";

    }
    if (forecast.includes("Windy") || forecast.includes("windy")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' src='./assets/wind.svg'>";
    }

    if (forecast.includes("Fog") || forecast.includes("fog")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' src='./assets/cloud-fog.svg'>";
    }
    if (forecast.includes("Rain") || forecast.includes("rain")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' src='./assets/cloud-rain-heavy.svg'>";

    }
    if (forecast.includes("Snow") || forecast.includes("snow")) {
        todayIcon.innerHTML = "<img class='justify-content-center icon' src='./assets/snow.svg'>";
    }

    

}

/**
 * This function uses javascript function to receive the day of ther
 * week, then adds to this value to get values for the next four days
 * for a total of five days. The function then calls dayAsString 
 * on these values to receive and display the proper days to the user
 * in the five day forecast.
 */
function addDays() {
    const date = new Date();
    const today = date.getDay();
    const day2 = today + 1;
    const day3 = today + 2;
    const day4 = today + 3;
    const day5 = today + 4;

    const day2String = dayAsString(day2);
    const day2Title = document.getElementById("day2");
    day2Title.innerHTML = "<h5 class='card-title'>" + day2String + "</h5>";

    const day3String = dayAsString(day3);
    const day3Title = document.getElementById("day3");
    day3Title.innerHTML = "<h5 class='card-title'>" + day3String + "</h5>";

    const day4String = dayAsString(day4);
    const day4Title = document.getElementById("day4");
    day4Title.innerHTML = "<h5 class='card-title'>" + day4String + "</h5>"

    const day5String = dayAsString(day5);
    const day5Title = document.getElementById("day5");
    day5Title.innerHTML = "<h5 class='card-title'>" + day5String + "</h5>"








}

/**
 * This function receives JSON from NOAA weather API, parses the data
 * for a five day forecast, and displays it to the user.
 * @param {*} data 
 */
function displayFiveDay(data) {
    // select appropriate divs from document
    var weatherInfoToday = document.getElementById('forecast-day1');
    var weatherInfoDay2 = document.getElementById('forecast-day2');
    var weatherInfoDay3 = document.getElementById('forecast-day3');
    var weatherInfoDay4 = document.getElementById('forecast-day4');
    var weatherInfoDay5 = document.getElementById('forecast-day5');

    // init HTML for each div
    weatherInfoToday.innerHTML = '';
    weatherInfoDay2.innerHTML = '';
    weatherInfoDay3.innerHTML = '';
    weatherInfoDay4.innerHTML = '';
    weatherInfoDay5.innerHTML = '';

    // parse JSON
    if (data.type === "Feature") {
        var period = data.properties.periods[0].name;
        var temperature = data.properties.periods[0].temperature;
        var trend = data.properties.periods[0].temperatureTrend;
        var humidity = data.properties.periods[0].relativeHumidity.value;
        var windSpeed = data.properties.periods[0].windSpeed;
        var direction = data.properties.periods[0].windDirection;
        var forecast = data.properties.periods[0].detailedForecast;
        var shortForecast = data.properties.periods[0].shortForecast;




        var period2 = data.properties.periods[2].name;
        var temperature2 = data.properties.periods[2].temperature;
        var trend2 = data.properties.periods[2].temperatureTrend;
        var humidity2 = data.properties.periods[2].relativeHumidity.value;
        var windSpeed2 = data.properties.periods[2].windSpeed;
        var direction2 = data.properties.periods[2].windDirection;
        var forecast2 = data.properties.periods[2].detailedForecast;
        var shortForecast2 = data.properties.periods[2].shortForecast;



        var period3 = data.properties.periods[4].name;
        var temperature3 = data.properties.periods[4].temperature;
        var trend3 = data.properties.periods[4].temperatureTrend;
        var humidity3 = data.properties.periods[4].relativeHumidity.value;
        var windSpeed3 = data.properties.periods[4].windSpeed;
        var direction3 = data.properties.periods[4].windDirection;
        var forecast3 = data.properties.periods[4].detailedForecast;
        var shortForecast3 = data.properties.periods[4].shortForecast;


        var period4 = data.properties.periods[6].name;
        var temperature4 = data.properties.periods[6].temperature;
        var trend4 = data.properties.periods[6].temperatureTrend;
        var humidity4 = data.properties.periods[6].relativeHumidity.value;
        var windSpeed4 = data.properties.periods[6].windSpeed;
        var direction4 = data.properties.periods[6].windDirection;
        var forecast4 = data.properties.periods[6].detailedForecast;
        var shortForecast4 = data.properties.periods[6].shortForecast;


        var period5 = data.properties.periods[8].name;
        var temperature5 = data.properties.periods[8].temperature;
        var trend5 = data.properties.periods[8].temperatureTrend;
        var humidity5 = data.properties.periods[8].relativeHumidity.value;
        var windSpeed5 = data.properties.periods[8].windSpeed;
        var direction5 = data.properties.periods[8].windDirection;
        var forecast5 = data.properties.periods[8].detailedForecast;
        var shortForecast5 = data.properties.periods[8].shortForecast;




        // setup HTML display for each forecast (using Bootstrap cards for display)
        var weatherHtmlDay1 = "<p class='card-text'>" +
            '<p>Temperature: ' + temperature + ' &#8457;</p>' +
            '<p>Humidity: ' + humidity + '%</p>' +
            '<p>Wind Speed: ' + windSpeed + ' ' + direction + '</p>' +
            '<h4> Forecast </h4>' +
            '<p>' + forecast + '</p>';

        var weatherHtmlDay2 = "<p class='card-text'>" +
            '<p>Temperature: ' + temperature2 + ' &#8457;</p>' +
            '<p>Humidity: ' + humidity2 + '%</p>' +
            '<p>Wind Speed: ' + windSpeed2 + ' ' + direction2 + '</p>' +
            '<h4> Forecast </h4>' +
            '<p>' + forecast2 + '</p>';

        var weatherHtmlDay3 = "<p class='card-text'>" +
            '<p>Temperature: ' + temperature3 + ' &#8457;</p>' +
            '<p>Humidity: ' + humidity3 + '%</p>' +
            '<p>Wind Speed: ' + windSpeed3 + ' ' + direction3 + '</p>' +
            '<h4> Forecast </h4>' +
            '<p>' + forecast3 + '</p>';

        var weatherHtmlDay4 = "<p class='card-text'>" +
            '<p>Temperature: ' + temperature4 + ' &#8457;</p>' +
            '<p>Humidity: ' + humidity4 + '%</p>' +
            '<p>Wind Speed: ' + windSpeed4 + ' ' + direction4 + '</p>' +
            '<h4> Forecast </h4>' +
            '<p>' + forecast4 + '</p>';

        var weatherHtmlDay5 = "<p class='card-text'>" +
            '<p>Temperature: ' + temperature5 + ' &#8457;</p>' +
            '<p>Humidity: ' + humidity5 + '%</p>' +
            '<p>Wind Speed: ' + windSpeed5 + ' ' + direction5 + '</p>' +
            '<h4> Forecast </h4>' +
            '<p>' + forecast5 + '</p>';






        // assign appropriate divs to HTML
        weatherInfoToday.innerHTML = weatherHtmlDay1;
        weatherInfoDay2.innerHTML = weatherHtmlDay2;
        weatherInfoDay3.innerHTML = weatherHtmlDay3;
        weatherInfoDay4.innerHTML = weatherHtmlDay4;
        weatherInfoDay5.innerHTML = weatherHtmlDay5;
        // assign each day in five day forecast an icon 
        assignIcon(forecast, 1);
        assignIcon(forecast2, 2);
        assignIcon(forecast3, 3);
        assignIcon(forecast4, 4);
        assignIcon(forecast5, 5);
    } else {
        weatherInfoToday.innerHTML = '<p>Failed to retrieve weather information.</p>';
        weatherInfoDay2.innerHTML = '<p>Failed to retrieve weather information.</p>';
        weatherInfoDay3.innerHTML = '<p>Failed to retrieve weather information.</p>';
        weatherInfoDay4.innerHTML = '<p>Failed to retrieve weather information.</p>';
        weatherInfoDay5.innerHTML = '<p>Failed to retrieve weather information.</p>';
    }
}

/**
 * 
 * These methods are copied from forecast.js
 * and are used to assess a user's location
 * and retrieve weather data.
 * 
 */

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
            displayFiveDay(data);
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

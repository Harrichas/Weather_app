//70f2da62566a60532110329b3baf00bc
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//http://api.openweathermap.org/data/2.5/uvi?appid=YOUR_API_KEY&lat=30.27&lon=-97.74
//http://api.openweathermap.org/data/2.5/forecast?q=austin&appid=YOUR_API_KEY&units=imperial
var key = '70f2da62566a60532110329b3baf00bc'

$(document).ready(function () {
    $('#search-btn').click(function() {
        var userInput = $('#city').val();
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${key}`

        $.ajax({
            url: queryURL,
            type: 'GET',
        }).then(function (response) {
            console.log(response);
            response.name;
            response.main.temp;
            response.main.humidity;
            response.wind.speed;
            $('#cityName').text(
                response.name + ' (' + new Date().toLocaleDateString() + ')'
            );
            $('#cityName').append(
                `<img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png">`
            );
            $('#currentTemp')
                .text(`Temp: ${response.main.temp}` + '° F')
                .addClass('currentWeather');
            $('#humidity')
                .text(`Humidity: ${response.main.humidity}` + '%')
                .addClass('currentWeather');
            $('#windSpeed')
                .text(`Windspeed: ${response.wind.speed}` + 'mph')
                .addClass('currentWeather');
            getForcast(userInput);
        });
    });

    
})
//70f2da62566a60532110329b3baf00bc
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//http://api.openweathermap.org/data/2.5/uvi?appid=YOUR_API_KEY&lat=30.27&lon=-97.74
//http://api.openweathermap.org/data/2.5/forecast?q=austin&appid=YOUR_API_KEY&units=imperial
var key = '70f2da62566a60532110329b3baf00bc'

$(document).ready(function () {
    $('#search-btn').click(function(event) {
        event.preventDefault();
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
            $('#current').append(
            $('<p>').text(
                response.name + ' (' + new Date().toLocaleDateString() + ')'
            ).append(
                `<img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png">`
            ).append(
            $('<p>')
                .text(`Temp: ${response.main.temp}` + '° F'),
             
            $('<p>')
                .text(`Humidity: ${response.main.humidity}` + '%'),
            
            $('<p>')
                .text(`Windspeed: ${response.wind.speed}` + 'mph')))
        
            getForcast(userInput);
            getUVI(response.coord.lat, response.coord.lon);
        });
    });

    function getForcast(input) {
        var fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?q=${input}&units=imperial&appid=${key}`

        $.ajax({
            url: fiveDayURL,
            type: 'GET',    
        }).then(function (response) {
            $('#forcast')
                .html('<h4 class="mt-3">5-day Forcast:</h4>')
                .append('<div class="row">');
            console.log(response);
            for(var i = 0; i < response.list.length; i++) {
                var hour = response.list[i];
                if (hour.dt_txt.includes('00:00:00')) {
                    var date = new Date(hour.dt_txt).toLocaleDateString();
                    hour.main.temp;
                    hour.main.humidity;

                $('#forcast').append('<div class="col-2">').append('<p>')
                    

                }
            }
        })
    }

    function getUVI(lat,lon) {
        var uviURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${lat}&lon=${lon}`

        $.ajax({
            url: uviURL,
            type: 'GET',
        }).then(function (response) {
            $('#current').append($('<p>').text(response.value));
        })
    }
});
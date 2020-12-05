//70f2da62566a60532110329b3baf00bc
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//http://api.openweathermap.org/data/2.5/uvi?appid=YOUR_API_KEY&lat=30.27&lon=-97.74
//http://api.openweathermap.org/data/2.5/forecast?q=austin&appid=YOUR_API_KEY&units=imperial
var key = '70f2da62566a60532110329b3baf00bc'

$(document).ready(function () {
    $('#search-btn').click(search);

    displayCityList();

    function search (event, cityName) {
        if(event) {
        event.preventDefault();
        }
        console.log(cityName);
        var userInput;
        if (cityName) {
            userInput = cityName;
        } else {
            userInput = $('#city').val();
        }

        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=imperial&appid=${key}`

        $('#current').html('');

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
            $('<p id="weatherData">').text(
                response.name + ' (' + new Date().toLocaleDateString() + ')'
            ).append(
                `<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png">`
            ).append(
            $('<p>')
                .text(`Temp: ${response.main.temp}` + '° F'),
                
             
            $('<p>')
                .text(`Humidity: ${response.main.humidity}` + '%'),
                
            
            $('<p>')
                .text(`Windspeed: ${response.wind.speed}` + 'mph')))
                
            addToCityList(userInput);
            getForcast(userInput);
            getUVI(response.coord.lat, response.coord.lon);
        });

    }

    function getForcast(input) {
        var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&units=imperial&appid=${key}`

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
                

                    $('#forcast').append(
                        $('<p>').text(date                            
                        ).append(
                            `<img src="https://openweathermap.org/img/wn/${hour.weather[0].icon}.png">`
                        ).append(
                        $('<p>')
                            .text(`Temp: ${hour.main.temp}` + '° F'),
                         
                        $('<p>')
                            .text(`Humidity: ${hour.main.humidity}` + '%')                        
                        ))
                    

                }
            }
        })
    }

    function getUVI(lat,lon) {
        var uviURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${lat}&lon=${lon}`

        $.ajax({
            url: uviURL,
            type: 'GET',
        }).then(function (response) {
            var UVI = response.value;
            console.log(UVI)
            $('#weatherData').append($('<p>')
                .text(`UVI: ${UVI}`)
                .addClass('currentWeather'));
            if ($(UVI) <= 2.99) {
				$('.currentWeather').css('background-color', 'green');
			}
			if (3.0 < $(UVI) <= 6.99) {
				$('.currentWeather').css('background-color', 'yellow');
			} else {
				$('.currentWeather').css('background-color', 'red');
			}
        })
    }

    function addToCityList (cityName) {
        var cityList = window.localStorage.getItem('cityList') || [];
        cityList = typeof cityList === 'string' ? JSON.parse(cityList) : cityList;

        cityList.push(cityName);

        window.localStorage.setItem('cityList', JSON.stringify(cityList));
        displayCityList();
    }

    function displayCityList() {
        var cityList = window.localStorage.getItem('cityList') || [];
        var cityListEl = $("#cityList")

        cityListEl.html('');

        cityList = typeof cityList === 'string' ? JSON.parse(cityList) : cityList;

        for (var i = 0; i < cityList.length; i++) {
            var li = $('<li>')

            li.text(cityList[i]);
            li.click(onCityListClick);

            cityListEl.append(li);
        }
    };

    function onCityListClick (event) {
        var cityName = event.target.textContent;
        console.log(cityName);
        search(null, cityName);

    }

});
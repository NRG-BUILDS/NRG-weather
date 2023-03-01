const cityInput = document.querySelector('#city_input')
const currentCityName = document.querySelector('.current_city_name');
const currentCityTemp = document.querySelector('.current_city_temp');
const currentCityDesc = document.querySelector('.current_city_desc');
const highlowTemp = document.querySelector('.highlow_temp')
const forecastTray = document.querySelector('.forecast_tray');
const dailyForecastDisplay = document.querySelector('.daily_forecast');
const windDisplay = document.querySelector('.wind_display');
const humDisplay = document.querySelector('.hum_display');
const rainDisplay = document.querySelector('.rain_display');
const visiDisplay = document.querySelector('.visi_display');
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '693844bab5msh01c0a96d3111ac8p13869ajsn656d8e45f937',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};
window.addEventListener("load", () => { 
    let date = new Date();
    if (date.getHours() < 18) { 
        document.body.style.background = "url('sunny_bg.jpg')"
    } else { 
        document.body.style.background = "url('cloudy_bg.jpg')"
    }
})
searchWeather = (city) => { 
    if (cityInput.value == "") { 
        showError("Type in a location")
    } else { 
        city = cityInput.value;
        fetchData(city);
    }
}
fetchData = (city) => { 
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=7`, options)
	.then(response => response.json())
	.then(response => displayWeather(response))
	.catch(err => showError("No matching location found"));
}
fetchData('Lagos'); //so that Lagos is displayed by default

displayWeather = (a) => { 
    console.log(a)
    currentCityName.innerHTML = a.location.name;
    currentCityTemp.innerHTML = a.current.temp_c + "°";
    currentCityDesc.innerHTML = a.current.condition.text;
    highlowTemp.innerHTML = `<span>H:${a.forecast.forecastday[0].day.maxtemp_c}°</span> <span>L:${a.forecast.forecastday[0].day.mintemp_c}°</span>`;
    displayForecast(a);
    displayWeeklyForecast(a);
    displayExtraInfo(a);
    showError("");
}

displayForecast = (a) => { 
    let text = ""
    for (i = 0; i < 24; i++) { 
        text += `<div>
              <span>${i}:00</span>
              <img class="weather-sm" src="${a.forecast.forecastday[0].hour[i].condition.icon}">
              <span>${a.forecast.forecastday[0].hour[i].chance_of_rain}%</span>
              <span>${a.forecast.forecastday[0].hour[i].temp_c}°</span>
          </div>`
    }
    forecastTray.innerHTML = text;
    
}

displayWeeklyForecast = (a) => { 
    let text = ""
    let days = ["Today", "Tomorrow", "Next"];
    for(i = 0; i < 3; i++){ text += `<div>
              <span>${days[i]}</span>
              <img class="weather-sm" src="${a.forecast.forecastday[i].day.condition.icon}">
              <span>${a.forecast.forecastday[i].day.daily_will_it_rain}</span>
              <span>${a.forecast.forecastday[i].day.avgtemp_c}°</span>
          </div>`
        
    }
    dailyForecastDisplay.innerHTML = text;
}

displayExtraInfo = (a) => { 
    humDisplay.innerHTML = a.current.humidity;
    windDisplay.innerHTML = a.current.wind_kph;
    visiDisplay.innerHTML = a.current.vis_km;
    rainDisplay.innerHTML = a.forecast.forecastday[0].day.daily_chance_of_rain;
}
showError = message => { 
    document.querySelector('.error_message').innerHTML = message;
}

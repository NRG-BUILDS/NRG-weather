const cityInput = document.querySelector('#city_input')
const currentCityName = document.querySelector('.current_city_name');
const currentCityTemp = document.querySelector('.current_city_temp');
const currentCityDesc = document.querySelector('.current_city_desc');
const highlowTemp = document.querySelector('.highlow_temp')
const forecastTray = document.querySelector('.forecast_tray')
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '693844bab5msh01c0a96d3111ac8p13869ajsn656d8e45f937',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};
searchWeather = (city) => { 
    city = cityInput.value;
    fetchData(city);
}
fetchData = (city) => { 
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=7`, options)
	.then(response => response.json())
	.then(response => displayWeather(response))
	.catch(err => console.error(err));
}
fetchData('Lagos'); //so that Lagos is displayed by default
displayWeather = (a) => { 
    console.log(a)
    currentCityName.innerHTML = a.location.name;
    currentCityTemp.innerHTML = a.current.temp_c + "°";
    currentCityDesc.innerHTML = a.current.condition.text;
    highlowTemp.innerHTML = `<span>H:${a.current.temp_c + 5}°</span> <span>L:${a.current.temp_c - 5}°</span>`
    displayForecast(a);
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
    forecastTray.innerHTML = text
}

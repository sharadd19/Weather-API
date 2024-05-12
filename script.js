const api = "https://api.weatherapi.com/v1/current.json?key=cae4913bb6744fab83755352240805&q="
const searchButton = document.querySelector('.search-button');

async function getWeatherData(location){
    const url = api + location;
    try {
        const response = await fetch(url, {mode:'cors'});
        const data = await response.json();

        return data;

    } catch (error) {
        alert(`Unable to load weather data for ${location}`);
        console.log(`Unable to load weather data for ${location}`);
    }
};

searchButton.addEventListener('click', async (e) => {

    const searchQuery = document.getElementById('search-query').value;
    let button = e.target;
    let card = button.parentNode.nextSibling.remove();

    // TODO: we need to prevent the same data showing twice if someone clicks again.
    const weatherData = await getWeatherData(searchQuery);
    
    createWeatherCard(weatherData);
});

async function createWeatherCard(weatherData) {

    const city = weatherData.location.name;
    const country = weatherData.location.country;
    const time = await extractTime(weatherData.location.localtime);
    const temp = weatherData.current.temp_c;
    const wind = weatherData.current.wind_mph;
    const precipitation = weatherData.current.precip_mm;
    const humidity = weatherData.current.humidity;
    const feelsLike = weatherData.current.feelslike_c;
    const uv = weatherData.current.uv;
    const condition = weatherData.current.condition.text;
    const conditionIcon = weatherData.current.condition.icon;

    
    const locationText = document.createElement("h1");
    locationText.textContent = `${city}, ${country}`
    locationText.classList.add("city");


    const timeText = document.createElement("h2");
    timeText.textContent = `Local Time: ${time}`;
    timeText.classList.add("time");

    const imageDiv = document.createElement("div");
    const conditionIconText = document.createElement("img");
    conditionIconText.src = conditionIcon;
    conditionIconText.classList.add("condition-icon");
    imageDiv.appendChild(conditionIconText);

    const tempText = document.createElement("h1");
    tempText.textContent = `${temp}°C`;
    tempText.classList.add("temp");

    const feelsLikeText = document.createElement("p");
    feelsLikeText.textContent = `Feels like: ${feelsLike} °C`;
    feelsLikeText.classList.add("feels-like");
    
    const conditionText = document.createElement("h3");
    conditionText.textContent = condition;
    conditionText.classList.add("condition");


    const precipitationText = document.createElement("h3");
    precipitationText.textContent = `Precipitation: ${precipitation} mm`;
    precipitationText.classList.add("precip");

    const uvText = document.createElement("h3");
    uvText.textContent = `UV Index: ${uv}`;
    uvText.classList.add("uv");

    const windText = document.createElement("h3");
    windText.textContent = `Wind: ${wind} mph`;
    windText.classList.add("wind");

    const humidityText = document.createElement("h3");
    humidityText.textContent = `Humidity: ${humidity}%`
    humidityText.classList.add("humidity");
    
    const details = document.createElement("div")
    details.classList.add("details");
    details.appendChild(precipitationText)
    details.appendChild(uvText)
    details.appendChild(windText)
    details.appendChild(humidityText)

    const temperature = document.createElement("div");
    temperature.classList.add("temperature-feel");
    temperature.appendChild(tempText);
    
    const weatherCard = document.createElement("div");
    weatherCard.classList.add('weather-card-container');
    
    weatherCard.appendChild(locationText);
    weatherCard.appendChild(timeText);
    weatherCard.appendChild(temperature);
    weatherCard.appendChild(imageDiv);
    weatherCard.appendChild(conditionText);
    weatherCard.appendChild(feelsLikeText);
    weatherCard.appendChild(details);   


    const wrapper = document.querySelector('.wrapper');
    wrapper.appendChild(weatherCard);
    

};


async function extractTime(localtime){
    const date = new Date(localtime)
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`
    }
    return hour + ":" + date.getMinutes();
    
}

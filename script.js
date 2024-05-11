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

searchButton.addEventListener('click', async () => {
    //Create weather card
    const searchQuery = document.getElementById('search-query').value;
    const weatherData = await getWeatherData(searchQuery);
    createWeatherCard(weatherData);
});

async function createWeatherCard(weatherData) {

    const city = weatherData.location.name;
    const country = weatherData.location.country;
    const time = weatherData.location.localtime;
    const temp = weatherData.current.temp_c;
    const wind = weatherData.current.wind_mph;
    const precip = weatherData.current.precip_mm;
    const humidity = weatherData.current.humidity;
    const feelsLike = weatherData.current.feelslike_c;
    const uv = weatherData.current.uv;
    const condition = weatherData.current.condition.text;
    const conditionIcon = weatherData.current.condition.icon;
};


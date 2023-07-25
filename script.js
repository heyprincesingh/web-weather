async function getWeatherData(city) {
    const apiKey = '53b19ce558066bdd6a288a0d42d7959f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

async function updateWeatherWidget() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (city !== '') {
        const weatherData = await getWeatherData(city);

        if (weatherData) {
            const locationElement = document.querySelector('.location');
            const temperatureElement = document.querySelector('.temperature');
            const descriptionElement = document.querySelector('.description');
            const iconElement = document.querySelector('.icon');

            locationElement.textContent = weatherData.name;
            temperatureElement.textContent = `${weatherData.main.temp} °C`;
            descriptionElement.textContent = weatherData.weather[0].description;

            const iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
            iconElement.style.backgroundImage = `url(${iconUrl})`;
        }
    } else {
        alert('Please enter a valid city name.');
    }
}

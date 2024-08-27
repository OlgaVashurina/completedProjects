async function getLocation() {
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
    const locationData = await response.json();
    return locationData;
}

async function getWeather(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await response.json();
    return weatherData;
}

function interpretWeatherCode(weatherCode) {
    switch (weatherCode) {
        case 0:
            return "Clear sky";
        case 1:
            return "Mainly clear";
        case 2:
            return "Partly cloudy";
        case 3:
            return "Overcast";
        case 45:
            return "Fog";
        case 48:
            return "Depositing rime fog";
        default:
            return "Unknown weather condition";
    }
}
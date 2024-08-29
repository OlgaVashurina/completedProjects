// Получение данных о местоположении
async function getLocation() {
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
    const locationData = await response.json();
    return locationData;
}

// Получение данных о погоде
async function getWeather(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const weatherData = await response.json();
    return weatherData;
}

// Интерпретация кода погоды
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

// Показ погоды
async function showWeather() {
    // показываем индикатор загрузки
    document.getElementById('loader').style.display = 'block';
    // возвращаем данные о местоположении и сох в перем
    const locationData = await getLocation();
    // вызов асинх функции getWeather передаем ей широту и долготу и сохраняем инфо о погоде
    const weatherData = await getWeather(locationData.latitude, locationData.longitude);
    // создаем строку weatherInfo храним инфо о городе и темпер и т.д
    const weatherInfo = `
        City: ${locationData.city}
        Temperature: ${weatherData.current_weather.temperature}°C
        Wind Speed: ${weatherData.current_weather.windspeed} km/h
        Weather: ${interpretWeatherCode(weatherData.current_weather.weathercode)}
    `;
    // запрос с котам
    const catImage = await getCatImage();
    // задержка в 3 сек перед выполнением кода
    setTimeout(() => {
        // скрываем лоадер
        document.getElementById('loader').style.display = 'none';
        // находим элемент с weather-info и вставляем в него инфо о погоде
        document.getElementById('weather-info').innerText = weatherInfo;
        // ставим картинку
        document.getElementById('cat-pic').src = catImage;
    }, 3000);
}

// Запускаем функцию
showWeather();

// Получение данных о коте
async function getCatImage() {
    const headers = new Headers({
        // указание что это именно json
        "Content-Type": "application/json",
    });

    const requestOptions = {
        // get Получение данных
        method: 'GET',
        headers: headers,
        // перенаправляет на другую картинку
        redirect: 'follow'
    };

    const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
        requestOptions
    );
    // преобразовываем в json
    const data = await response.json();
    // Возвращаем URL изображения кота
    return data[0].url;
}

// Обработка нажатия на кнопку
document.querySelector('.change-cat-btn').addEventListener('click', async () => {
    // newCatImage храним тут
    const newCatImage = await getCatImage();
    // находим элемент с идентификатором cat-pic
    document.getElementById('cat-pic').src = newCatImage;
});
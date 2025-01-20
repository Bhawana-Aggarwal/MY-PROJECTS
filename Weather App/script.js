document.getElementById('weatherForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const location = document.getElementById('locationInput').value.trim();

    if (!location) {
        displayMessage('Please enter a valid location.');
        return;
    }

    const apiKey = '6debc839280a4a5097a125437252001';
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data. Please try again.');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
    }
});

function displayWeather(data) {
    const { location, current } = data;

    document.getElementById('weatherResult').innerHTML = `
      <h2>${location.name}, ${location.region}, ${location.country}</h2>
      <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${current.condition.text}</p>
      <p><strong>Humidity:</strong> ${current.humidity}%</p> 
      <p><strong>Wind Speed:</strong> ${current.wind_kph} kph</p>
      <p><strong>Air Quality Index (AQI):</strong> ${current.air_quality['pm2_5'].toFixed(2)}</p>
    `;
}

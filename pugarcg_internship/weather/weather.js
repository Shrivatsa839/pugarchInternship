const apiKey = "d1ff7a692d2b10ef6bdad48e4ba8fbc0"; 

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherDiv = document.getElementById("weatherInfo");

  if (!city) {
    weatherDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      weatherDiv.innerHTML = `<p>City not found.</p>`;
      return;
    }

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;
    const cityName = data.name;

    weatherDiv.innerHTML = `
      <h2>${cityName}</h2>
    
      <p><strong>${temp}°C</strong></p>
      <p>${desc}</p>
    `;
  } catch (error) {
    weatherDiv.innerHTML = "<p>Error fetching weather data.</p>";
  }
}

const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000; // Change this to the desired port number

app.get('/weather', async (req, res) => {
  const { api, q } = req.query; // Get the 'api' and 'q' query parameters from the URL

  if (!api || !q) {
    return res.status(400).json({ error: 'Missing API key or location query parameter.' });
  }

  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api}&q=${q}&days=5&aqi=no&alerts=no`);
    const weatherData = await response.json();

    const { location, current, forecast } = weatherData;
    const simplifiedForecast = forecast.forecastday.map(({ date, day }) => ({ date, day }));

    const modifiedResponse = {
      location,
      current,
      forecast: simplifiedForecast,
    };

    res.json(modifiedResponse);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'An error occurred while fetching weather data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

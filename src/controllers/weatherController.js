const fs = require('fs');
const path = require('path');  // Ensure path module is required for resolving paths

async function getWeatherDataByName(cityName) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../data/data.json'), 'utf-8', (err, data) => {
      if (err) {
        return reject({
          status: 'error',
          message: 'Failed to read data file',
          error: err.message
        });
      }

      try {
        const citiesData = JSON.parse(data);
        const cityWeather = citiesData.find(city => city.city.toLowerCase() === cityName.toLowerCase());

        if (cityWeather) {
          resolve({
            status: 'success',
            message: 'Weather data retrieved',
            data: {
              city: cityWeather.city,
              temperature: cityWeather.weather.temperature,
              humidity: cityWeather.weather.humidity,
              windSpeed: cityWeather.weather.windSpeed,
              conditions: cityWeather.weather.conditions
            }
          });
        } else {
          reject({
            status: 'error',
            message: 'Failed to retrieve weather data',
            error: 'City not found'
          });
        }
      } catch (parseError) {
        reject({
          status: 'error',
          message: 'Failed to parse weather data',
          error: parseError.message
        });
      }
    });
  });
}

// Function to get 7-day forecast data
async function getForecastDataByName(cityName) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, '../data/data.json'), 'utf-8', (err, data) => {
      if (err) {
        return reject({
          status: 'error',
          message: 'Failed to read data file',
          error: err.message
        });
      }

      try {
        const citiesData = JSON.parse(data);
        const cityWeather = citiesData.find(city => city.city.toLowerCase() === cityName.toLowerCase());

        if (cityWeather) {
          // Assuming `forecast` is a list of 7 days forecast data in the `cityWeather` object
          resolve({
            status: 'success',
            message: 'Forecast data retrieved',
            data: {
              day1: cityWeather.forecast[0],
              day2: cityWeather.forecast[1],
              day3: cityWeather.forecast[2],
              day4: cityWeather.forecast[3],
              day5: cityWeather.forecast[4],
              day6: cityWeather.forecast[5],
              day7: cityWeather.forecast[6]
            }
          });
        } else {
          reject({
            status: 'error',
            message: 'Failed to retrieve forecast data',
            error: 'City not found'
          });
        }
      } catch (parseError) {
        reject({
          status: 'error',
          message: 'Failed to parse forecast data',
          error: parseError.message
        });
      }
    });
  });
}

module.exports = {
  getWeatherDataByName,
  getForecastDataByName
};

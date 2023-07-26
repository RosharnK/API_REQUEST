/** @format */
//The API provides data for the dates between March 27, 2019, and March 31, 2019.
const axios = require("axios");
const readline = require("readline");

const API_URL =
  "https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=b6907d289e10d714a6e88b30761fae22";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Getting weather data using openweather API
function getWeatherData() {
  axios
    .get(API_URL)
    .then((response) => {
      const climateData = response.data;
      getUserChoice(climateData);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error.message);
    });
}

//Getting user choice
function getUserChoice(climateData) {
  rl.question(
    "Please choose an option:\n1. Get weather\n2. Get Wind Speed\n3. Get Pressure\n0. Exit\n",
    (option) => {
      switch (option) {
        case "1":
          getWeather(climateData);
          break;
        case "2":
          getWindSpeed(climateData);
          break;
        case "3":
          getPressure(climateData);
          break;
        case "0":
          console.log("Exiting the program....");
          rl.close();
          process.exit();
          break;
        default:
          console.log("Invalid option. Please try again.\n");
          getUserChoice(climateData);
          break;
      }
    }
  );
}

//Get Temperature data  for a specific data
function getWeather(climateData) {
  rl.question("Enter the date (YYYY-MM-DD): ", (date) => {
    const targetChoice = climateData.list.find((item) =>
      item.dt_txt.includes(date)
    );
    if (targetChoice) {
      console.log(
        `Temperature on ${targetChoice.dt_txt}: ${targetChoice.main.temp}°C`
      );
    } else {
      console.log("Data not available on the given date..");
    }
    getUserChoice(climateData);
  });
}
//Get windSpeed data  for a specific data
function getWindSpeed(climateData) {
  rl.question("Enter the date (YYYY-MM-DD): ", (date) => {
    const targetChoice = climateData.list.find((item) =>
      item.dt_txt.includes(date)
    );
    if (targetChoice) {
      console.log(
        `Wind Speed on ${targetChoice.dt_txt}: ${targetChoice.wind.speed} m/s`
      );
    } else {
      console.log("Data not available on the given date.");
    }
    getUserChoice(climateData);
  });
}
//Get Pressure data  for a specific data
function getPressure(climateData) {
  rl.question("Enter the date (YYYY-MM-DD): ", (date) => {
    const targetChoice = climateData.list.find((item) =>
      item.dt_txt.includes(date)
    );
    if (targetChoice) {
      console.log(
        `Pressure on ${targetChoice.dt_txt}: ${targetChoice.main.pressure} hPa`
      );
    } else {
      console.log("Data not available on the given date.");
    }
    getUserChoice(climateData);
  });
}

getWeatherData();

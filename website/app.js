/*-----------------Declaring Global Variables----------------- */

const APIKey = "2175e750906130b9a7a4c2d7005c037f";
const openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?appid=";
const baseURL = openWeatherURL + APIKey + "&zip=";
const tempUI = document.getElementById("temp");
const dateUI = document.getElementById("date");
const contentUI = document.getElementById("content");
const generateButton = document.getElementById("generate");
const userZipCodeInputValue = () => document.getElementById("zip").value;
let d = new Date();
const currentDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const userFeelingInputValue = () => document.getElementById("feelings").value;

/*----Get the weather data form the open weather api using the zipcode inputted by the user---*/

const getTemp = async () => {
  const response = await fetch(
    baseURL + userZipCodeInputValue() + "&units=metric"
  );
  const jsonResponse = await response.json();
  const data = {
    temperature: jsonResponse.main.temp,
    date: currentDate,
    content: userFeelingInputValue(),
  };

  postData(data);
  getWeatherData();
};

/*----storing the weather data to server endpoint(projectData) via post route setup on the server code---*/

const postData = async (data) => {
  const options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch("http://localhost:3000/api", options);
    const jsonData = await response.json();
  } catch (error) {
    console.log("error", error);
  }
};

/*-----getting the weather data from the server code endpoint back to the client ----*/

const getWeatherData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api");
    const data = await response.json();
    updatingUI(data);
  } catch (error) {
    console.log("error", error);
  }
};

/*updating the UI with the temperature, date and user feeling from the data fetched from server endpoint  */
const updatingUI = (data) => {
  tempUI.innerText = "Temperature: " + data.temperature + "°";
  dateUI.innerText = "Date: " + data.date;
  contentUI.innerText = "Feeling: " + data.content;
};

/*adding an event listener to the generate button to listen for a click and begin the functions cascade */

generateButton.addEventListener("click", getTemp);

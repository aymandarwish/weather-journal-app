// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
// const apiKey = '0fec4ccc9410e0d124aa99dffb0bb979';
const apiKey = '&appid=0fec4ccc9410e0d124aa99dffb0bb979&units=metric';

document.getElementById('generate').addEventListener('click', performAction);

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
function performAction(e){
  let city =  document.getElementById('city').value;
  const feelings =  document.getElementById('feelings').value;
  // API call
  getWeatherData(baseURL, city, apiKey) //changed
  .then(function(data){
      console.log(data)
      // Create a new date instance dynamically with JS
      let d = new Date();
      let myMonth = d.getMonth() + 1
      let newDate = myMonth+'.'+ d.getDate()+'.'+ d.getFullYear();
      // const Celsius = (data.main.temp - 273.15); If we use Fahrenheit instead
      // const temp = Math.round(Celsius); If we use Fahrenheit instead
      // Add data to POST request
      postData('/addWeather', {date: newDate, temp: data.main.temp, content:feelings} );
  })
  .then(
    function(){updateUI()} //invistigate about calling method inside function to apply async correctly
        )
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, city, apiKey)=>{
  const res = await fetch(baseURL+ city + apiKey); //changed
  try {
// Transform into JSON
    const weatherData  = await res.json();
    console.log(weatherData)
    return weatherData;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data) // body data type must match "Content-Type" header
});

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.content;

  }catch(error){
    console.log("error", error);
  }
}
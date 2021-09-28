// Setup empty JS object to act as endpoint for all routes
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);
// const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })
// Callback to debug
function listening() {
  console.log(`running on localhost: ${port}`)
};

// Callback function to complete GET '/all'
let projectData = {};

// Initialize all route with a callback function
app.get('/all', weatherData)

// Callback function to complete GET '/all'
function weatherData (req, res) {
  res.send(projectData);
  console.log(projectData)
};

// Post Route
function addWeather(req,res){
  console.log(req.body)
  projectData = req.body;
  res.send(projectData);
  console.log(projectData)
}

app.post('/addWeather', addWeather);
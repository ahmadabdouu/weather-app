// Require important modules to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Setup express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

// Setup endpoint for all routes
projectData = [];

// Setup Server
const port = 3000;
const server = app.listen(port, () => console.log(`server running on localhost: ${port}`));

// get routes

app.get("/api", (req, res) => {
    res.json(projectData[0])
});

// post routes

app.post('/api', (req, res) => {
    
    projectData = []
    projectData.push(req.body);
    console.log(projectData);
    res.json({
        status:"success",
        time: projectData[0].temperature
    });
});

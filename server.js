/********************************************************************************
* WEB322 – Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Manpreet Singh
* Student ID: 190709238
* Date: September 30, 2025
*
********************************************************************************/

const express = require('express');
const projectData = require('./modules/projects.js');

const app = express();




app.get("/", (req, res) => {
    res.send("Assignment 2: Manpreet Singh - 190709238");
});


app.get("/solutions/projects", (req, res) => {
    projectData.getAllProjects()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).send(err));
});


app.get("/solutions/projects/id-demo", (req, res) => {
    projectData.getProjectById(36)
        .then((project) => res.json(project))
        .catch((err) => res.status(404).send(err));
});


app.get("/solutions/projects/sector-demo", (req, res) => {
    projectData.getProjectsBySector("agriculture")
        .then((projects) => res.json(projects))
        .catch((err) => res.status(404).send(err));
});


projectData.initialize()
    .then(() => {
        console.log("Data initialized successfully");
    })
    .catch((err) => {
        console.error("Failed to initialize data:", err);
    });


module.exports = app;










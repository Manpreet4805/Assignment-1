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

// ROUTES

// Root route
app.get("/", (req, res) => {
    res.send("Assignment 2: Manpreet Singh - 190709238");
});

// Route to return all projects
app.get("/solutions/projects", (req, res) => {
    projectData.getAllProjects()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).send(err));
});

// Route to return a demo project by ID
app.get("/solutions/projects/id-demo", (req, res) => {
    projectData.getProjectById(3)
        .then((project) => res.json(project))
        .catch((err) => res.status(404).send(err));
});

// Route to return projects by sector (demo)
app.get("/solutions/projects/sector-demo", (req, res) => {
    projectData.getProjectsBySector("agriculture")
        .then((projects) => res.json(projects))
        .catch((err) => res.status(404).send(err));
});

// Initialize project data
projectData.initialize()
    .then(() => {
        console.log("Data initialized successfully");
    })
    .catch((err) => {
        console.error("Failed to initialize data:", err);
    });

// Export app instead of listening (for Vercel)
module.exports = app;


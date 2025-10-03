/********************************************************************************
* WEB322 – Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Your Name Here
* Student ID: Your Student ID Here
* Date: September 30, 2025
*
********************************************************************************/

const express = require('express');
const projectData = require('./modules/projects');

const app = express();
const HTTP_PORT = process.env.PORT || 3000;

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
    // You can use any known valid ID from your project data, like 3
    projectData.getProjectById(3)
        .then((project) => res.json(project))
        .catch((err) => res.status(404).send(err));
});

// Route to return projects by sector (demo)
app.get("/solutions/projects/sector-demo", (req, res) => {
    // Try sectors like "agriculture", "land", "industry"
    projectData.getProjectsBySector("agriculture")
        .then((projects) => res.json(projects))
        .catch((err) => res.status(404).send(err));
});

// Initialize project data before starting server
projectData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server is running on http://localhost:${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to initialize data:", err);
    });

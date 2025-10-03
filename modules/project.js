// modules/projects.js

const fs = require('fs');
const path = require('path');

let projects = []; // this will be populated in initialize()

// Read JSON data synchronously (once during initialization)
const sectorData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/sectorData.json')));
const projectData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/projectData.json')));

// Function to initialize the projects array with sector name added
function initialize() {
    return new Promise((resolve, reject) => {
        try {
            projects = [];

            projectData.forEach(project => {
                const sector = sectorData.find(s => s.id === project.sector_id);
                if (sector) {
                    projects.push({
                        ...project,
                        sector: sector.sector_name
                    });
                } else {
                    // If sector not found, still push project with "Unknown" sector
                    projects.push({
                        ...project,
                        sector: "Unknown"
                    });
                }
            });

            resolve(); // completed successfully
        } catch (err) {
            reject("Failed to initialize projects: " + err);
        }
    });
}

// Return all projects
function getAllProjects() {
    return new Promise((resolve, reject) => {
        if (projects.length === 0) {
            reject("No projects available. Did you call initialize()?");
        } else {
            resolve(projects);
        }
    });
}

// Return a project by ID
function getProjectById(projectId) {
    return new Promise((resolve, reject) => {
        const project = projects.find(p => p.id === projectId);
        if (project) {
            resolve(project);
        } else {
            reject(`Project with id ${projectId} not found.`);
        }
    });
}

// Return projects by sector (partial match, case-insensitive)
function getProjectsBySector(sector) {
    return new Promise((resolve, reject) => {
        const matchedProjects = projects.filter(p =>
            p.sector.toLowerCase().includes(sector.toLowerCase())
        );

        if (matchedProjects.length > 0) {
            resolve(matchedProjects);
        } else {
            reject(`No projects found for sector containing "${sector}".`);
        }
    });
}

// Export all functions
module.exports = {
    initialize,
    getAllProjects,
    getProjectById,
    getProjectsBySector
};

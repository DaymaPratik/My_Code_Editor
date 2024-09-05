const express = require('express');
const { getAllProjectFunction, createNewProjectFunction, saveEditProjectFunction, deleteProjectFunction } = require('../Controller/projectsController');
const router = express.Router();
router.post('/api/newProject', createNewProjectFunction);
router.post('/api/getAllProjects', getAllProjectFunction);
router.patch('/api/saveEditProject', saveEditProjectFunction);
router.get('/api/deleteProject/:id', deleteProjectFunction)
module.exports = router;
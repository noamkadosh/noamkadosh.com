const express = require('express');
const { body } = require('express-validator');

const authCheck = require('../middleware/auth-check');

const githubController = require('../controllers/github');

const router = express.Router();

// /project-settings => GET
router.get('/project-settings', githubController.getSettings);

// /project-settings => POST
router.post('/project-settings', body('project_count', 'Invalid input.').isInt({
    min: 1, 
    max: 5
}), authCheck, githubController.postSettings);

// /project-settings => PUT
router.put('/project-settings/:id', body('project_count', 'Invalid input.').isInt({
    min: 1, 
    max: 5
}), authCheck, githubController.putSettings);

// /github => GET
router.get('/github', githubController.getRepos);

module.exports = router;

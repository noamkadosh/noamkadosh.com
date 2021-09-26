const express = require('express');

const authCheck = require('../middleware/auth-check');

const heroController = require('../controllers/hero');
const aboutController = require('../controllers/about');
const quoteController = require('../controllers/quote');
const contactController = require('../controllers/contact');
const skillsController = require('../controllers/skills');
const timelinesController = require('../controllers/timelines');

const router = express.Router();

// /hero => GET
router.get('/hero', heroController.getHero);

// /hero => POST
router.post('/hero', authCheck, heroController.postHero);

// /hero/:id => PUT
router.put('/hero/:id', authCheck, heroController.putHero);

// /about => GET
router.get('/about', aboutController.getAbout);

// /about => POST
router.post('/about', authCheck, aboutController.postAbout);

// /about/:id => PUT
router.put('/about/:id', authCheck, aboutController.putAbout);

// /quote => GET
router.get('/quote', quoteController.getQuote);

// /quote => POST
router.post('/quote', authCheck, quoteController.postQuote);

// /quote/:id => PUT
router.put('/quote/:id', authCheck, quoteController.putQuote);

// /contact => GET
router.get('/contact', contactController.getContact);

// /contact => POST
router.post('/contact', authCheck, contactController.postContact);

// /contact/:id => PUT
router.put('/contact/:id', authCheck, contactController.putContact);

// /skills => GET
router.get('/skills', skillsController.getSkills);

// /skills => POST
router.post('/skills', authCheck, skillsController.postSkill);

// /skills/:id => PUT
router.put('/skills/:id', authCheck, skillsController.putSkill);

// /skills/:id => DELETE
router.delete('/skills/:id', authCheck, skillsController.deleteSkill);

// /timeline => GET
router.get('/timeline', timelinesController.getItems);

// /timeline => POST
router.post('/timeline', authCheck, timelinesController.postItem);

// /timeline/:id => PUT
router.put('/timeline/:id', authCheck, timelinesController.putItem);

// /timeline/:id => DELETE
router.delete('/timeline/:id', authCheck, timelinesController.deleteItem);

module.exports = router;

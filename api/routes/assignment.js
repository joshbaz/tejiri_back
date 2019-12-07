const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment');



router.post('/register', assignmentController.registerAssignment);


router.get('/:userId', assignmentController.getAssignmentByUserID);

router.get('/', assignmentController.getAllAssignments);

module.exports = router
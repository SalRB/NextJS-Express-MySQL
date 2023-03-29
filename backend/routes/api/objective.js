const express = require('express');
const router = express.Router();
const objectiveController = require('../../controllers/controller_objective');
const auth = require('../auth');

router.get('/', objectiveController.getAllObjectives);
router.post('/', auth.required, objectiveController.createObjective);
router.put('/:id', auth.required, objectiveController.updateObjective);
router.delete('/:id', auth.required, objectiveController.deleteObjective);
// router.delete('/', objectiveController.login);



// router.get('/delete', objectiveController.deleteobjectives);

module.exports = router;
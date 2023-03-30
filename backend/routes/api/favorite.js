const express = require('express');
const router = express.Router();
const favoriteController = require('../../controllers/controller_favorite');
const auth = require('../auth');

router.post('/', auth.required, favoriteController.toggleFavorite);
router.get('/:user', favoriteController.getUserFavorites);

module.exports = router;
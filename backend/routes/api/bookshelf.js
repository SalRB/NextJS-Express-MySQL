const express = require('express');
const router = express.Router();
const bookshelfController = require('../../controllers/controller_bookshelf');
const auth = require('../auth');

router.post('/:user', bookshelfController.getUserEntries);
router.get('/book/:book', auth.required, bookshelfController.getLoggedUserEntry);
router.get('/user/favorite/:user', bookshelfController.getUserFavorites);
router.post('/user/favorite', auth.required, bookshelfController.toggleFavorite);
router.post('/', auth.required, bookshelfController.createEntry);
router.put('/:book', auth.required, bookshelfController.updateEntry);
router.delete('/:book', auth.required, bookshelfController.deleteEntry);

// router.get('/delete', bookshelfController.deletecomments);

module.exports = router;
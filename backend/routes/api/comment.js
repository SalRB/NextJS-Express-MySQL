const express = require('express');
const router = express.Router();
const commentController = require('../../controllers/controller_comment');
const auth = require('../auth');

router.get('/', commentController.getAllComments);
router.get('/:book', commentController.getBookComments);
router.get('/user/:user', commentController.getUserComments);
router.post('/', auth.required, commentController.createComment);
router.put('/:id', auth.required, commentController.updateComment);
router.delete('/:id', auth.required, commentController.deleteComment);

// router.get('/delete', commentController.deletecomments);

module.exports = router;
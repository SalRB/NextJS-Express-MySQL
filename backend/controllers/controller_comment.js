const Comment = require('../models/comment');
const sql = require("../config/db.config");


exports.getAllComments = async (req, res) => {
    try {
        Comment.listAllComments(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.getBookComments = async (req, res) => {
    try {
        Comment.listBookComments(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.createComment = async (req, res) => {
    try {
        Comment.createComment(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.updateComment = async (req, res) => {
    try {
        Comment.updateComment(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.deleteComment = async (req, res) => {
    try {
        Comment.deleteComment(req, res);
    } catch (e) {
        console.log(e);
    }
}

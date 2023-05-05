const Bookshelf = require('../models/bookshelf');
const sql = require("../config/db.config");


exports.getUserEntries = async (req, res) => {
    try {
        Bookshelf.listUserEntries(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.getLoggedUserEntry = async (req, res) => {
    try {
        Bookshelf.getUserEntry(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.createEntry = async (req, res) => {
    try {
        Bookshelf.createEntry(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.updateEntry = async (req, res) => {
    try {
        Bookshelf.updateEntry(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.deleteEntry = async (req, res) => {
    try {
        Bookshelf.deleteEntry(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.toggleFavorite = async (req, res) => {
    try {
        Bookshelf.toggleFavorite(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.getUserFavorites = async (req, res) => {
    try {
        Bookshelf.listUserFavorites(req, res);
    } catch (e) {
        console.log(e);
    }
}
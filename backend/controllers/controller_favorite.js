const Favorite = require('../models/favorite');
const sql = require("../config/db.config");


exports.toggleFavorite = async (req, res) => {
    try {
        Favorite.toggleFavorite(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.getUserFavorites = async (req, res) => {
    try {
        Favorite.listUserFavorites(req, res);
    } catch (e) {
        console.log(e);
    }
}
const mySQLRequest = require('./mysql.controller');
const sql = require("../config/db.config");

const toggle = (req, res) => {
    const email = req.auth.username;
    const data = req.body;

    try {
        const result = mySQLRequest(req, res,
            `INSERT INTO favorites (user_id, book_id, favorited) 
            VALUES ((SELECT id FROM users WHERE email = ?), ?, ?) 
            ON DUPLICATE KEY UPDATE favorited = ?;`,
            [email, data.book, data.favorited, data.favorited]);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const userList = (req, res) => {
    const user = req.params.user;

    try {
        const result = mySQLRequest(req, res,
            `SELECT book_id, favorited FROM favorites
            WHERE user_id = ?`,
            user);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}


const favoriteAPI = {
    toggleFavorite: toggle,
    listUserFavorites: userList,
};

module.exports = favoriteAPI;
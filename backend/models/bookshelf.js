const mySQLRequest = require('./mysql.controller');
const sql = require("../config/db.config");

const list = (req, res) => {
    const data = req.body;
    const user_id = req.params.user;
    let filter = "";

    if (req.body.state) filter = `AND state_id = (SELECT id from states WHERE state_name = '${data.state}');`;

    try {
        const result = mySQLRequest(req, res,
            `SELECT bs.review, bs.progress, bs.favorited, b.*, s.state_name FROM bookshelf bs, books b, states s
            WHERE bs.book_id = b.id AND s.id = bs.state_id AND user_id = ? ${filter}`,
            [user_id]);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const userEntry = (req, res) => {
    const book = req.params.book;
    const email = req.auth.username;

    try {
        const result = mySQLRequest(req, res,
            `SELECT b.*, s.state_name FROM bookshelf b, users u, states s
            WHERE u.email = ? AND u.id = b.user_id AND b.book_id = ? AND s.id = b.state_id;`,
            [email, book]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

const create = (req, res) => {
    const data = req.body;
    const email = req.auth.username;
    // ON DUPLICATE KEY UPDATE id = id evita que salte un error sin que SQL cuente que la columna se ha actualizado, solo se lo salta
    try {
        const result = mySQLRequest(req, res,
            `INSERT INTO books (id, title, image, pages) 
            VALUES (?, ?, ?, ?) 
            ON DUPLICATE KEY UPDATE id = id; 

            INSERT INTO bookshelf (user_id, book_id, state_id)
            VALUES ((SELECT id FROM users WHERE email = ?), ?, 1)
            ON DUPLICATE KEY UPDATE book_id = book_id;
            SELECT * FROM bookshelf WHERE user_id = (SELECT id FROM users WHERE email = ?) AND book_id = ?;`,
            [data.id, data.title, data.image, data.pages, email, data.id, email, data.id]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

const update = (req, res) => {
    const data = req.body;
    const email = req.auth.username;
    const book = req.params.book;

    let to_update = "";

    if (data.state) {
        if (data.state == "Completed") {
            to_update = `bs.state_id = (SELECT id from states WHERE state_name = '${data.state}'), bs.completed_year = YEAR(UTC_TIMESTAMP()), bs.progress = b.pages`;
        } else {
            to_update = `bs.state_id = (SELECT id from states WHERE state_name = '${data.state}'), bs.completed_year = null`;
        }
    }
    if (typeof data.review) {
        if (data.review?.length != undefined)
            to_update = `review = null`;
        if (data.review?.length >= 1)
            to_update = `review = '${data.review}'`;
    }
    if (data.progress) to_update = `progress = '${data.progress}'`;

    try {
        const result = mySQLRequest(req, res,
            `UPDATE bookshelf bs, books b
            SET ${to_update}
            WHERE bs.user_id = (SELECT id FROM users WHERE email = ?) AND bs.book_id = ? AND bs.book_id = b.id;`,
            [email, book]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

const deleteOne = (req, res) => {
    const email = req.auth.username;
    const book = req.params.book;

    try {
        const result = mySQLRequest(req, res,
            `DELETE FROM bookshelf
            WHERE user_id = (SELECT id FROM users WHERE email = ?) AND book_id = ?;`,
            [email, book]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

const toggleFav = (req, res) => {
    const email = req.auth.username;
    const data = req.body;

    try {
        const result = mySQLRequest(req, res,
            `UPDATE bookshelf
            SET favorited = ?
            WHERE book_id = ? AND user_id = (SELECT id FROM users WHERE email = ?);`,
            [data.favorited, data.book, email]);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const userFavorites = (req, res) => {
    const user = req.params.user;

    try {
        const result = mySQLRequest(req, res,
            `SELECT bs.favorited, b.*
            FROM bookshelf bs, books b
            WHERE bs.user_id = ? AND bs.favorited = true AND b.id = bs.book_id;`,
            user);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}


const bookshelfAPI = {
    listUserEntries: list,
    getUserEntry: userEntry,
    createEntry: create,
    updateEntry: update,
    deleteEntry: deleteOne,
    toggleFavorite: toggleFav,
    listUserFavorites: userFavorites,
};

module.exports = bookshelfAPI;
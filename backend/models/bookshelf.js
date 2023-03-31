const mySQLRequest = require('./mysql.controller');
const sql = require("../config/db.config");

const list = (req, res) => {
    const user_id = req.params.user;
    let filter = "";

    if (req.body.state) filter = `AND state = '${req.body.state}';`;

    try {
        const result = mySQLRequest(req, res,
            `SELECT * FROM bookshelf 
            WHERE user_id = ? ${filter}`,
            [user_id]);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const create = (req, res) => {
    const data = req.body;
    const email = req.auth.username;

    try {
        const result = mySQLRequest(req, res,
            `INSERT INTO bookshelf (user_id, book)
            VALUES ((SELECT id FROM users WHERE email = ?), ?);
            SELECT * FROM bookshelf WHERE user_id = (SELECT id FROM users WHERE email = ?) AND book = ?;`,
            [email, data.book, email, data.book]);
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

    if (data.state) to_update = `state = '${data.state}'`;
    if (data.review) to_update = `review = '${data.review}'`;
    if (data.progress) to_update = `progress = '${data.progress}'`;

    try {
        const result = mySQLRequest(req, res,
            `UPDATE bookshelf
            SET ${to_update}
            WHERE user_id = (SELECT id FROM users WHERE email = ?) AND book = ?;`,
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
            WHERE user_id = (SELECT id FROM users WHERE email = ?) AND book = ?;`,
            [email, book]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

const bookshelfAPI = {
    listUserEntries: list,
    createEntry: create,
    updateEntry: update,
    deleteEntry: deleteOne,
};

module.exports = bookshelfAPI;
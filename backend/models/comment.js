const mySQLRequest = require('./mysql.controller');
const sql = require("../config/db.config");

const list = (req, res) => {
    try {
        const result = mySQLRequest(req, res, "SELECT * FROM comments");
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const bookList = (req, res) => {
    let book = req.params.book;

    try {
        const result = mySQLRequest(req, res, "SELECT * FROM comments WHERE book = ?;", book);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const create = (req, res) => {
    let data = req.body;

    try {
        const result = mySQLRequest(req, res,
            `INSERT INTO comments (user_id, book, content, created_at)
            VALUES ((SELECT id FROM users WHERE email = ?), ?, ?, UTC_TIMESTAMP());
            SELECT * FROM comments WHERE id = LAST_INSERT_ID();`,
            [req.auth.username, data.book, data.content]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

const update = (req, res) => {
    let data = req.body;
    let id = req.params.id;

    try {
        const result = mySQLRequest(req, res,
            `UPDATE comments
            SET edited = true, content = ?
            WHERE id = ?;`,
            [data.content, id]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

const deleteOne = (req, res) => {
    let id = req.params.id;

    try {
        const result = mySQLRequest(req, res,
            `DELETE FROM comments
            WHERE id = ?;`,
            [id]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

const commentAPI = {
    listAllComments: list,
    listBookComments: bookList,
    createComment: create,
    updateComment: update,
    deleteComment: deleteOne,
};

module.exports = commentAPI;
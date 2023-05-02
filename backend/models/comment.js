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
        const result = mySQLRequest(req, res, "SELECT c.*, u.username FROM comments c, users u WHERE c.book_id = ? AND c.user_id = u.id;", book);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const userList = (req, res) => {
    const user = req.params.user;

    try {
        const result = mySQLRequest(req, res, "SELECT b.*, c.*, u.username FROM comments c, users u, books b WHERE c.user_id = u.id AND u.id = ? AND c.book_id = b.id;", user);
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const create = (req, res) => {
    let data = req.body;

    try {
        const result = mySQLRequest(req, res,
            `INSERT INTO comments (user_id, book_id, content, created_at)
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
    listUserComments: userList,
    createComment: create,
    updateComment: update,
    deleteComment: deleteOne,
};

module.exports = commentAPI;
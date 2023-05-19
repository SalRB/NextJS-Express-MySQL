const mySQLRequest = require('./mysql.controller');
const sql = require("../config/db.config");

const list = (req, res) => {
    try {
        const result = mySQLRequest(req, res, "SELECT * FROM objectives");
        return { status: 200, result: result }
    } catch (e) {
        return { status: 500, error: e, result: undefined };
    }
}

const userList = (req, res) => {
    let id = req.params.id;

    try {
        const result = mySQLRequest(req, res,
            `SELECT o.*, COUNT(bs.book_id) as read_books 
            FROM objectives o           
            LEFT JOIN bookshelf bs ON o.objective_year = bs.completed_year
            WHERE o.user_id = ? 
            GROUP BY o.objective_year
            ORDER BY o.objective_year DESC;`,
            id);
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
            `INSERT INTO objectives (user_id, to_read, objective_year)
            VALUES ((SELECT id FROM users WHERE email = ?), ?, YEAR(UTC_TIMESTAMP()));
            SELECT o.* FROM objectives o, users u WHERE u.email = ? AND o.user_id = u.id AND o.objective_year = YEAR(UTC_TIMESTAMP());`,
            [email, data.to_read, email]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

const update = (req, res) => {
    let data = req.body;
    const email = req.auth.username;

    try {
        const result = mySQLRequest(req, res,
            `UPDATE objectives o, users u
            SET o.to_read = ?
            WHERE u.email = ? AND o.user_id = u.id AND o.objective_year = YEAR(UTC_TIMESTAMP());`,
            [data.to_read, email]);
        return { status: 200, result: result }
    } catch (e) {
        res.status(500).send("Something went wrong")
    }
}

// const deleteOne = (req, res) => {
//     let id = req.params.id;

//     try {
//         const result = mySQLRequest(req, res,
//             `DELETE FROM objectives
//             WHERE id = ?;`,
//             [id]);
//         return { status: 200, result: result }
//     } catch (e) {
//         res.status(500).send("Something went wrong")
//     }
// }

const objectiveAPI = {
    listAllObjectives: list,
    listUserObjectives: userList,
    createObjective: create,
    updateObjective: update,
    // deleteObjective: deleteOne,
};

module.exports = objectiveAPI;
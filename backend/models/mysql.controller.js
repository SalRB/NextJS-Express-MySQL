const sql = require("../config/db.config");

const mySQLRequest = async (req, res, request, params = null) => {
    try {
        let a = sql.query(request, params, (err, result) => {
            if (err) if (err.errno == 1062) res.status(500).send({ msg: "Something went wrong", msgType: "error" })
            res.status(200).send(result)
        });
        console.log(a.sql);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = mySQLRequest;
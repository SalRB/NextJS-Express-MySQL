const sql = require("../config/db.config");

const mySQLRequest = async (req, res, request, params = null) => {

    // const result = await sql.query(request);
    // console.log(result);
    // res.json(result);
    try {
        let a = sql.query(request, params, (err, result) => {
            if (err) if (err.errno == 1062) res.status(500).send("Email already taken")
            res.status(200).send(result)
        });
        console.log(a.sql);
    } catch (error) {
        res.status(500).send(error)
    }


    // let juan;
    // sql.query(request, (err, result) => {
    //     if (err) {
    //         return err;
    //     }
    //     // console.log(result, "1");
    //     juan = result;
    //     return result;
    //     // return JSON.stringify(result);

    // });
    // console.log(juan);
    // return juan;
    // const { results, } = rows
    // console.log(rows, "2");
}

module.exports = mySQLRequest;
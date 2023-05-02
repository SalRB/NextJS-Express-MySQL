const User = require('../models/user');
const sql = require("../config/db.config");

exports.register = async (req, res) => {
    if (!validateData(req, res)) {
        try {
            User.registerUser(req, res);
        } catch (e) {
            console.log(e);
        }
    }
}

exports.login = async (req, res) => {
    try {
        User.loginUser(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.getUser = async (req, res) => {
    try {
        User.getUser(req, res);
    } catch (e) {
        console.log(e);
    }
}

function validateData(req, res) {
    data = req.body;

    const regex = {
        email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm,
        // Deshabilitada por comodidad en el testeo
        // const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        passwd: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/igm,
    };

    let invalidFormat = false;

    for (const key in data) {
        console.log(data[key]);
        if (!regex[key].exec(data[key])) {
            invalidFormat = true;
            res.status(500).send({ msg: "Invalid " + key + " format.", invalid: key })
            break;
        }
    }

    return invalidFormat;
}

exports.loadUser = (req, res) => {
    try {
        const result = User.listAllUsers(req, res);
        if (result.error) res.status(result.status).send(result.error);
        // res.status(result.status).send(result.result);
    } catch (error) {
        // res.status(500).send("Something went wrong")
    }
}
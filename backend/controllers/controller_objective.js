const Objective = require('../models/objective');
const sql = require("../config/db.config");


exports.getAllObjectives = async (req, res) => {
    try {
        Objective.listAllObjectives(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.createObjective = async (req, res) => {
    try {
        Objective.createObjective(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.updateObjective = async (req, res) => {
    try {
        Objective.updateObjective(req, res);
    } catch (e) {
        console.log(e);
    }
}

exports.deleteObjective = async (req, res) => {
    try {
        Objective.deleteObjective(req, res);
    } catch (e) {
        console.log(e);
    }
}

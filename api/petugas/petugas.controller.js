let {
    serviceAddPetugas,
    serviceGetPetugas,
    serviceGetPetugasById,
    serviceUpdatePetugas,
    serviceDeletePetugas,
    serviceGetPetugasByEmail
} = require("./petugas.service");
let { genSaltSync, hashSync, compareSync } = require("bcrypt");
let { sign } = require("jsonwebtoken");

module.exports = {
    controllerAddPetugas: (req, res) => {
        let body = req.body;
        let salt = genSaltSync(10);
        body.password = hashSync(`${body.password}`, salt);
        serviceAddPetugas(body, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    succes: 0,
                    message: "database connection error"
                });
            } else {
                return res.status(200).json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerGetPetugasById: (req, res) => {
        let kd_petugas = req.params.id;
        serviceGetPetugasById(kd_petugas, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Record not found"
                });
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerGetPetugas: (req, res) => {
        serviceGetPetugas((err, results) => {
            if (err) {
                console.error(err);
                return;
            } else {
                return res.json({
                    succes: 1,
                    data: results
                });
            }
        });
    },
    controllerUpdatePetugas: (req, res) => {
        let body = req.body;
        let salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        serviceUpdatePetugas(body, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "update failed"
                });
            } else {
                return res.json({
                    succes: 1,
                    message: "update lur"
                });
            }
        });
    },
    controllerDeletePetugas: (req, res) => {
        let data = req.body
        serviceDeletePetugas(data, (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Record not found"
                });
            } else {
                return res.json({
                    succes: 1,
                    message: "user delete succesfuly"
                });
            }
        });
    },
    controllerLogin: (req, res) => {
        let body = req.body;
        serviceGetPetugasByEmail(body.email, (err, results) => {
            if (err) {
                console.error(err);
            }
            if (!results) {
                return res.json({
                    succes: 0,
                    message: "Invalid email or password"
                });
            }
            let result = compareSync(body.password, results.password);

            if (result) {
                results.password = undefined;
                let jsonwebtoken = sign({ result: results }, "secretkey", {
                    expiresIn: "1h"
                });
                return res.json({
                    succes: 1,
                    message: "login succesfuly, your Account Already Use",
                    account: results,
                    token: jsonwebtoken
                });
            } else {
                return res.json({
                    succes: 0,
                    message: "email or password invalid"
                });
            }
        });
    }
};

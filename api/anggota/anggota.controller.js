let {
    serviceAddAnggota,
    serviceGetAnggota,
    serviceGetAnggotaById,
    serviceUpdateAnggota,
    serviceDeleteAnggota,
    serviceGetAnggotaByEmail
} = require("./anggota.service");
let { genSaltSync, hashSync, compareSync } = require("bcrypt");
let { sign } = require("jsonwebtoken");

module.exports = {
    controllerAddAnggota: (req, res) => {
        let body = req.body;
        let salt = genSaltSync(10);
        body.password = hashSync(`${body.password}`, salt);
        serviceAddAnggota(body, (err, results) => {
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
    controllerGetAnggotaById: (req, res) => {
        let kd_anggota = req.params.id;
        serviceGetAnggotaById(kd_anggota, (err, results) => {
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
    controllerGetAnggota: (req, res) => {
        serviceGetAnggota((err, results) => {
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
    controllerUpdateAnggota: (req, res) => {
        let body = req.body;
        let salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        serviceUpdateAnggota(body, (err, results) => {
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
    controllerDeleteAnggota: (req, res) => {
        let data = req.body
        serviceDeleteAnggota(data, (err, results) => {
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
        serviceGetAnggotaByEmail(body.email, (err, results) => {
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

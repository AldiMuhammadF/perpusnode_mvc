let {
    serviceAddBukuku,
    serviceGetBukuku,
    serviceGetBukukuById,
    serviceUpdateBukuku,
    serviceDeleteBukuku
} = require("./buku.service");

module.exports = {
    controllerAddBuku: (req, res) => {
        let body = req.body;
        serviceAddBukuku(body, (err, results) => {
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
    controllerGetBukuById: (req, res) => {
        let kd_buku = req.params.id;
        serviceGetBukukuById(kd_buku, (err, results) => {
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
    controllerGetBuku: (req, res) => {
        serviceGetBukuku((err, results) => {
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
    controllerUpdateBuku: (req, res) => {
        let body = req.body;
        serviceUpdateBukuku(body, (err, results) => {
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
    controllerDeleteBuku: (req, res) => {
        let body = req.body
        serviceDeleteBukuku(body, (err, results) => {
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
    }
};

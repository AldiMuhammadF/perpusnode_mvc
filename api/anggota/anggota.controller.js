let {
    serviceAddAnggota,
    serviceGetAnggota,
    serviceGetAnggotaById,
    serviceUpdateAnggota,
    serviceDeleteAnggota
} = require("./anggota.service");

module.exports = {
    controllerAddAnggota: (req, res) => {
        let body = req.body;
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
    }
};

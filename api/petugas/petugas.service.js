let db = require('../../config/connection');

module.exports = {
    serviceAddPetugas: (data, callBack) => {
        db.query(
            `insert into petugas(nm_petugas,email,password, jabatan, tlpn_petugas)
          values (?,?,?,?,?)`,
            [
                data.nm_petugas,
                data.email,
                data.password,
                data.jabatan,
                data.tlpn_petugas
            ],
            (error, result, fields) => {
                if (error) {
                    return callBack(error);
                } else {
                    return callBack(null, result);
                }
            }
        );
    },
    serviceGetPetugas: callBack => {
        db.query(`select * from petugas`, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    serviceGetPetugasById: (kd_petugas, callBack) => {
        db.query(
            `select * from petugas where kd_petugas = ?`,
            [kd_petugas],
            (err, resuls, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, resuls[0]);
                }
            }
        );
    },
    serviceUpdatePetugas: (data, callBack) => {
        db.query(
            `update petugas set nm_petugas=?, email=?,password=?, jabatan=?, tlpn_petugas=? where kd_petugas=?`,
            [
                data.nm_petugas,
                data.email,
                data.password,
                data.jabatan,
                data.tlpn_petugas,
                data.kd_petugas
            ],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    serviceDeletePetugas: (data, callBack) => {
        db.query(`select * from petugas where kd_petugas=?`,
            [data.kd_petugas],
            (err, result) => {
                if (err) {
                    callBack(err)
                } if (!result) {
                    callBack(result)
                } else {
                    db.query(`delete from petugas where kd_petugas=?`,
                        [data.kd_petugas])
                    return callBack(null, result[0])
                }
            })
    },
    serviceGetPetugasByEmail: (email, callBack) => {
        db.query(
            `select kd_petugas, nm_petugas, email, password from petugas where email = ?`,
            [email],
            (err, results, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results[0]);
                }
            }
        );
    }
};

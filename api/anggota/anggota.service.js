let db = require('../../config/connection');

module.exports = {
    serviceAddAnggota: (data, callBack) => {
        db.query(
            `insert into anggota(nm_anggota,email,password, alamat, tlpn)
          values (?,?,?,?,?)`,
            [
                data.nm_anggota,
                data.email,
                data.password,
                data.alamat,
                data.tlpn
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
    serviceGetAnggota: callBack => {
        db.query(`select * from anggota`, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    serviceGetAnggotaById: (kd_anggota, callBack) => {
        db.query(
            `select * from anggota where kd_anggota = ?`,
            [kd_anggota],
            (err, resuls, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, resuls[0]);
                }
            }
        );
    },
    serviceUpdateAnggota: (data, callBack) => {
        db.query(
            `update anggota set nm_anggota=?, email=?,password=?, alamat=?, tlpn=? where kd_anggota=?`,
            [
                data.nm_anggota,
                data.email,
                data.password,
                data.alamat,
                data.tlpn,
                data.kd_anggota
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
    serviceDeleteAnggota: (data, callBack) => {
        db.query(`select * from anggota where kd_anggota=?`,
            [data.kd_anggota],
            (err, result) => {
                if (err) {
                    callBack(err)
                } if (!result) {
                    callBack(result)
                } else {
                    db.query(`delete from anggota where kd_anggota=?`,
                        [data.kd_anggota])
                    return callBack(null, result[0])
                }
            })
    },
    serviceGetAnggotaByEmail: (email, callBack) => {
        db.query(
            `select nm_anggota, email, password from anggota where email = ?`,
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

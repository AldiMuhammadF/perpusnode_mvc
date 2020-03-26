let db = require('../../config/connection');

module.exports = {
    serviceAddBukuku: (data, callBack) => {
        db.query(
            `insert into buku(nm_buku, stok, pengarang, penerbit, tarif, durasi)
          values (?,?,?,?,?,?)`,
            [
                data.nm_buku,
                data.stok,
                data.pengarang,
                data.penerbit,
                data.tarif,
                data.durasi
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
    serviceGetBukuku: callBack => {
        db.query(`select * from buku`, [], (err, results, fields) => {
            if (err) {
                return callBack(err);
            } else {
                return callBack(null, results);
            }
        });
    },
    serviceGetBukukuById: (kd_buku, callBack) => {
        db.query(
            `select * from buku where kd_buku = ?`,
            [kd_buku],
            (err, resuls, fields) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, resuls[0]);
                }
            }
        );
    },
    serviceUpdateBukuku: (data, callBack) => {
        db.query(
            `update buku set stok=?, tarif=? ,durasi=? where kd_buku=?`,
            [
                data.stok,
                data.tarif,
                data.durasi,
                data.kd_buku
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
    serviceDeleteBukuku: (data, callBack) => {
        db.query(`select * from buku where kd_buku=?`,
            [data.kd_buku],
            (err, result) => {
                if (err) {
                    callBack(err)
                } if (!result) {
                    callBack(result)
                } else {
                    db.query(`delete from buku where kd_buku=?`,
                        [data.kd_buku])
                    return callBack(null, result[0])
                }
            })
    }
};

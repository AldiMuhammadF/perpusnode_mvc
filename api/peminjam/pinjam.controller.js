const {
    serviceAddPinjam,
    serviceGetPinjam,
    serviceGetPinjamById,
    serviceUpdatePinjam,
    serviceDeletePinjam
} = require('./pinjam.service');
const { verify } = require('jsonwebtoken')

module.exports = {
    controllerPeminjaman: (req, res) => {
        const body = req.body
        const token = req.get("authorization")
        if (token) {
            let wow = token.slice(7)
            verify(wow, "secretkey", (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Login First"
                    })
                } else {
                    var user = decoded.result
                    const data = {
                        kd_buku: body.kd_buku,
                        nm_anggota: user.nm_anggota,
                        nm_petugas: body.nm_petugas,
                        tgl_pinjam: body.tgl,
                    }
                    serviceAddPinjam(data, (err, results) => {
                        if (err) {
                            if (err === "out of stok") {
                                return res.json({
                                    success: 0,
                                    message: "Stok Habis"
                                })
                            }
                            if (err === "stok tdk cukup") {
                                return res.json({
                                    success: 0,
                                    message: "Permintaan Terlalu Banyak"
                                })
                            }
                            if (err === "No-Id") {
                                return res.json({
                                    success: 0,
                                    message: "Tidak Ditemukan"
                                })
                            }
                            console.log(err);
                            return;
                        }
                        if (!results) {
                            return res.json({
                                success: 0,
                                message: "Tidak Ditemukan"
                            })
                        } else {
                            return res.json({
                                success: 1,
                                message: "Terpinjam"
                            })
                        }
                    })
                }
            })
        }
    },

}
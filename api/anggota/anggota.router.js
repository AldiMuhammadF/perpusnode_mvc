let {
    controllerAddAnggota,
    controllerGetAnggota,
    controllerGetAnggotaById,
    controllerUpdateAnggota,
    controllerDeleteAnggota,
    controllerLogin
} = require("./anggota.controller");

let router = require("express").Router();
let { checkToken } = require("../../auth/token");

router.post("/tambahanggota", controllerAddAnggota);
router.get("/ambilanggota", checkToken, controllerGetAnggota);
router.get("/:id", checkToken, controllerGetAnggotaById);
router.patch("/editanggota", checkToken, controllerUpdateAnggota);
router.delete("/hapusanggota", checkToken, controllerDeleteAnggota);
router.post("/login", controllerLogin);


module.exports = router;

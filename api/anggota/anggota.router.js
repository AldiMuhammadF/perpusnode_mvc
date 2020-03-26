let {
    controllerAddAnggota,
    controllerGetAnggota,
    controllerGetAnggotaById,
    controllerUpdateAnggota,
    controllerDeleteAnggota
} = require("./anggota.controller");

let router = require("express").Router();

router.post("/tambahanggota", controllerAddAnggota);
router.get("/ambilanggota", controllerGetAnggota);
router.get("/:id", controllerGetAnggotaById);
router.patch("/editanggota", controllerUpdateAnggota);
router.delete("/hapusanggota", controllerDeleteAnggota);


module.exports = router;

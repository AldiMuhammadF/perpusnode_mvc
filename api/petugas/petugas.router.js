let {
    controllerAddPetugas,
    controllerGetPetugas,
    controllerGetPetugasById,
    controllerUpdatePetugas,
    controllerDeletePetugas,
    controllerLogin
} = require("./petugas.controller");

let router = require("express").Router();
let { checkToken } = require("../../auth/token");

router.post("/tambahpetugas", controllerAddPetugas);
router.get("/ambilpetugas", checkToken, controllerGetPetugas);
router.get("/:id", checkToken, controllerGetPetugasById);
router.patch("/editpetugas", checkToken, controllerUpdatePetugas);
router.delete("/hapuspetugas", checkToken, controllerDeletePetugas);
router.post("/login", controllerLogin);


module.exports = router;

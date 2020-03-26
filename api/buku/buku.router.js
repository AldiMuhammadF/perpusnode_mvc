let {
    controllerAddBuku,
    controllerGetBuku,
    controllerGetBukuById,
    controllerUpdateBuku,
    controllerDeleteBuku
} = require("./buku.controller");

let router = require("express").Router();

router.post("/tambahbuku", controllerAddBuku);
router.get("/ambilbuku", controllerGetBuku);
router.get("/:id", controllerGetBukuById);
router.patch("/editbuku", controllerUpdateBuku);
router.delete("/hapusbuku", controllerDeleteBuku);


module.exports = router;

require("dotenv").config();
let express = require("express");
let app = express();
let anggotaRouter = require("./api/anggota/anggota.router");
let bukuRouter = require("./api/buku/buku.router");
let petugasRoter = require("./api/petugas/petugas.router");
let pinjam = require("./api/peminjam/pinjam.router");

app.use(express.json());
app.use("/api/anggota", anggotaRouter);
app.use("/api/buku", bukuRouter);
app.use("/api/petugas", petugasRoter);
app.use("/api/pinjam", pinjam);

app.listen(process.env.APP_PORT, () => {
    console.error("running on port " + process.env.APP_PORT);
});

const express = require('express');

const router = express.Router();

const cntrComp = require('../controllers/compra.js');

router.get("/:id", cntrComp.getCompra);

router.get("/", cntrComp.getAllCompras);

router.post("/", cntrComp.createCompra);

//router.delete("/:id", cntrSubs.endSubscricao);

module.exports = router
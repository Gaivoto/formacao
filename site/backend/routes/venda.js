const express = require('express');

const router = express.Router();

const cntrVend = require('../controllers/venda.js');


router.get("/", cntrVend.getVendas);


module.exports = router
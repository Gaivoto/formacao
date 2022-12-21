const express = require('express');

const router = express.Router();

const cntrGast = require('../controllers/gasto.js');


router.get("/", cntrGast.getGastos);


module.exports = router
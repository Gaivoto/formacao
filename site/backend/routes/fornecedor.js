const express = require('express');

const router = express.Router();

const cntrForn = require('../controllers/fornecedor.js');


router.get("/", cntrForn.getFornecedores);


module.exports = router
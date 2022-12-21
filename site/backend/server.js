const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const rtAuth = require('./routes/auth.js');
const rtUser = require('./routes/user.js');
const rtForn = require('./routes/fornecedor.js');
const rtGast = require('./routes/gasto.js');
const rtVend = require('./routes/venda.js');

app.use("/api/auth", rtAuth);

app.use("/api/users", rtUser);

app.use("/api/fornecedores", rtForn);

app.use("/api/gastos", rtGast);

app.use("/api/vendas", rtVend);

app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));
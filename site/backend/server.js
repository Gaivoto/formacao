const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const rtAuth = require('./routes/auth.js');
const rtUser = require('./routes/user.js');
const rtCurs = require('./routes/curso.js');
const rtVide = require('./routes/video.js');
const rtAdm = require('./routes/admin.js');
const rtCria = require('./routes/criador.js');
const rtNotf = require('./routes/notification.js')
const rtDipl = require('./routes/diploma.js');
const rtSubs = require('./routes/subscricao.js');
const rtComp = require('./routes/compra.js');

app.use("/api/auth", rtAuth);

app.use("/api/users", rtUser);

app.use("/api/cursos", rtCurs);

app.use("/api/videos", rtVide);

app.use("/api/admins", rtAdm);

app.use("/api/criadores", rtCria);

app.use("/api/notification", rtNotf);

app.use("/api/diplomas", rtDipl);

app.use("/api/subscricoes", rtSubs);

app.use("/api/compras", rtComp);

app.listen(process.env.PORT, () => console.log(`Listening to port ${process.env.PORT}`));
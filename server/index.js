const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
app.use(require('../server/api/routes/user'));
app.use(require('../server/api/routes/article'));
app.listen(5000);

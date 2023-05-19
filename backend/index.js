const express = require('express');
const connection = require('./config/db.config');
require('dotenv').config();
const cors = require('cors');

const app = express();

// console.log(connection);
connection;

app.use(cors());

app.use(express.json());

// require('./models');
app.use(require('./routes'));

app.listen(process.env.PORT_BACKEND, () => {
    console.log(`Server running`);
})

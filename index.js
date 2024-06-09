const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const db_connect = require('./config/connectDB');
const initRoutes = require('./routes');

require('./config/redis.config'); // run redis

app.use(cors({
    origin: process.env.CLIENT_URL_LAND,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

initRoutes(app);
db_connect();

app.use('/', (req, res) => {
    res.send('Server on ...');
})

let PORT = process.env.PORT_LAND || 8080;

app.listen(PORT, () => {
    console.log(`Server on ready on port ${PORT}`)
})
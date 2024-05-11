const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');

app.use(cors({
    origin: process.env.CLIENT_URL_LAND,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', (req, res) => {
    res.send('Server on ...');
})

const PORT = process.env.PORT_LAND || 3000;

app.listen(PORT, () => {
    console.log(`Server on ready on port ${PORT}`)
})
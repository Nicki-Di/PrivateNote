const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./db");
const connection = db.initDB()
const app = express()
require('dotenv').config();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin: '*',
}));

db.createTables(connection)

app.post('/add-note', async (req, res) => {
    console.log('/add-note')
    let content = req.body.content;
    db.addNote(connection, content).then(result => {
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})


app.get('/get-note', async (req, res) => {
    console.log('/get-note')
    db.getNote(connection, req.query.id).then(result => {
        res.status(200).send(result);
    }).catch(e => {
        console.log(e)
        res.status(400).send(e);
    });
})

app.get('/', async (req, res) => {
    res.status(200).send("Alive!");
})


app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}!`);
});
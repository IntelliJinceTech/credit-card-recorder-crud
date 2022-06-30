const express = require("express");
const app = express();
const PORT = 8001;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "creditcardrecorder";

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then((client) => {
        console.log(`Connected to the ${dbName} database`);
    })
    .catch((error) => console.error(error));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/creditcards", (req, res) => {
    console.log("swipe me bro");
});

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});

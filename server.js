const express = require("express");
const app = express();
const PORT = 8001;
const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
app.set("view engine", "ejs"); //tells express that we are using EJS as template engine

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "credit-card-recorder";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then((client) => {
        console.log(`Connected to the ${dbName} database`);
        db = client.db(dbName);
    })
    .catch((error) => console.error(error));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

app.get("/", (request, response) => {
    db.collection("creditCards")
        .find()
        .sort({ likes: -1 })
        .toArray()
        .then((data) => {
            response.render("index.ejs", { info: data });
        })
        .catch((error) => console.error(error));
});

app.post("/creditcards", (request, response) => {
    db.collection("creditCards")
        .insertOne({
            stageName: request.body.stageName,
            birthName: request.body.birthName,
            likes: 0,
        })
        .then((result) => {
            console.log("Rapper Added");
            response.redirect("/");
        })
        .catch((error) => console.error(error));
});

// app.post("/creditcards", (req, res) => {
//     console.log("swipe me bro");
// });

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});

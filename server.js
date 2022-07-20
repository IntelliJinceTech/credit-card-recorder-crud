const express = require("express");
const app = express();
const PORT = 8001;
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
require("dotenv").config();
//add model variable
const creditCard = require("./models/creditCard");

//add middleware
app.set("view engine", "ejs"); //tells express that we are using EJS as template engine
app.use(express.static("public")); //ask express to use the public folder
app.use(express.urlencoded({ extended: true })); //help validate user input  - allows us to send arrays/objects/json

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "credit-card-recorder",
    cardCollection;

mongoose.connect(dbConnectionStr, { useNewUrlParser: true }, () =>
    console.log("Connected to db!")
);

app.get("/", async (req, res) => {
    try {
        creditCard.find({}, (err, cards) => {
            res.render("index.ejs", { creditCard: cards });
        });
        //render ejs
        //getting current credit cards
    } catch (error) {
        console.log(error);
    }
});

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});

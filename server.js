const express = require("express");
const app = express();
const PORT = 8001;
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
require("dotenv").config();
//add model variable
const CreditCard = require("./models/creditCard");

//add middleware
app.set("view engine", "ejs"); //tells express that we are using EJS as template engine
app.use(express.static("public")); //ask express to use the public folder
app.use(express.urlencoded({ extended: true })); //help validate user input  - allows us to send arrays/objects/json

app.use(express.json()); //tells express to automatically parse JSON payloads and make that available in the request body

let db,
    dbConnectionStr = process.env.DB_CONNECTION,
    dbName = "credit-card-recorder",
    cardCollection;

mongoose.connect(dbConnectionStr, { useNewUrlParser: true }, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("Connected to db!");
});

//render ejs
//getting current credit cards
app.get("/", async (req, res) => {
    try {
        CreditCard.find({}, (err, cards) => {
            res.render("index.ejs", { creditCard: cards });
        });
    } catch (err) {
        if (err) return res.status(500).send(err);
    }
});

//post
//create a new document
app.post("/", async (req, res) => {
    const creditCard = new CreditCard({
        cardIssuer: req.body.cardIssuer,
        cardName: req.body.cardName,
        points: req.body.points,
    });
    try {
        await creditCard.save();
        console.log(creditCard);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        // console.log(creditCard);
        res.redirect("/");
    }
});

//edit or update method
app.route("/edit/:id").get((req, res) => {
    const id = req.params.id;
    console.log(req.params.id);
    CreditCard.find({}, (err, cards) => {
        res.render("edit.ejs", {
            creditCard: cards,
            idCard: id,
        });
    }).post((req, res) => {
        const id = req.params.id;
        CreditCard.findByIdAndUpdate(
            id,
            {
                cardIssuer: req.body.cardIssuer,
                cardName: req.body.cardName,
                points: req.body.points,
            },
            (err) => {
                if (err) return res.status(500).send(err);
                res.redirect("/");
            }
        );
    });
});

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});

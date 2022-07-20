const express = require("express");
const app = express();
const PORT = 8001;
const MongoClient = require("mongodb").MongoClient;
const mongoose = require("mongoose");
require("dotenv").config();

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

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`);
});

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then((client) => {
//         console.log(`Connected to the ${dbName} database`);
//         db = client.db(dbName);
//         cardCollection = db.collection("cards");
//     })
//     .catch((error) => console.error(error));

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// app.get("/", (request, response) => {
//     cardCollection
//         .find()
//         .sort({ points: -1 })
//         .toArray()
//         .then((data) => {
//             response.render("index.ejs", { info: data });
//         })
//         .catch((error) => console.error(error));
// });

// app.post("/creditcards", (request, response) => {
//     cardCollection
//         .insertOne({
//             cardIssuer: request.body.cardIssuer,
//             cardName: request.body.cardName,
//             points: 0,
//         })
//         .then((result) => {
//             console.log("Credit Card Added");
//             response.redirect("/");
//         })
//         .catch((error) => console.error(error));
// });

// app.post("/creditcards", (req, res) => {
//     console.log("swipe me bro");
// });

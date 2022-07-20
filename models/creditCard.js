//This is the schema file
// we will use this file as an export to build documents on the fly

// ?    Card issuer
// ?    Card Name
// ?    Points

const mongoose = require("mongoose");
const creditCardSchema = new mongoose.Schema({
    cardIssuer: {
        type: String,
        required: true,
    },
    cardName: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
});

//module exports with parameters of a name, the schema name, and the specific mongodb collection
module.exports = mongoose.model(
    "creditCard",
    creditCardSchema,
    "cardsCollection"
);

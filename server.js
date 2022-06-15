const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// let db,
//     dbConnectionStr = 'mongodb+srv://demo:demo@cluster0
// .2 wapm.mongodb.net / rap ? retryWrites = true & w = majority ',
// dbName = 'rap'

// MongoClient.connect(dbConnectionStr, {
//         useUnifiedTopology: true
//     })
//     .then(client => {
//         console.log(`Connected to ${dbName} Database`)
//         db = client.db(dbName)
//     })
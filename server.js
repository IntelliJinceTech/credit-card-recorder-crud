const express = require('express')
const app = express();
const PORT = 8001

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/creditcards', (req,res) => {
    console.log('swipe me bro')
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

app.listen(PORT, () => {
    console.log(`We are live on port ${PORT}`)
})
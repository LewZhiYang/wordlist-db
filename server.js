const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000

let db, 
    dbConnectionStr = 'mongodb+srv://123:123@cluster0.oy732.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName ='wordList'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology:true})
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    console.log("rendered")
    res.send('Hello world')
  })

app.listen(process.env.PORT || PORT)
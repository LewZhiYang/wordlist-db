const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const ejs = require('ejs')
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
    data = db.collection('wordList').find().toArray()
    .then(data => {
        res.render('index.ejs', {data: data})
        console.log(data)
        console.log("rendered")
    })
    .catch(console.error())
  })

app.post('/addWord', (req, res) => {
    console.log(req)
    console.log(req.body)
    db.collection('wordList').insertOne(req.body)
    .then(result => {
        console.log('word added')
        res.redirect('/')
    })
})


app.listen(process.env.PORT || PORT)
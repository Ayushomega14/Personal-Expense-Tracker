var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))

mongoose.connect('mongodb://localhost:27017/expenseDB')
var db=mongoose.connection
db.on('error',()=>console.log("Error in Connecting to Database"))
db.once('open',()=>console.log("Connected to Database"))

app.post('/add', (req, res) => {
    var expenseCategory = req.query.expenseCategory
    var expenseTitle = req.query.expenseTitle
    var expenseDate = req.query.expenseDate
    var expenseCost = req.query.expenseCost

    var data = {
       "Category": expenseCategory,
       "Amount": expenseCost,
       "Info": expenseTitle,
       "Date": expenseDate  
    };
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record inserted Successfully")
    })
})

app.get("/",(req, res) => {
    res.set({
        "Allow-access-Allow-Origin": "*"
    })
    return res.redirect('index.html')
}).listen(5000)

console.log("Listening on port 5000")
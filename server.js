let express = require('express');
let bodyParser = require('body-parser');
let db = [];
let app = express();

app.use(bodyParser.urlencoded({
    extend: false
}))

app.use(bodyParser.json())

app.use(express.static('images'));
app.use(express.static('css'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req,res){
    res.render('index.html');
})

app.get('/add', function(req,res){
    res.sendFile(__dirname + '/views/add.html'); //make sure theres 2 underscores __dirname not 1 _dirname
})

app.post('/data', function(req,res){
    console.log(req.body.taskName);
    console.log(req.body.taskDueDate);
    console.log(req.body.taskDescription);
    db.push({
        taskName: req.body.taskName,
        taskDueDate: req.body.taskDueDate,
        taskDescription: req.body.taskDescription,
    })
    res.render('index.html');
});

app.get('/delete/:taskindex', function(req,res){
    db.splice(req.params.taskindex,1);
    res.redirect('/list');
})

app.get('/list',function(req,res){
    res.render('list.html', {db: db});
})

app.listen(8080);
console.log("Server is running");
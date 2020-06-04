// npm
const express = require("express");
const pug = require("pug");
const bodyParser = require("body-parser");

// app
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("views", "./views");
app.set("view engine", "pug");

app.get('/', (req, res) => {
  res.render('index.pug', {name: 'Vu'});
});

var tasks = [
  {id: 1, task: 'Go shopping'},
  {id: 2, task: 'Cooking'},
  {id: 2, task: 'Take a nap'},
  {id: 2, task: 'Go swimming'}
];

app.get('/todos', (req, res) => {
  var query = req.query.keyword;
  
  if (query !== undefined) {
    var filter = tasks.filter(item => {
      return item.task.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    
    res.render('todos', {todoList: filter});
  }
  
  res.render('todos', {todoList: tasks});
});

app.post('/todos', (req, res) => {  
  tasks.push(req.body);  
  res.redirect('/todos');
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

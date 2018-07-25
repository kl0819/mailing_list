// Note: can use faker package to generate "fake" users/email to add into database
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

// CONFIG
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
// EDIT accordingly 
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'join_us',
});


app.get('/', function(req, res) {
  // find count of users in database 
  var q = "SELECT COUNT(*) AS total FROM users";
  connection.query(q, function(err, results) {
    if (err) throw err; // better to redirect
    var total = results[0].total;
    // respond with the count in a views 
    res.render('home', {usercount: total});
  });
});

app.post('/register', function(req, res) {
  var person = {
    email : req.body.email
  };
  
  connection.query("INSERT INTO users SET ?", person, function(err, results) {
    if (err) throw err; // should redirect
    res.redirect("/");
  });
});

app.listen(8080, function() {
  console.log('App listening on port 8080');
});
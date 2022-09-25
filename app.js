var express=require('express');
var todoController=require('./controllers/to_do_controller');



var app =express();

// Setting up the view/template engine
app.set('view engine','ejs');

//Static files
app.use(express.static(__dirname));

// Listen to port

app.listen(3000);
console.log('You are listening to port 3000');
//console.log('Dir name : '+ __dirname);

// Firing controllers
todoController(app);

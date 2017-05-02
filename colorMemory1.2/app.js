const express = require('express');
const path = require('path');
const app = express();
let port = 5000;

let index = require('./routes/index');

app.listen(port);
console.log(`listening to port ${port}`);

// set the view engine and path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set static directory
app.use(express.static(__dirname + '/public'));

app.use('/', index);

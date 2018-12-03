var express = require('express');
var bodyParser = require('body-parser');
// connect to mongoose
var {moongose} = require('./db/mongoose');
var app = express();

app.use(bodyParser.json());


// includes template
app.use(express.static(__dirname + '/views'));

// include routes
var routes = require('./routes/route');
routes(app);

app.listen(4200, () => {
    console.log('started on port 4200');
})

module.exports = {app};
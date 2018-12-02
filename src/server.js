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

app.listen(3000, () => {
    console.log('started on port 3000');
})

module.exports = {app};
var mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = {
    mongoose
}
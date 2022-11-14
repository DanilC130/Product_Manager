const mongoose = require('mongoose');

// name of the database and how to connect
mongoose.connect("mongodb://localhost/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
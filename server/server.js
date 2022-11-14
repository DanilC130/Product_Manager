const express = require('express');
const cors = require('cors');
const app = express();

//Connects to database
require("./config/config.mongoose");

//Updates the middleware
app.use(express.json(), express.urlencoded({extended: true}));
//Cross-Origin Resource Sharing(cors) lets us send messages from a client to a server
app.use(cors());

//Connects our router
const router = require('./routes/product.routes'); 
router(app);

// listens to ongoing port
app.listen(8000, () => console.log("running on port 8000"));

//NOTE: package.json and server.js must be parallel/in the same place. Run ls in the terminal, and the two files must be seen in order to function properly
// importing important lib
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session); // Implementing connect mongo, this is how the session would be stored





// init application
const app = express();


// implementing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// declaration of application variables
const PORT = process.env.PORT || 5000;


// connecting to the mongo db 
const connection = mongoose.createConnection(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: "sessions"
});

app.use(session({
    secret: "this is secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))


app.get("/", (req, res, next) => {
    res.send("<h1>Hello World (Session)</h1>");
});

app.listen(PORT); 
require('dotenv').config();
const express = require('express');
const path = require('node:path');
const session = require('express-session');
const passport = require('./config/passport');

const loginRouter = require('./routes/loginRouter');
const homeRouter = require('./routes/homeRouter');
const profileRouter = require('./routes/profileRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();
const PORT = 3000;

const assetsPath = path.join(__dirname, "/public");
app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false}));
app.use(passport.session());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/", loginRouter);
app.use("/home", homeRouter);
app.use("/profile", profileRouter);
app.use("/users", usersRouter);


app.listen(PORT, (err) => {
    if (err){
        throw err;
    }
    console.log(`App listening on port ${PORT}.`);
});
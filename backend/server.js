const express = require("express");
const app = express();
const cors = require("cors");
const mongo = require("./mongo");
const PORT = process.env.PORT || 5000;
const router = require("./routes/router");
const AuthRouter = require("./routes/AuthRouter");
const passport = require("passport");

const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

app.use(
    cors({
        origin: ["http://localhost:3000", "https://blue-cliff-09a573400.azurestaticapps.net"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());

app.use(
    session({
        secret: process.env.COOKIE_KEYS,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 1000 }, // 1 min
    })
);

app.use(cookieParser(process.env.COOKIE_KEYS));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// require("./config/passport-google-setup"); // run setup code
require("./config/passport-local-setup")(passport); // run setup code

app.use("/", router);
app.use("/auth", AuthRouter);

mongo.connect();

app.listen(PORT || 5000, () => {
    console.log(`Server is up on port: ${PORT}`);
});

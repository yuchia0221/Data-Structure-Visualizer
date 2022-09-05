const router = require("express").Router();
const passport = require("passport");
const successLoginUrl = "http://localhost:3000/pro";
const failureLoginUrl = "http://localhost:3000/sign-in";

// google authenticate
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

// auth redirect
router.get(
    "/google/redirect",
    passport.authenticate("google", {
        successRedirect: successLoginUrl,
        failureRedirect: failureLoginUrl,
        failureFlash: "Invalid google account, please choose another way to sign in : (",
    })
);

module.exports = router;

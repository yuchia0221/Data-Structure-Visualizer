const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLINET_ID,
            clientSecret: process.env.GOOGLE_CLINET_SECRET,
            callbackURL: "/auth/google/redirect",
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleID: profile.id }).then((currentUser) => {
                if (currentUser) {
                    // user already exists
                    console.log(`User exists: ${currentUser}`);
                    done(null, currentUser);
                } else {
                    // Create a new one
                    new User({
                        name: profile.displayName,
                        googleID: profile.id,
                    })
                        .save()
                        .then((newUser) => {
                            console.log(`new user created: ${newUser}`);
                            done(null, newUser);
                        });
                }
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((user, done) => {
    User.findById(user.id).then((user) => {
        done(null, user);
    });
});

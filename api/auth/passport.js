const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../users/users-model");

passport.serializeUser((user, done) => {
    done(null, user.id); // store user ID in session
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await User.findById(id);
        done(null, result.rows[0]);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const username = profile.displayName;

                let result = await User.findByEmail(email);
                let user;

                if (result.rows.length === 0) {
                    const newUser = await User.addUser(username, email, null); // You can save null or empty password
                    user = newUser.rows[0];
                } else {
                    user = result.rows[0];
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

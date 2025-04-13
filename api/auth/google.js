const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../users/users-model"); // your user DB access file

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback", // adjust as needed
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                const username = profile.displayName;

                // Check if user already exists
                let result = await User.findByEmail(email);
                let user;

                if (result.rows.length === 0) {
                    // Add new user (no password needed for Google OAuth)
                    const newUser = await User.addUser(username, email, null);
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

const User = require('../models/User');
const { SECRET } = require('../config');
const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET,
};

module.exports = (passport) =>
    passport.use(
        new Strategy(
            opts,
            async (payload, done) =>
                await User.findById(payload.user_id)
                    .then((user) =>
                        user ? done(null, user) : done(null, false)
                    )
                    .catch((err) => done(null, false))
        )
    );

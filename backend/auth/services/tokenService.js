const getAuthConfig = require("../config/authConfig");

const createTokenService = (jwt) => {
    const signToken = (userId) => {
        const config = getAuthConfig();

        return jwt.sign(
            {},
            config.secret,
            {
                subject: userId.toString(),
                expiresIn: config.expiresIn,
                issuer: config.issuer,
                audience: config.audience
            }
        );
    };

    const verifyToken = (token) => {
        const config = getAuthConfig();

        return jwt.verify(
            token,
            config.secret,
            {
                issuer: config.issuer,
                audience: config.audience
            }
        );
    };

    return {
        signToken,
        verifyToken
    };
};

module.exports = createTokenService;

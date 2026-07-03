const getAuthConfig = () => {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET must contain at least 32 characters");
    }

    return {
        secret,
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        issuer: "portfolio-builder-api",
        audience: "portfolio-builder-client"
    };
};

module.exports = getAuthConfig;

const createAuthMiddleware = ({ User, verifyToken }) => {
    return async (req, res, next) => {
        try {
            const authorization = req.get("authorization") || "";
            const [scheme, token] = authorization.split(" ");

            if (scheme !== "Bearer" || !token) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication token is required"
                });
            }

            const payload = verifyToken(token);
            const user = await User.findById(payload.sub);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication token is invalid"
                });
            }

            req.user = user;
            return next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is invalid or expired"
            });
        }
    };
};

module.exports = createAuthMiddleware;

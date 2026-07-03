const createUserModel = require("../models/User");
const createTokenService = require("../services/tokenService");
const createAuthController = require("../controllers/authController");
const createAuthMiddleware = require("../middleware/authMiddleware");

const createAuthRoutes = ({ express, mongoose, bcrypt, jwt }) => {
    const router = express.Router();
    const User = createUserModel(mongoose);
    const { signToken, verifyToken } = createTokenService(jwt);
    const {
        register,
        login,
        getCurrentUser
    } = createAuthController({
        User,
        bcrypt,
        signToken
    });
    const authenticate = createAuthMiddleware({
        User,
        verifyToken
    });

    router.post("/register", register);
    router.post("/login", login);
    router.get("/me", authenticate, getCurrentUser);

    return router;
};

module.exports = createAuthRoutes;

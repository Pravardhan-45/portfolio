const createUserModel = require("../../auth/models/User");
const createTokenService = require("../../auth/services/tokenService");
const createAuthMiddleware = require("../../auth/middleware/authMiddleware");
const createPortfolioModel = require("../models/Portfolio");
const createPortfolioController = require("../controllers/portfolioController");

const createPortfolioRoutes = ({ express, mongoose, jwt }) => {
    const router = express.Router();

    const User = createUserModel(mongoose);
    const Portfolio = createPortfolioModel(mongoose);
    const { verifyToken } = createTokenService(jwt);
    const authenticate = createAuthMiddleware({ User, verifyToken });

    const {
        savePortfolio,
        getPortfolio,
        updatePortfolio,
        deletePortfolio
    } = createPortfolioController({ Portfolio });

    // All portfolio routes are scoped to the authenticated user.
    router.post("/", authenticate, savePortfolio);
    router.get("/", authenticate, getPortfolio);
    router.put("/", authenticate, updatePortfolio);
    router.delete("/", authenticate, deletePortfolio);

    return router;
};

module.exports = createPortfolioRoutes;

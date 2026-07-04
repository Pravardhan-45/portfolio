const {
    validatePortfolio,
    validatePortfolioUpdate
} = require("../utils/validation");

const createPortfolioController = ({ Portfolio }) => {
    const formatPortfolio = (portfolio) => {
        return {
            id: portfolio._id.toString(),
            user: portfolio.user.toString(),
            personalInfo: portfolio.personalInfo,
            aboutMe: portfolio.aboutMe,
            education: portfolio.education,
            skills: portfolio.skills,
            projects: portfolio.projects,
            experience: portfolio.experience,
            certifications: portfolio.certifications,
            achievements: portfolio.achievements,
            socialLinks: portfolio.socialLinks,
            createdAt: portfolio.createdAt,
            updatedAt: portfolio.updatedAt
        };
    };

    // POST /api/portfolio
    // Create the current user's portfolio, or overwrite it if one exists.
    const savePortfolio = async (req, res) => {
        try {
            const validation = validatePortfolio(req.body);

            if (validation.error) {
                return res.status(400).json({
                    success: false,
                    message: validation.error
                });
            }

            const portfolio = await Portfolio.findOneAndUpdate(
                { user: req.user._id },
                {
                    $set: validation.value,
                    $setOnInsert: { user: req.user._id }
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                    setDefaultsOnInsert: true
                }
            );

            return res.status(200).json({
                success: true,
                message: "Portfolio saved successfully",
                portfolio: formatPortfolio(portfolio)
            });
        } catch (error) {
            if (error && error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "A portfolio for this user already exists"
                });
            }

            return res.status(500).json({
                success: false,
                message: "Unable to save portfolio"
            });
        }
    };

    // GET /api/portfolio
    // Return the current user's saved portfolio.
    const getPortfolio = async (req, res) => {
        try {
            const portfolio = await Portfolio.findOne({ user: req.user._id });

            if (!portfolio) {
                return res.status(404).json({
                    success: false,
                    message: "No portfolio found for this user"
                });
            }

            return res.status(200).json({
                success: true,
                portfolio: formatPortfolio(portfolio)
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Unable to fetch portfolio"
            });
        }
    };

    // PUT /api/portfolio
    // Merge the provided sections into the existing portfolio.
    const updatePortfolio = async (req, res) => {
        try {
            const validation = validatePortfolioUpdate(req.body);

            if (validation.error) {
                return res.status(400).json({
                    success: false,
                    message: validation.error
                });
            }

            const portfolio = await Portfolio.findOneAndUpdate(
                { user: req.user._id },
                { $set: validation.value },
                { new: true, runValidators: true }
            );

            if (!portfolio) {
                return res.status(404).json({
                    success: false,
                    message: "No portfolio found for this user"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Portfolio updated successfully",
                portfolio: formatPortfolio(portfolio)
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Unable to update portfolio"
            });
        }
    };

    // DELETE /api/portfolio
    // Remove the current user's portfolio.
    const deletePortfolio = async (req, res) => {
        try {
            const portfolio = await Portfolio.findOneAndDelete({
                user: req.user._id
            });

            if (!portfolio) {
                return res.status(404).json({
                    success: false,
                    message: "No portfolio found for this user"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Portfolio deleted successfully"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Unable to delete portfolio"
            });
        }
    };

    return {
        savePortfolio,
        getPortfolio,
        updatePortfolio,
        deletePortfolio
    };
};

module.exports = createPortfolioController;

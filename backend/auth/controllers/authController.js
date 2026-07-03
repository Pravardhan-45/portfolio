const {
    validateRegistration,
    validateLogin
} = require("../utils/validation");

const createAuthController = ({ User, bcrypt, signToken }) => {
    const formatUser = (user) => {
        return {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt
        };
    };

    const register = async (req, res) => {
        try {
            const validation = validateRegistration(req.body);

            if (validation.error) {
                return res.status(400).json({
                    success: false,
                    message: validation.error
                });
            }

            const { fullName, email, password } = validation.value;
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    message: "An account with this email already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await User.create({
                fullName,
                email,
                password: hashedPassword
            });
            const token = signToken(user._id);

            return res.status(201).json({
                success: true,
                message: "Account created successfully",
                token,
                user: formatUser(user)
            });
        } catch (error) {
            if (error && error.code === 11000) {
                return res.status(409).json({
                    success: false,
                    message: "An account with this email already exists"
                });
            }

            return res.status(500).json({
                success: false,
                message: "Unable to create account"
            });
        }
    };

    const login = async (req, res) => {
        try {
            const validation = validateLogin(req.body);

            if (validation.error) {
                return res.status(400).json({
                    success: false,
                    message: validation.error
                });
            }

            const { email, password } = validation.value;
            const user = await User.findOne({ email }).select("+password");

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            const token = signToken(user._id);

            return res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                user: formatUser(user)
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Unable to log in"
            });
        }
    };

    const getCurrentUser = async (req, res) => {
        return res.status(200).json({
            success: true,
            user: formatUser(req.user)
        });
    };

    return {
        register,
        login,
        getCurrentUser
    };
};

module.exports = createAuthController;

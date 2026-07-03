const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const readString = (value) => {
    return typeof value === "string" ? value.trim() : "";
};

const validateRegistration = (body = {}) => {
    const fullName = readString(body.fullName || body.name);
    const email = readString(body.email).toLowerCase();
    const password = typeof body.password === "string" ? body.password : "";
    const confirmPassword = typeof body.confirmPassword === "string"
        ? body.confirmPassword
        : null;

    if (fullName.length < 2 || fullName.length > 100) {
        return { error: "Full name must be between 2 and 100 characters" };
    }

    if (!emailPattern.test(email) || email.length > 254) {
        return { error: "A valid email address is required" };
    }

    if (password.length < 8 || password.length > 128) {
        return { error: "Password must be between 8 and 128 characters" };
    }

    if (confirmPassword !== null && password !== confirmPassword) {
        return { error: "Passwords do not match" };
    }

    return {
        value: {
            fullName,
            email,
            password
        }
    };
};

const validateLogin = (body = {}) => {
    const email = readString(body.email).toLowerCase();
    const password = typeof body.password === "string" ? body.password : "";

    if (!emailPattern.test(email) || !password) {
        return { error: "Email and password are required" };
    }

    return {
        value: {
            email,
            password
        }
    };
};

module.exports = {
    validateRegistration,
    validateLogin
};

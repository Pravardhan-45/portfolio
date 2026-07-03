const test = require("node:test");
const assert = require("node:assert/strict");
const createAuthController = require("../controllers/authController");
const createAuthMiddleware = require("../middleware/authMiddleware");

const createResponse = () => {
    return {
        statusCode: 200,
        body: null,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(body) {
            this.body = body;
            return this;
        }
    };
};

test("register creates a user and returns a token", async () => {
    const createdAt = new Date();
    const User = {
        findOne: async () => null,
        create: async (data) => ({
            _id: {
                toString: () => "user-1"
            },
            fullName: data.fullName,
            email: data.email,
            createdAt
        })
    };
    const bcrypt = {
        hash: async (password, rounds) => {
            assert.equal(password, "password123");
            assert.equal(rounds, 12);
            return "hashed-password";
        }
    };
    const controller = createAuthController({
        User,
        bcrypt,
        signToken: (userId) => `token-${userId.toString()}`
    });
    const req = {
        body: {
            fullName: "Test User",
            email: "TEST@example.com",
            password: "password123",
            confirmPassword: "password123"
        }
    };
    const res = createResponse();

    await controller.register(req, res);

    assert.equal(res.statusCode, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.token, "token-user-1");
    assert.equal(res.body.user.email, "test@example.com");
});

test("login rejects an incorrect password", async () => {
    const user = {
        _id: {
            toString: () => "user-1"
        },
        fullName: "Test User",
        email: "test@example.com",
        password: "hashed-password",
        createdAt: new Date()
    };
    const User = {
        findOne: () => ({
            select: async () => user
        })
    };
    const bcrypt = {
        compare: async () => false
    };
    const controller = createAuthController({
        User,
        bcrypt,
        signToken: () => "token"
    });
    const req = {
        body: {
            email: "test@example.com",
            password: "wrong-password"
        }
    };
    const res = createResponse();

    await controller.login(req, res);

    assert.equal(res.statusCode, 401);
    assert.equal(res.body.success, false);
    assert.equal(res.body.message, "Invalid email or password");
});

test("authentication middleware attaches the token user", async () => {
    const user = {
        _id: "user-1"
    };
    const User = {
        findById: async (id) => {
            assert.equal(id, "user-1");
            return user;
        }
    };
    const authenticate = createAuthMiddleware({
        User,
        verifyToken: (token) => {
            assert.equal(token, "valid-token");
            return {
                sub: "user-1"
            };
        }
    });
    const req = {
        get: () => "Bearer valid-token"
    };
    const res = createResponse();
    let nextCalled = false;

    await authenticate(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
    assert.equal(req.user, user);
});

test("authentication middleware rejects a missing token", async () => {
    const authenticate = createAuthMiddleware({
        User: {},
        verifyToken: () => ({})
    });
    const req = {
        get: () => ""
    };
    const res = createResponse();

    await authenticate(req, res, () => {});

    assert.equal(res.statusCode, 401);
    assert.equal(res.body.success, false);
});

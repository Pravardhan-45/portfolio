const createUserModel = (mongoose) => {
    if (mongoose.models.User) {
        return mongoose.models.User;
    }

    const userSchema = new mongoose.Schema(
        {
            fullName: {
                type: String,
                required: true,
                trim: true,
                minlength: 2,
                maxlength: 100
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true,
                maxlength: 254
            },
            password: {
                type: String,
                required: true,
                select: false
            }
        },
        {
            timestamps: true
        }
    );

    return mongoose.model("User", userSchema);
};

module.exports = createUserModel;

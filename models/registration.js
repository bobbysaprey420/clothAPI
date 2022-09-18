const mongoose = require("mongoose");
const { RoleSchema } = require("./role")

const RegistrationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: RoleSchema,
        required: true,
    }
});

const RegistrationModel = mongoose.model("registration", RegistrationSchema, "registration");

module.exports = RegistrationModel;
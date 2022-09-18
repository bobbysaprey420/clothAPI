const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const RoleSchema = new mongoose.Schema({
    name:String
});

const RoleModel = mongoose.model("role", RoleSchema, "role");

module.exports = {RoleModel, RoleSchema};

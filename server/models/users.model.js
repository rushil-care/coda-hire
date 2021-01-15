const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { conn } = require("../config/connection.mongo");
mongoose.pluralize(null);

const modelA = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: false,
        },
    },
    { versionKey: false }
);

var UserSchema = conn.model("users", modelA);

module.exports = {
    UserSchema,
};

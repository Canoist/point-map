const { Schema, model } = require("mongoose");

const userSchema = new Schema([
    {
        firstname: { type: String },
        lastname: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String },
        points: [{ type: Schema.Types.ObjectId, ref: "Points" }],
    },
    // {
    //     timestamps: true,
    // },
]);

module.exports = model("User", userSchema);

const { Schema, model } = require("mongoose");

const pointsSchema = new Schema([
    {
        type: { type: String },
        properties: {
            _id: String,
            name: String,
            description: String,
            date: Number,
            court: String,
            hoop:[String]
        },
        geometry: {
            type: { type: String },
            coordinates: [Number],
        },
    },
]);

module.exports = model("Points", pointsSchema);

const { Schema, model } = require("mongoose");

const geoSchema = new Schema({
    type: String,
    coordinates: [{ type: Number }],
});

const pointsSchema = new Schema([
    {
        type: { type: String },
        properties: {
            _id: String,
            name: String,
            description: String,
            date: Date,
        },
        geometry: {
            type: { type: String },
            coordinates: [Number],
        },
    },
]);

module.exports = model("Points", pointsSchema);

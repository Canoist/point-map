const Points = require("../models/Points");
const pointsMock = require("../mock/points.json");

module.exports = async () => {
    const points = await Points.find();
    console.log("POINTS ", points);

    if (points.length !== pointsMock.length) {
        await createInitEntity(Points, pointsMock);
    }
};

async function createInitEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                console.log(item);
                const newItem = new Model(item);
                console.log(newItem);
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    ).then((res) => {
        console.log(res);
    });
}

const User = require("../models/User");
const userMock = require("../mock/users.json");

module.exports = async () => {
    const user = await User.find();
    console.log("USER ", user);

    if (user.length !== userMock.length) {
        await createInitEntity(User, userMock);
    }
};

async function createInitEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
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

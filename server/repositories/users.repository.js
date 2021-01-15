const { UserSchema } = require("./../models/users.model");

const getUsers = async (data) => {
    const response = await UserSchema.find({});
    console.log(response);

    return response;
};

module.exports = {
    getUsers,
};

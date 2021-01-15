const UserRepository = require("../repositories/users.repository");

const getUsers = async (params) => {
    const response = await UserRepository.getUsers(params);
    if (response) {
        return { status: 1, message: "Users fetched Successfully!!", data: response };
    } else {
        return { status: 0, message: "Users could not be fetched!!" };
    }
};

module.exports = {
    getUsers,
};

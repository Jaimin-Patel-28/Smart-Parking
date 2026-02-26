const bcrypt = require("bcryptjs");

exports.hashData = async (data) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
};

exports.compareData = async (plain, hashed) => {
    return await bcrypt.compare(plain, hashed);
}
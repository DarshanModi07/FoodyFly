const mongoose = require("mongoose")
const CONN_STRING = process.env.CONN_STRING

const ConnectDB = async () => {
    await mongoose.connect(CONN_STRING)
}

module.exports = ConnectDB

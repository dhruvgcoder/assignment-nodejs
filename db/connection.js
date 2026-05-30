const mysql = require("mysql2/promise")
require("dotenv").config();

async function dbConnection() {

    try {
        const connection = await mysql.createConnection(process.env.DB_URL)
        console.log("MySQL connected succesfully")
        return connection

    } catch (err) {
        console.log({
            msg: "Error while connecting to MySQL server" ,
            err : err.message
        })
        console.log("Server Stopped")

        process.exit(1)
    }

}

module.exports = dbConnection
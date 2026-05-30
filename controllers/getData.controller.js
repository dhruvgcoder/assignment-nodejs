const { Router } = require("express")
const data = Router()
const dbConnection = require("../db/connection")

data.post("/:username", async (req, res) => {

    const username = req.params.username
    try {
        const response = await fetch(`https://api.github.com/users/${username}`)
        const user = await response.json()
        const connection = await dbConnection()
        await connection.query(
            `INSERT INTO users (id ,username, full_name, location, total_repos, followers)
        VALUES( ? ,? , ? , ? , ? , ? )` ,
            [
                user.id,
                user.login,
                user.name,
                user.location,
                user.public_repos,
                user.followers ]
        )
        res.status(200).json({
            msg: "data added succesfully",
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: "Internal Server Error",
        })
    }
})

data.get("/all", async (req, res) => {
    const connection = await dbConnection()

    const [info] = await connection.query(`
        SELECT * FROM users`)
    res.status(200).json({
        data: [info]
    })
})

data.get("/:username", async (req, res) => {
    const username = req.params.username
    const connection = await dbConnection()

    const [info] = await connection.query(`
        SELECT * FROM users WHERE username = ?`,[username])
    res.status(200).json({
        data: info
    })
})
module.exports = data

const { Router } = require("express")
const repos = Router()
const dbConnection = require("../db/connection")


repos.post("/:username/repos", async (req, res) => {

    const username = req.params.username
    try {
        const repository = await fetch(`https://api.github.com/users/${username}/repos`)
        const repos = await repository.json()
        const reposData = repos.map(repo => [
            repo.id,
            repo.owner.id,
            repo.name,
            repo.description,
            repo.html_url,
            repo.language,
            new Date(repo.created_at),
            repo.stargazers_count,
            repo.size
        ]
        )
        const connection = await dbConnection()

        await connection.query(`
        INSERT INTO repos(id , owner_id , repo_name , description, url , language , created_at ,stars ,size_in_kb )
        VALUES ?` , [reposData])

        const repoCount = repos.length
        res.json({
            msg : "repos added succesfully" ,
            repoCount: repoCount,
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: "Internal Server Error",
        })
    }
})

repos.get("/:username/repos", async (req, res) => {
    const username = req.params.username
    try {
        const connection = await dbConnection()
        const [repos] = await connection.query(`
        SELECT * FROM repos WHERE owner_id = (SELECT id FROM users WHERE username = ?)` , [username])

        res.status(200).json({
            msg: repos
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            msg: "Internal Server Error",
        })
    }
})

module.exports = repos
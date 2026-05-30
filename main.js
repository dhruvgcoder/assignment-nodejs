const dotenv = require("dotenv")
dotenv.config()
const express = require("express")

const dbConnection  = require("./db/connection")
const data = require("./controllers/getData.controller")
const repos = require("./controllers/getRepos.controller")

const app = express()
app.use(express.json())


app.use("/user", data)
app.use("/user", repos)

async function startServer(){
    await dbConnection()
    app.listen(3001,()=>{
        console.log("Server started running on PORT 3001")
    })
}

startServer()


const express = require("express")
const dotenv = require("dotenv")

const dbConnection  = require("./db/connection")
const data = require("./controllers/getData.controller")
const repos = require("./controllers/getRepos.controller")

const app = express()
app.use(express.json())
dotenv.config()


app.use("/user", data)
app.use("/user", repos)

async function startServer(){
    await dbConnection()
    app.listen(3001,()=>{
        console.log("Server started running on PORT 3001")
    })
}

startServer()


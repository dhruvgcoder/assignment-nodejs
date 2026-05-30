const dotenv = require("dotenv")
dotenv.config()
const express = require("express")

const dbConnection  = require("./db/connection")
const data = require("./controllers/getData.controller")
const repos = require("./controllers/getRepos.controller")

const app = express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        status : "ok",
        msg : "API is running"
    })
})
app.use("/user", data)
app.use("/user", repos)

const PORT = process.env.PORT || 3001

async function startServer(){
    await dbConnection()
    app.listen(PORT,()=>{
        console.log(`Server started running on ${PORT}`)
    })
}

startServer()


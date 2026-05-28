const express = require("express")
const mysql = require("mysql2")

const app = express()

app.use(express.json())
dotenv.config()


app.get("/data/:username", async (req, res) => {
    const username = req.params.username
    
    async function getData() {
        const data = await fetch(`https://api.github.com/users/${username}`)
        return data.json()
    }
    const data = await getData()
    res.json({
        data: data
    })
})


const connection = mysql.createConnection(process.env.DB_URL)

connection.connect((err)=>{
    if(err){
        console.log({
            msg : "Error while connecting to MySQL",
            err : err
        })
        return
    }
    console.log("Connected to MySQL successfully")

    app.listen(3001, () => {
        console.log("Server is running on PORT 3001")
    })
})

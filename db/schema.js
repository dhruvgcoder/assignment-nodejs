const dbConnection = require("./connection")

async function createTables(){
    const connection = await dbConnection()
try {
    await connection.query(`
        CREATE TABLE IF NOT EXISTS users(
        id INT PRIMARY KEY  ,
        username VARCHAR(100) ,
        full_name VARCHAR(100) ,
        location VARCHAR(100) ,
        total_repos INT ,
        followers INT )
        `)

    await connection.query(`
        CREATE TABLE IF NOT EXISTS repos(
        id INT PRIMARY KEY ,
        owner_id INT ,
        repo_name VARCHAR(200),
        description VARCHAR(500) ,
        url VARCHAR(500),
        language VARCHAR(100) ,
        created_at TIMESTAMP,
        stars INT ,
        size_in_kb INT ,

        FOREIGN KEY (owner_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE )
        `)

    console.log("Tables checked/created")
    }
    finally {
        await connection.end()
    }
}
createTables()
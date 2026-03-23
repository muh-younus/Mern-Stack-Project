const server = require('./src/app')
const Database = require('./src/config/db')

Database()



const Port = process.env.Port
server.listen(Port || 3000, ()=>{
    console.log("server.running on",Port)
})
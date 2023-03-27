// import module
import express from 'express'
import * as socketio from 'socket.io'
import http from 'http'
// define variabel
const port = 3050
const app = express()
const httpServer = http.createServer(app)
const server = new socketio.Server(httpServer, {
    cors: {
        origin: "*"
    }
})
let resendData
let data = []
let number = 0
// on connected with client
server.on("connection", (socket) => {    
    console.log(`Connection established at Port ${port}`)
    if(resendData) {
        clearInterval(resendData)
    }
    setInterval(() => {
        data.push(Math.random() * 100)
        // const data = new Date()
        socket.emit("message", data)
    },4000)
})
// build server in port 
httpServer.listen(port)
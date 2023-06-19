
const app = require('express')()
const http = require('http').Server(app)

const io = require('socket.io')(http)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html')
})

io.on('connection', (socket) => {
    console.log('a client connection')

    socket.on('disconnect',()=>{
        console.log('a client disconnected')
    })

    socket.on('rev-msg',(msg)=>{
        console.log(msg)
        io.emit('send-msg-to-client', msg)
    })
})

http.listen(9000, () => {
    console.log('listening on port 9000')
})
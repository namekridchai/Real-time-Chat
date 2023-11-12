const express = require("express");
const http = require('http');
const cors = require('cors')

const app = express();
const server = http.createServer(app);
app.use(cors())
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
});
const port = 3000;
const port2 =3001 

// svListening = app.listen(port, () => {
//   console.log(`Server running at <http://localhost>:${port}/`);
// });
server.listen(port2, () => {
  console.log(`Server running at <http://localhost>:${port2}/`);
});


  // รอการ connect จาก client
  io.on('connection', client => {
      console.log('user connected')
    
      // เมื่อ Client ตัดการเชื่อมต่อ
      client.on('disconnect', () => {
          console.log('user disconnected')
      })
      // ส่งข้อมูลไปยัง Client ทุกตัวที่เขื่อมต่อแบบ Realtime
      client.on('sent-msg', function (message) {
          client.broadcast.emit('new-message', message)
          console.log(message)
          console.log('emit')
      })
  });


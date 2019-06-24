const app = require('express')();
const server = require('https').Server(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT ||3003;

server.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/javascript', (req, res) => {
  res.sendFile(__dirname + '/public/javascript.html');
});
app.get('/html', (req, res) => {
  res.sendFile(__dirname + '/public/html.html');
});

app.get('/css', (req, res) => {
  res.sendFile(__dirname + '/public/css.html');
});
app.get('/reactjs', (req, res) => {
  res.sendFile(__dirname + '/public/reactjs.html');
});
app.get('/jobs', (req, res) => {
  res.sendFile(__dirname + '/public/jobs.html');
});
// tech namespace
const tech = io.of('/tech');

tech.on('connection', (socket) => {
   socket.on('join',(data)=>{
     socket.join(data.room);
     tech.in(data.room).emit('message',`New user joined ${data.room} room!`)
   })
    console.log('user connected');
   socket.on('message',(data )=>{
     console.log(`message: ${data.msg}`);
     tech.in(data.room).emit('message',data.msg);
   });
   socket.on(`disconnect`, ()=>{
     console.log('user disconnected');
     tech.emit('message','user disconnected');
   })
})


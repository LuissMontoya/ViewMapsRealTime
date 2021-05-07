const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');



//Inicializaciones
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//settings
app.engine('ejs', engine);
app.set('view engine', 'ejs');
//console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));



//Rutas:
app.use(require('./routes/index'));


// sockets
require('./sockets')(io);



//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));


//Iniciar el servidor
server.listen(3000, () => {
    console.log('Server on Port 3000');
});
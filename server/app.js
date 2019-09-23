'use strict'

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io').listen(http)
const cors = require('cors');
const path = require('path');
const corsOptions = require('./cors.config').corsOptions;
const auth = require('./auth').authenticate;
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const socketRoom = require('./socket/room');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger/swagger.js')(path.dirname(require.main.filename))
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

io.on('connection', (socket) => {
    socket.join('mainRoom');
    socketRoom.setIo(io)
});

app.get('/swagger.json', (req, res) => {
    console.log('coucou');
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecs)
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(cors(corsOptions))
app.use(auth)
app.use(bodyParser())
app.use(routes)
console.log(swaggerSpecs);


app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof NotFound) {
        res.render('404.jade');
    } else {
        console.log(err);
    }
    next(err);
})


http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})



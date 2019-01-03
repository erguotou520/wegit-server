module.exports = function init (server) {
  const io = require('socket.io')(server);

  io.on('connection', (socket) => {
    socket.on('message', console.log)
    socket.on('disconnect', console.log)
  })
}

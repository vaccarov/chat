let _io;

function setIo(io) {
    if (!_io) {
      _io = io
    }
}

function send(event, msg) {
  _io.to('mainRoom').emit(event, msg)
}


module.exports = {
  setIo,
  send
};

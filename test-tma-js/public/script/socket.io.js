const Socket = (function () {
    let socket;
    const init = (io) => {
        socket = io.connect('http://localhost:3000');
    }

    const send = (key, data) => {
        return socket.emit(key, data)
    }

    const receive = (key, callback) => {
        return socket.on(key, callback)
    }

    return {
        init: init,
        send: send,
        receive: receive
    }
})()
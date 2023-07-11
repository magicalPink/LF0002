
let url = "ws://127.0.0.1:3001"
class Socket {
    constructor() {
        this.socket = ''
    }
    connect() {
        this.socket = new WebSocket(url);
        this.socket.onopen = function (evt) {
            console.log("Connection open ...");
        };
    }
    disconnect() {
        this.socket.close();
    }
    isConnect() {
        // if (!this.socket.connect) {
        //     return false
        // }
        // return this.socket.connect.readyState === 1
    }
    sendMsg(msg) {
        this.socket.send(msg);
    }
}
export default new Socket()


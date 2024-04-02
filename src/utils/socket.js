import { useUserStore } from "@/store/userStore.js";
export default class WebSocketManager {
  constructor(url = null, receiveMessageCallback = null) {
    this.socket = null // WebSocket 对象
    this.pingTimeout = null // 心跳计时器
    this.reconnectTimeout = 5000 // 重连间隔，单位：毫秒
    this.maxReconnectAttempts = 10 // 最大重连尝试次数
    this.reconnectAttempts = 0; // 当前重连尝试次数
    this.url = url // WebSocket 连接地址
    this.receiveMessageCallback = receiveMessageCallback // 接收消息回调函数
    this.lastCommunicationTime = null
  }
  /**
   * 初始化
   */
  async start() {
    if( this.url){
      // 连接WebSocket
      this.connectWebSocket()
    }else{
      console.error('WebSocketManager erros: 请传入连接地址和用户id')
    }
  }

  connectWebSocket() {
    // 通过id生成唯一值（服务端要求，具体根据自己业务去调整）
    // let id = `${this.id}-${Math.random()}`
    let token = localStorage.getItem("token")

    if(!token) {
      this.closeWebSocket()
      console.error("获取不到token,无法连接socket");
    }
    // 创建 WebSocket 对象
    this.socket = new WebSocket(this.url + "?token=" + token)

    // 处理连接打开事件
    this.socket.addEventListener('open', event => {
      // 心跳机制
      this.startHeartbeat()
    })

    // 处理接收到消息事件
    this.socket.addEventListener('message', event => {
      this.receiveMessage(event)
    })

    // 处理连接关闭事件
    this.socket.addEventListener('close', event => {
      console.log('socket closed');
      // 清除定时器
      clearTimeout(this.pingTimeout)
      clearTimeout(this.reconnectTimeout)

      // 尝试重连
      if (this.reconnectAttempts < this.maxReconnectAttempts && localStorage.getItem("token")) {
        this.reconnectAttempts++
        this.reconnectTimeout = setTimeout(() => {
          this.connectWebSocket()
        }, this.reconnectTimeout)
      } else {
        // 重置重连次数
        this.reconnectAttempts = 0
        console.error('WebSocketManager erros: Max reconnect attempts reached. Unable to reconnect.')
      }
    })

    // 处理 WebSocket 错误事件
    this.socket.addEventListener('error', event => {
      console.error('WebSocketManager error:', event)
    })
  }

  /**
   * 启动心跳机制
   */
  startHeartbeat() {
    if(!localStorage.getItem("token")) return;
    console.log('开始执行心跳');
    this.reconnectAttempts = 0
    clearTimeout(this.pingTimeout)
    this.pingTimeout = setInterval(() => {
      //最后操作时间超过20秒
      if(this.lastCommunicationTime + 20000 < new Date().getTime()) {
        useUserStore().getUserInfo()
      }
      // 发送心跳消息
      this.sendMessage({ type:'ping' })
    }, 10000) // 每隔 10 秒发送一次心跳
  }

  /**
   * 发送消息
   * @param {String} message 消息内容
   */
  sendMessage(message) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocketManager error: WebSocket connection is not open. Unable to send message.')
    }
  }

  /**
   * 接收到消息
   */
  receiveMessage(event) {
    // 根据业务自行处理
    // TODO: 设置最近响应时间
    this.lastCommunicationTime = new Date().getTime();
    this.receiveMessageCallback && this.receiveMessageCallback(event.data)
  }

  /**
   * 关闭连接
   */
  closeWebSocket() {
    this.socket?.close()
    // 清除定时器 重置重连次数
    clearTimeout(this.pingTimeout)
    clearTimeout(this.reconnectTimeout)
    this.reconnectAttempts = 0
  }

}

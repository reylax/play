import { useEffect, useState } from "react";


export default function useWebSocket(path) {
  const [reconnect, setReconnect] = useState({
    trigle: "fjdlk",
  })
  // const [interval, setInterval] = useState(1000)
  const [socket, setSocket] = useState({})


  useEffect(() => {
  // Create WebSocket connection.
    if (!path) return 
    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEB_SOCKET_SERVER}${path}`);
    setSocket(socket)
    // Connection opened
    socket.addEventListener('open', function () {
        console.log("websocket ready!")
    });
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server', event.data);
    });

    socket.addEventListener('error', function (event) {
      console.log(event)
    });
    socket.addEventListener('close', () => {
      setReconnect(pre => ({
        ...pre,
        target: "jfkdlsfjkl",
      }))
    })
  }, [reconnect, path])

  



  const send = message => {
    if (socket && socket.readyState == WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
    }
    // 0 (WebSocket.CONNECTING)
    // 正在链接中
    // 1 (WebSocket.OPEN)
    // 已经链接并且可以通讯
    // 2 (WebSocket.CLOSING)
    // 连接正在关闭
    // 3 (WebSocket.CLOSED)
    // 连接已关闭或者没有链接成功
  }
  return [socket, send]
}
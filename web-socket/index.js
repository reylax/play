const { WebSocketServer } = require('ws')

const wss = new WebSocketServer({ port: 3001 });

var matching_q = []


wss.on('connection', function connection(ws, req) {
  ws.clientId = parser(req.url)
  ws.on('message', function message(data) {
    data = JSON.parse(data)
    switch (data.type) {
      case "ptp":
        sendToOneUser(data)
        break
      case 'matching':
        // put user_id into redis
        console.log("joinged match!")
        matching_q.push(data.sender_id)
        tryfindSomeMatch()
        break
      case 'cancel_matching':
        // delete user_id in redis
        matching_q = matching_q.filter(user_id => user_id != data.sender_id)
        break
      default:
        ;
    }
    console.log(matching_q)
  });
});


const sendToOneUser = data => {
  console.log(data)
  var i  = 0
  const { target_id } = data
  wss.clients.forEach(ws => {
    i += 1
    console.log(i, ws.clientId, target_id)
    console.log(target_id === ws.clientId)
    if (ws.clientId === target_id) {
      console.log(`purpose:${data.purpose}`)
      console.log(`target_id:${target_id}`)
      console.log(`clientId:${ws.clientId}`)
      ws.send(JSON.stringify(data))
    }
  })
}

const tryfindSomeMatch = () => {
  while (matching_q.length >= 2) {
    let player_one = matching_q.pop()
    let player_two = matching_q.pop()
    console.log("find a match!", player_one, player_two)
    sendToOneUser({
      purpose: "match_success",
      target_id: player_one,
      sender_id: player_two,
    })

    sendToOneUser({
      purpose: "match_success",
      target_id: player_two,
      sender_id: player_one,
    })
  }
}

const parser = url => {
  return url.substring(url.lastIndexOf('=')+1)
}
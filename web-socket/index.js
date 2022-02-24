require('dotenv').config()

const { WebSocketServer } = require('ws')

const { pub, sub } = require("./reids.js")
const wss = new WebSocketServer({ port: process.env.PORT || 3000 });

var matching_q = []
const clients = new Map()
const ptp_channel_name = "sendToOneUser"


wss.on('connection', function connection(ws, req) {
  let clientId = parser(req.url)
  clients[clientId] = ws
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
  pub.publish(ptp_channel_name, JSON.stringify(data))
}

// receive message from redis

sub.subscribe(ptp_channel_name, (err, count) => {
  if (err) {
    console.error(err)
  } else {
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    )
  }
})

sub.on("message", (channel, message) => {
  console.log(`Received ${message} from ${channel}`)
  if (channel === ptp_channel_name) {
    const { target_id } = JSON.parse(message)
    if (clients[target_id] != undefined) {
      clients[target_id].send(message)
    }
  }
})

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
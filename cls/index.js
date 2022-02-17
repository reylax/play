require("dotenv").config()
const protobuf = require("protobufjs");
const { sentLogToTencentCloud } = require('./log');
const Redis = require('ioredis');
const redis = new Redis()
const root = protobuf.loadSync("cls.proto")
const LogGroupList = root.lookupType("LogGroupList")
const logSchema = [
  // order is important!
  "request",
  "remote_addr",
  "status",
  "body_bytes_sent",
  "upstream_response_time",
  "http_x_forwarded_for",
  "http_referer",
  "request_time",
  "reach_time",
  "request_id"
]



const consumers = ['a']
const stream = "access_logs"
const group = "node"

consumers.forEach(consumer => logEventLoop(consumer, 0))

async function logEventLoop(consumer, last_id) {
  try {
    await redis.xgroup("CREATE", stream, group, 0, "mkstream")
  } catch (error) {

  }

  console.log(`🤐 ${consumer}  start consumer message.`)
  // let start = Date.now()
  while (true) {
    try {
      var messages = await redis.xreadgroup("GROUP", group, consumer, 'BLOCK', 2000, "COUNT", 10, "STREAMS", stream, last_id)
      console.log(require("util").inspect(messages, false, null, true /* enable colors */))
      
      if (messages == null) {
        // d = (Date.now() - start) / 1000
        // console.log(`${consumer}: total ${total}, duration ${d}, speed ${total / d} m/s`)
        last_id = 0 // check_backlog
        continue
      } //timeout

      messages = messages[0][1]
      n = messages.length
      // total += n
      if (n == 0) {
        // check_backlog = false
        last_id = '>'
        continue
      }

      logs = []
      ids = []
      messages.forEach(([id, message]) => {
        logs.push(logParser(message[1]))
        ids.push(id)
      })
      await sentLog(logs)
      ids.forEach(async id => {
        await redis.xack(stream, group, id)
        await redis.xdel(stream, id)

      })
    } catch (error) {
      console.error(error)
    }
  }
}

// parser
const logParser = message => {
  let values = message.split("|")
  let contents = values.map((value, index) => ({ key: logSchema[index], value }))
  return {
    time: Date.now(),
    contents,
  }
}

// sent log

const sentLog = async logs => {
  const logListPayload = {
    logGroupList: [
      {
        logs,
      }
    ]
  }
  try {
    const buffer = LogGroupList.encode(logListPayload).finish();
    await sentLogToTencentCloud(buffer)
  } catch (error) {
    console.error(error)
  }
}

// ---- for test protobuf encode ------//

// var revmessage = LogGroupList.decode(buffer);
// var object = LogGroupList.toObject(revmessage, {
//   longs: String,
//   enums: String,
//   bytes: String,
//   // see ConversionOptions
// });
// console.log(util.inspect(object, false, null, true /* enable colors */))


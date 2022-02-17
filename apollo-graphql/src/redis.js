require('dotenv').config()
const PORT = process.env.redisPort
const HOST = process.env.redisHost
const Redis = require("ioredis")
const redis = new Redis(PORT, HOST)

redis.on('error', err => {
  console.log('REDIS: FAILED', err)
  process.exit(0)
})

module.exports = {
  redis
}
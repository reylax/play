require('dotenv').config()
const PORT = process.env.redisPort
const HOST = process.env.redisHost
const Redis = require("ioredis")
const pub = new Redis(PORT, HOST)
const sub = new Redis(PORT, HOST)

sub.on('error', err => {
  console.log('REDIS: FAILED', err)
  process.exit(0)
})

pub.on('error', err => {
  console.log('REDIS: FAILED', err)
  process.exit(0)
})

module.exports = {
  pub,
  sub
}
const redis = require('redis')

const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient({
  url: `redis://${REDIS_CONF.host}:${REDIS_CONF.port}`,
  legacyMode: true
})


// 连接
redisClient.connect()
    .then(() => console.log('redis connect success!'))
    .catch(console.error)
module.exports = redisClient
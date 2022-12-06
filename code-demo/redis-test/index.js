const redis = require('redis')

!(async function() {
  // 创建客户端
  const redisClient = redis.createClient(6379, '127.0.0.1')
  await redisClient.connect()

  await redisClient.set('myname', 'zhangsan123')

  const myname = await redisClient.get('myname')

  console.log('myname', myname)

  redisClient.quit()
})()
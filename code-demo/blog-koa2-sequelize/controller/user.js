const User = require('../db/model/User')
const { genPassword } = require('../utils/cryp')

const login = async (username, password) => {
  password = genPassword(password)
  const data = await User.findOne({
    where: {
      username,
      password
    }
  })
  if(!data) return {}
  return data.dataValues
}

module.exports = {
  login
}
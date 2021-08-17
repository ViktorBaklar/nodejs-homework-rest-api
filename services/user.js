const User = require('../model/user.model')

const getById = (id) => User.findById(id)

const getOne = (filter) => {
  return User.findOne(filter)
}

const addUser = ({ email, password, verifyToken }) => {
  const newUser = new User({ email, verifyToken })
  newUser.setPassword(password)
  return newUser.save()
}

const updateById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo)
}

module.exports = {
  getOne,
  addUser,
  getById,
  updateById
}

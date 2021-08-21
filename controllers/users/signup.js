const { nanoid } = require('nanoid')
const { user: service } = require('../../services')
const sendMail = require('../../utils/sendMail')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await service.getOne({ email })

    if (user) {
      return res.status(409).json({
        status: 'Error',
        code: 409,
        message: 'Email is already in use',
        data: 'Conflict',
      })
    }
    const verifyToken = await nanoid()
    console.log(verifyToken)
    const newUser = await service.addUser({ email, password, verifyToken })
    const { _id, subscription, avatarURL } = newUser
    const mail = {
      to: email,
      subject: 'Please confirm your email',
      text: `Please follow the link to confirm your email: 
http://localhost:3000/api/users/verify/${verifyToken}`,
    }
    await sendMail(mail)

    res.status(201).json({
      status: 'Success',
      code: 201,
      data: {
        user: { _id, email, subscription, avatarURL },
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup

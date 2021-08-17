const { nanoid } = require('nanoid')
const { user: service } = require('../../services')
const sendMail = require('../../utils/sendMail')

const reverify = async (req, res, next) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      status: 'Error',
      code: 400,
      message: 'Missing required field email',
    })
  }
  try {
    const user = await service.getOne({ email })
    if (!user) {
      return res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'User not found',
      })
    }

    if (user.verified) {
      return res.status(400).json({
        status: 'Error',
        code: 400,
        message: 'Verification has already been passed',
      })
    }

    const verifyToken = await nanoid()
    const mail = {
      to: email,
      subject: 'Please confirm your email',
      text: `Please click the following link to confirm your email and finish the registration: 
http://localhost:3000/api/users/verify/${verifyToken}`,
    }
    await sendMail(mail)
  } catch (error) {
    next(error)
  }
}

module.exports = reverify

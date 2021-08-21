const { user: service } = require('../../services')

const verify = async (req, res, next) => {
  const { verifyToken } = req.params

  try {
    const user = await service.getOne({ verifyToken })

    if (!user) {
      return res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'User not found',
      })
    }

    await service.updateById(user._id, { verify: true, verifyToken: null })
    res.status(200).json({
      status: 'Success',
      code: 200,
      message: 'Verification successful',
    })
    res.send('<h1>Your email is verified.</h1>')
  } catch (error) {
    next(error)
  }
}

module.exports = verify

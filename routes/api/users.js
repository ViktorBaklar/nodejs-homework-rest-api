const { Router } = require('express')
const router = Router()
const { authenticate, validate, upload } = require('../../middleware')
const { registrationValidate, updateSubscriptionValidate } = require('../../utils/validate/schemas')

const ctrl = require('../../controllers/users')

router.post('/signup', validate(registrationValidate), ctrl.signup)
router.post('/login', validate(registrationValidate), ctrl.login)
router.get('/logout', authenticate, ctrl.logout)
router.get('/current', authenticate, ctrl.getCurrentUser)
router.patch('/', validate(updateSubscriptionValidate), authenticate, ctrl.updateSubscription)
router.patch('/avatars', authenticate, upload, ctrl.updateAvatar)

module.exports = router

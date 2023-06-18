const express = require('express');
const { validateBody, authenticate, userSchemas, upload } = require('../../middlewares');
const router = express.Router();

const userController = require('../../controllers/auth-controller');

router.post('/register', validateBody(userSchemas.registerSchema), userController.register);
router.post('/login', validateBody(userSchemas.loginSchema), userController.login);

router.get('/current', authenticate, userController.getCurrent);
router.post('/logout', authenticate, userController.logout);

router.get('/verify/:verificationToken', userController.verifyEmail);

router.post('/verify', userController.resendVerifyEmail);

router.patch('/avatars', authenticate, upload.single('avatar'), userController.changeAvatar);

module.exports = router;

const express = require('express');
const { validateBody, authenticate } = require('../../middlewares');
const router = express.Router();
const { userSchemas } = require('../../middlewares');

const userController = require('../../controllers/auth-controller');

router.post('/register', validateBody(userSchemas.registerSchema), userController.register);
router.post('/login', validateBody(userSchemas.loginSchema), userController.login);

router.get("/current", authenticate, userController.getCurrent)
router.post("/logout", authenticate, userController.logout)

module.exports = router;

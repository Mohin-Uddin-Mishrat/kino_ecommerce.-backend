const express = require('express');
const { createUser, loginUser, logout, forgetPassword } = require('../controller/usercontroller');
const router= express.Router();

router.route("/createUser").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/forgetPassword").post(forgetPassword);

module.exports= router

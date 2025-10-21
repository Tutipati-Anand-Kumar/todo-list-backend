// server/routes/userRoutes.js
const express = require('express');
const { registerUser, checkUserExit, secureLogin } = require('../controllers/userController');

const router = express.Router();
router.post('/', registerUser); 
router.post('/login', secureLogin); 
router.get('/check', checkUserExit);

module.exports = router;
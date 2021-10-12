const { application } = require('express');
const express = require('express');
const router = express .Router();

const app = express();

const auth = require('../controllers/auth');

router.post('/register' , auth.register);
router.post('/login' , auth.login);

module.exports = router;

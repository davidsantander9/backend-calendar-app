/*
    Routes user / auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');

const router = Router();

router.post(
    '/new', 
    [ 
        check('name', 'Name is requiered').not().isEmpty(),
        check('email', 'Email is requiered').isEmail(),
        check('password', 'Password should be at least 6 characters').isLength({ min:6 }),
    ],
    createUser);

router.post('/', 
    [
        check('email', 'Email is requiered').isEmail(),
        check('password', 'Password should be at least 6 characters').isLength({ min:6 }),
    ],
    loginUser );

router.get('/renew', renewToken );
  

module.exports = router; 
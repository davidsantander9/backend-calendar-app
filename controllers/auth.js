const { response } = require('express');
const { validationResult } = require('express-validator');

const createUser = (req, res = response) =>{    

    //handle errors
    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        })
    }

    res.status(200).json({
        ok: true,
        msg: 'register',
        user: req.body,
    })
}
const loginUser= (req, res = response) =>{

    //handle errors
    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        })
    }

    res.json({
        ok: true,
        msg: 'login',
        user: req.body,
    })
}
const renewToken = (req, res = response) =>{
    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}
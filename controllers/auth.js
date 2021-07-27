const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');


const createUser = async(req, res = response) =>{    

    const { email, password } = req.body;
    
    try {

        let user = User.findOne({ email });

        if ( user ){
            return res.status(400).json({
                ok: false,
                msg: 'user already exists',
            });
        }

        user = new User( req.body );

        // encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();


        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please call admin'
        });
    }

    
}

const loginUser= (req, res = response) =>{

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
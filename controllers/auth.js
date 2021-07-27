const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');


const createUser = async(req, res = response) =>{    

    const { email, password } = req.body;
    
    try {

        let user = await User.findOne({ email });

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

        // save user
        await user.save();

        // generate JWT
        const token = await generateJWT( user.id, user.name );

        return res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please call admin'
        });
    }

    
}

const loginUser = async(req, res = response) =>{

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if ( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'password and email incorrect',
            });
        } 
        
        const validPassword  = bcrypt.compareSync( password, user.password );

        
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'password and email incorrect!', 
            }); 
        }
        
        // generate JWT
        const token = await generateJWT( user.id, user.name );

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });


        
    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'Call admin'
        });
        
    }
}

const renewToken = async(req, res = response) =>{

    const { uid, name } = req;

    const token = await generateJWT( uid, name );

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
}
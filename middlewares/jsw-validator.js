const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'There is not token in the request'
        });
    }

    try{

        const { uid, name } = jwt.verify( 
            token, 
            process.env.SECRECT_JWT_SEED
        );

    req.uid = uid;
    req.name = name;       
         

    }catch( error ){
        return res.status(401).json({
            ok: false,
            msg: 'Token invalid'
        });
    }

    next();
}


module.exports = {
    validateJWT
}

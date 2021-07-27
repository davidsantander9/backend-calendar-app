// {
//     ok: true,
//     msg: 'getEvents',
// }
const { response } = require('express')

const getEvents = async(req, res = response) => {
    
    return res.status(200).json({
        ok: true,
        msg: 'get events',
    });
};

const createEvent = async(req, res = response) => {

    return res.status(200).json({
        ok: true,
        msg: 'createEvent',
    });
};

const updateEvent = async(req, res = response) => {

    return res.status(200).json({
        ok: true,
        msg: 'update',
    });
};

const deleteEvent = async(req, res = response) => {

    return res.status(200).json({
        ok: true,
        msg: 'delete',
    });
};


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,

}
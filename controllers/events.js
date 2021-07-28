const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    const events = await Event.find()
                            .populate('user', 'name');


    
    return res.status(200).json({
        ok: true,
        msg: 'get events',
        events
    });
};

const createEvent = async(req, res = response) => {

    const event = new Event(req.body);

    try {

        event.user = req.uid;
        
        event.user = req.uid;

        const eventDB = await event.save();

        return res.status(500).json({
            ok: true,
            event: eventDB
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'call the admin',
        });
    }

};

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );
        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'With out privilages to edit this event'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } );

        return res.status(201).json({
                ok: true,
                event: updatedEvent
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'call admin'
        });
    }
};

const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );
        if( !event ){
            return res.status(404).json({
                ok: false,
                msg: 'Event does not exist'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'With out privilages to edit this event'
            });
        }

        await Event.findByIdAndDelete( eventId );

        return res.status(201).json({
                ok: true,
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'call admin'
        });
    }


};


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,

}
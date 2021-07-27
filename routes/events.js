
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/jsw-validator');
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,

} = require('../controllers/events');

const router = Router();

router.use( validateJWT );

router.get('/', getEvents);

router.post('/', createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router; 
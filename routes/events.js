
const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/jsw-validator');
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,

} = require('../controllers/events');
const { validateFields } = require('../middlewares/field-validator');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use( validateJWT );

router.get('/', getEvents);

router.post('/', 
    [
        check('title', 'Title is require').not().isEmpty(),
        check('start', 'start date is require').custom( isDate ),
        check('end', 'end date is require').custom( isDate ),
        validateFields
    ],
    createEvent);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router; 
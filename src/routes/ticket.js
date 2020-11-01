const express = require('express');
const router = express.Router();
//middleware
//const checkAuth = require('../middleware/checkAuth')

const Ticket = require('../controllers/ticket');

//create event
router.post('/:id', Ticket.createTicket);
//fetch all Event
router.get('/', Ticket.getTickets);

router.get('/:id/event', Ticket.getTicketsByEvent);

router.get('/:code', Ticket.getTicket);

router.get('/:code/status', Ticket.updateTicketStatus);

router.get('/:code/corkage', Ticket.updateTicketCorkage);

module.exports = router;
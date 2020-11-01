const express = require('express');
const router = express.Router();
//middleware
//const checkAuth = require('../middleware/checkAuth')

const Ticket = require('../controllers/ticket');

//create event
router.post('/', Ticket.createTicket);
//fetch all Event
router.get('/', Ticket.getTickets);

router.get('/:id/event', Ticket.getTicketsByEvent);

router.get('/:id/status', Ticket.updateTicketStatus);

module.exports = router;
const mongoose = require('mongoose');

const Event = require('../models/event');
const Ticket = require('../models/ticket');

//create ticket
exports.createTicket = (req, res, next) => {
  Event.findById(req.body.eventId).exec().then(doc => {
    if (doc !== null) {
      let ticket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        code: req.body.code,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        eventId: doc._id,
      });

      ticket.save().then(result => {
        res.status(200).json({
          hasError: false,
          message: "ticket generated successfully",
          data: result,
        })
      }).catch(err => {
        res.status(500).json({
          hasError: true,
          error: err,
          message: 'Could not create'
        });
      })
    } else {
      res.status(200).json({
        hasError: true,
        message: "event ID doesnt exist or has been deleted"
      });
    }
  }).catch(err => {
    res.status(500).json({
      hasError: true,
      error: err,
      message: "An error occurred"
    });
  });

}

//get tickets
exports.getTickets = (req, res, next) => {
  Product.find().populate('eventId').exec().then(
    result => {
      res.status(200).json({
        hasError: false,
        message: "Tickets",
        data: result,
      })
    }).catch(err => {
    console.log(err)
    res.status(500).json({
      hasError: true,
      error: err,
      message: "An error occurred"
    });
  })
}

//update tickets
exports.updateTicketStatus = (req, res, next) => {
  const id = req.params.id;
  Ticket.update({
      _id: id
    }, {
      $set: {
        status: 'approved'
      }
    })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        hasError: false,
        message: 'Updated successfully',
        data: result,
      });
    })
    .catch(err => {
      res.status(500).json({
        hasError: true,
        message: 'An error occurred',
        error: err
      });
    });
}

//get tickets for an event
exports.getTicketsByEvent = (req, res, next) => {
  Ticket.find({
    eventId: req.params.id
  }).populate('eventId').exec().then(doc => {
    res.status(200).json({
      hasError: false,
      message: "Tickets by event",
      data: doc
    });
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      hasError: true,
      message: 'event doesnt exist',
      error: err
    });
  })
}


//delete user
// exports.product_delete = (req, res, next) => {
//   const id = req.params.id;
//   Product.remove({
//       _id: id
//     })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         messgae: 'Product deleted',
//         data: result
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({
//         error: err
//       });
//     });
// }

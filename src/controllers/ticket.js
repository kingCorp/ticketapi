const mongoose = require('mongoose');

const Event = require('../models/event');
const Ticket = require('../models/ticket');

//create ticket
exports.createTicket = (req, res, next) => {
  Event.findById(req.params.id).exec().then(doc => {
    if (doc !== null) {
      let ticket = new Ticket({
        _id: new mongoose.Types.ObjectId(),
        code: req.body.code,
        phone: req.body.phone,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        event: doc._id,
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
  Ticket.find().populate('event').sort({date: -1}).exec().then(
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

//update tickets status
exports.updateTicketStatus = (req, res, next) => {
  const id = req.params.code;
  Ticket.update({
      code: id
    }, {
      $set: {
        status: 'approved'
      }
    })
    .exec()
    .then(result => {
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

//update tickets corkage
exports.updateTicketCorkage = (req, res, next) => {
  const id = req.params.code;
  Ticket.update({
    code: id
  }, {
    $set: {
      corkage: 'approved'
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
    event: req.params.id
  }).populate('event').sort({date: -1}).exec().then(doc => {
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

//get tickets for an event
exports.getTicket = (req, res, next) => {
  Ticket.findOne({
    code: req.params.code
  }).populate('event').sort({date: -1}).exec().then(doc => {
    if(doc){
      res.status(200).json({
        hasError: false,
        message: "Tickets Details",
        data: doc
      });
    } else {
      res.status(200).json({
        hasError: true,
        message: 'ticket doesnt exist',
        //error: err
      });
    }
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      hasError: true,
      message: 'ticket doesnt exist',
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

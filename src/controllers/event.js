const mongoose = require('mongoose');

const Event = require('../models/event');

//create event 
exports.createEvent = (req, res, next) => {
  var event = new Event({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
  })

  event.save().then(result => {
    res.status(200).json({
      hasError: false,
      message: "event created successfully",
      data: result,
    })
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      hasError: true,
      error: err,
      message: "An error occurred"
    });
  });

}

//get events
exports.getEvents = (req, res, next) => {
  Event.find().exec().then(
    result => {
      res.status(200).json({
        hasError: false,
        message: "Events",
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

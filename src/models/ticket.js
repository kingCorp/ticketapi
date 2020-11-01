const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true, default:1},
    status: {type: String, required: true, enum : ['pending','approved'], default: 'pending'},
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', ticketSchema);
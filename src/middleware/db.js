const mongoose = require('mongoose');

mongoose.Promise = global.Promise
var mongodbUri ='mongodb://ds161518.mlab.com:61518/ticket_code';

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true ,
  autoIndex: true,
  auth: {
    user: 'james',
    password: 'password1'
  }
})
var conn = mongoose.connection;    
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', () =>{
 console.log('connected to a database')                       
});
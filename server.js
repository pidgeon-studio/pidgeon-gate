var express = require('express')
var bodyParser = require('body-parser')
var app = express()



var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI);

var smsSchema = {
  date_added: { type: Date, default: Date.now },
  date_modified: { type: Date, default: Date.now },
  id: String,
  recipient: String,
  message: String,
  is_sent: Boolean
};

var Sms = mongoose.model('Sms', smsSchema);

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/send', function (req, res) {
  var auth = req.body.auth
  console.log(req.body)
  if (auth != 'pidgeon_e_boss') {
    return res.send('auth failed')
  }

  var id = req.body.id
  var recipient = req.body.recipient
  var message = req.body.message
  var sms = new Sms({
    id: id,
    recipient: recipient,
    message: message,
    is_send: false
  })

  sms.save(function (err, fluffy) {
    if (err) return res.send('ERROR')
    return res.send('Added to queue!')
  });

})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ', app.get('port'))
})

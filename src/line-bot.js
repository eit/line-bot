var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var config = require('../config');

const app = express();
const port = process.env.PORT || '7123';
var CHANNEL_ID = config.CHANNEL_ID;
var CHANNEL_SECRECT =  process.env.CHANNEL_SECRET;
var CHANNEL_TOKEN = config.CHANNEL_TOKEN;
const LINE_API = 'https://api.line.me/v2/bot/message/push';
var crypto = require('crypto');
var hmac = crypto.createHmac('sha256', CHANNEL_SECRECT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/callback', (req, res) => {
  console.log(req.headers);
  console.log(JSON.stringify(req.body));
  var updatedHmac = hmac.update(JSON.stringify(req.body));
  var digestValue = hmac.digest('base64')

  if (digestValue === req.headers['x-line-signature']){
    res.sendStatus(200);
    const result = req.body.events;
    for(let i=0; i<result.length; i++){
      const data = result[i];
      console.log('receive: ', data);
      sendTextMessage(data.source.userId, data.message.text);
    }
  } else {
    res.sendStatus(404);
  }
});

// example event object
// [
//   {
//     "type":"message",
//     "replyToken":"***92c932a66458484c88f843296d***",
//     "source":{"userId":"Ucc81918aa4bea2378f0c4e49110a9f80","type":"user"},
//     "timestamp":1480215713362,
//     "message":{"type":"text","id":"5264722319715","text":"Hi"}
//   }
// ]

app.listen(port, () => console.log(`listening on port ${port}`));

function sendTextMessage(sender, text) {

  const data = {
    to: sender,
    messages: [{
      type: 'text',
      text: text
    }]
  };

  console.log('send: ', data);

  request({
    url: LINE_API,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      // 'X-Line-ChannelID': CHANNEL_ID,
      // 'X-Line-ChannelSecret': CHANNEL_SERECT,
      'Authorization': `Bearer ${CHANNEL_TOKEN}`,
      // 'X-Line-Trusted-User-With-ACL': MID
    },
    method: 'POST',
    body: JSON.stringify(data) 
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
    console.log('send response: ', body);
  });
}
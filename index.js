require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

// Basic Configuration
const port = process.env.PORT || 3000;

app.use('/', bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const originalUrls = []
const shortUrls = []

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url
  const foundIndex = originalUrls.indexOf(url)

  if(foundIndex < 0){
    originalUrls.push(url)
    shortUrls.push(shortUrls.length)

    return res.json({
      original_url: url,
      short_url: shortUrls.length -1
    })
  }

  return res.json({
    original_url: url,
    short_url: shortUrls[foundIndex]
  })

  res.json(req.body.url);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

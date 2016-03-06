# bestchoice.js
Self Learning Weighted Multivariate Testing Module



## How to use

Type in terminal to install

```
npm install bestchoice
```


In your index.js and add

```
var bc = require('bestchoice');
```

### Campaign Managment Example Code

Adding a new campaign

```
bc.addCampaign('t00000001',
   'http://www.test1.com/register',
   ['http://www.test1.com/register/a',
    'http://www.test1.com/register/b',
    'http://www.test1.com/register/c',
    'http://www.test1.com/register/d'],
    0.1,
    1);
```

Removing a campaign

```
bc.removeCampaign('t00000001');
```

Getting all availible campaigns
Returns all running campaigns as Objects

```
bc.getCampaigns();
```

Saving all availible campaigns as JSON
Returns all running campaigns

```
var data = bc.getCampaigns();
```


Loading previously computed campaigns as a current stack

```
bc.loadCampaign(data);
```


### Campaign Managment Example Code

First visit. Supply with campaign ID and path name.
Returns page variant to use and unique ID to use as a Cookie.

```
bc.getPage('t00000001', 'http://www.test1.com/register');
```

Conversion trigger. Supply with campaign ID, path name, cookie and the amount of reward between 0 and 1.

```
bc.getPage('t00000001', 'http://www.test2.com/register', 'unique cookie');
```

## Express Example

'''

'use strict';

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bc = require('bestchoice');
app.use(cookieParser());

bc.dictionary = {
  'http://www.test1.com/register': 't00000001',
  'http://localhost:3000/register': 't00000001'
};

bc.addCampaign('t00000001',
  'http://localhost:3000/register',
  ['http://localhost:3000/register/a',
   'http://localhost:3000/register/b',
   'http://localhost:3000/register/c'
  ],
  0.1,
  30); // expire every 30 minutes

  setInterval(function() {
      bc.updateExpiredVisits("t00000001");
  }, 30000); // update every 30 minutes

app.get('/', function(req, res) {

  res.send('Locked and Loaded');

});

app.get('/register', function(req, res) {

  var cookie = req.cookies.bc;
  var url = req.protocol + '://' + req.get('host') + req.originalUrl;
  var campaign = bc.dictionary[url];
  var get = bc.getPage(bc.dictionary[url], url, cookie);
  if (cookie === undefined) {
    res.cookie('bc', get, {
      maxAge: 3600 * 1000,
      httpOnly: true
    });
  }
  res.redirect(get.pageVariant);

});

app.get('/register/:variant', function(req, res) {
  var campaign = req.cookies.bc.campaignID;
  var variant = req.cookies.bc.pageVariant;
  res.send('Variant Page');
});

app.get('/convert', function(req, res) {
  var params = req.cookies.bc;
  var cookie = params.cookie;
  var campaign = req.cookies.bc.campaignID;
  var variant = req.cookies.bc.pageVariant;
  bc.registerConversion(campaign, variant, req.cookies.bc.cookie, 1);
  res.send('Converted');
});

app.get('/results', function(req, res) {
  res.send(JSON.stringify(bc.getCampaigns()));
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

'''

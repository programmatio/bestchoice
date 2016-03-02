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
                       'https://www.example.com',
                       'register',
                       ['register?v=1',
                        'register?v=2',
                        'register?v=3',
                        'register?v=4']);
```

Removing a campaign

```
bc.removeCampaign('t00000001');
```

Getting all availible campaigns
Returns all running campaigns as Objects

```
bc.getCampaigns('t00000001');
```

Saving all availible campaigns as JSON
Returns all running campaigns

```
var data = bc.getCampaigns('t00000001');
```


Loading previously computed campaigns as a current stack

```
bc.loadCampaign(data);
```


### Campaign Managment Example Code

First visit. Supply with campaign ID and path name.
Returns page variant to use and unique ID to use as a Cookie.

```
bc.visit('t00000001', 'login');
```

Conversion trigger. Supply with campaign ID, path name, cookie and the amount of reward between 0 and 1.

```
bc.registerConversion(id, variant ,cookie, reward);

```

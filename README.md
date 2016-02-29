# bestchoice.js
bestchoice.js - Self Learning Weighted Multivariate Testing Module


### Campaign Managment

Adding a campaign

```
bestchoice.addCampaign('t00000001',
                       'https://www.example.com',
                       'register',
                       ['register?v=1','register?v=2', 'register?v=3', 'register?v=4']);

bestchoice.getCampaign(id).init();
```


Removing a campaign

```
bestchoice.removeCampaign('t00000001');
```


Getting a specific campaign

```
bestchoice.getCampaign('t00000001');
```


Getting all availible campaigns

```
bestchoice.getCampaign('t00000001');
```


Loading previously computed campaigns as a current stack

```

 var data = [
               {
                  "id":"t00000001",
                  "baseURL":"https://www.example.com",
                  "target":"register",
                  "variants":[
                     "register?v=1",
                     "register?v=2",
                     "register?v=3",
                     "register?v=4"
                  ],
                  "stats":{
                     "epsilon":0.1,
                     "counts":[
                        0,
                        0,
                        0,
                        0
                     ],
                     "values":[
                        0,
                        0,
                        0,
                        0
                     ]
                  }
               },
               {
                  "id":"t00000002",
                  "baseURL":"https://www.example.com",
                  "target":"login",
                  "variants":[
                     "login?v=1",
                     "login?v=2",
                     "login?v=3",
                     "login?v=4"
                  ],
                  "stats":{
                     "epsilon":0.1,
                     "counts":[
                        0,
                        0,
                        0,
                        0
                     ],
                     "values":[
                        0,
                        0,
                        0,
                        0
                     ]
                  }
               }
            ]

bestchoice.loadCampaign(data);
```


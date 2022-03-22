const express = require('express');
const getAPI = require('../helpers/github.js');
const savetoDB = require('../database/index.js');

let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  let user = req.body.username;
  console.log('user name get in server post requet', user);
  getAPI.getReposByUsername(user)
    .then((result)=> {
      let insertedData = result.data.map((obj) => {
        return {
          'repo_id': obj.id,
          'user_id': obj.owner.id,
          'url': obj.html_url,
          'repo_name': obj.name,
          'size': obj.size
        };
      });
      console.log('data received from GHAPI in server', insertedData);
      savetoDB.save(insertedData, (err, data)=> {
        if (err) {
          console.log('mongo error', err);
        } else {
          res.status(200).send('data posted to mongoDB');
        }
      });
    // edit data
    // write data in MONGO DB
    })
    .catch((err) => {
      console.error('have error when retrieving info from GHAPI' + err);
    });
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // savetoDB.displayData((err, data) => {
  //   if (err) {
  //     // res.status(404).send('can not get user repo info');
  //     console.log('server error on get request');
  //   } else {
  //     console.log('server get request works:' + data);
  //     res.send(data);
  //   }
  // });
  savetoDB.displayData()
    .then((data)=>res.status(200).send(data))
    .catch((err)=>console.log('err in display data' + err));
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


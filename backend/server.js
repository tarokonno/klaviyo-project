const express = require('express')
const app = express()
const port = 5000
const axios = require('axios')
const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// Root API Endpoint

app.get('/api', (req, res) => {
  res.send('This is the root endpoint, nice!')
})

// Get Profiles API Endpoint

app.get('/api/profiles', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://a.klaviyo.com/api/profiles/',
    headers: {
      accept: 'application/json',
      revision: '2022-10-17',
      Authorization: 'Klaviyo-API-Key pk_8564f8d7caa7f6d04f7d0140b51bafab81'
    }
  };
  
  axios
    .request(options)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
})

// Post Event API Endpoint

app.post('/api/shot', (req, res) => {
console.log(req.body.result)

const options = {
  method: 'POST',
  url: 'https://a.klaviyo.com/api/events/',
  headers: {
    accept: 'application/json',
    revision: '2022-10-17',
    'content-type': 'application/json',
    Authorization: 'Klaviyo-API-Key pk_8564f8d7caa7f6d04f7d0140b51bafab81'
  },
  data: {
    data: {
      type: 'event',
      attributes: {
        profile: {
          email: req.body.email
        },
        metric: {name: 'Shot a Penalty'},
        properties: {team: req.body.team, opposition: req.body.opposition, player: req.body.player, result: req.body.result}
      }
    }
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

})

// Get All Results from Event API Endpoint

app.get('/api/events', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://a.klaviyo.com/api/events/?filter=equals(metric_id,"WCahHj")',
    headers: {
      accept: 'application/json',
      revision: '2022-10-17',
      Authorization: 'Klaviyo-API-Key pk_8564f8d7caa7f6d04f7d0140b51bafab81'
    }
  };
  
  axios
    .request(options)
    .then(function (response) {
      res.send(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
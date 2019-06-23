require('dotenv').config();
const express = require('express');
const massive = require('massive');
const port = process.env.SERVER_PORT || 3002;
const cors = require('cors');
const app = express();

// const { getUsers, getFavlist, postUser, postlogin, getUserByID, editUserInfo } = require('./controllers/usersControllers');
// const { getCharts } = require('./controllers/chartsControllers');
// const { getBitcoinList, postBitcoinlistID, deleteFavCoinID, getBitcoinImage } = require('./controllers/allbitcoinControllers');

app.use(cors())
app.use(express.json())

//  MASSIVE CONNECT TO SQL SYSTEM FUNCTIONALITY
massive(process.env.CONNECTION_STRING)
.then(dbInstace => {
  app.set('db', dbInstace)
})
.catch(error => console.log("Unable to connect to db!", error));

const path = require('path'); // Usually moved to the start of file

app.use(express.static( `${__dirname}/../build` ));

//  USER ENDPOINT SET-UP
// app.get('/api/user', getUsers)
// app.get('/api/user/:id', getUserByID)
// app.post(`/api/user`, postUser)
// app.post('/api/user/login', postlogin)
// app.put('/api/user', editUserInfo)

// //  CHARTS ENDPOINT SET-UP
// app.get('/api/bitcoin', getCharts)

// //  ALLBITCOINLIST ENDPOINT SET-UP
// app.get('/api/allbitcoinlist', getBitcoinList)
// app.get('/api/bitcoinImage', getBitcoinImage)

// //  FAVORITE ENDPOINT SET-UP
// app.get('/api/user2/:id', getFavlist)
// app.post('/api/favorite/:id/1', postBitcoinlistID)
// app.delete('/api/favorite/:coinindex/:userid', deleteFavCoinID)

app.listen(port, () => {
  console.log(`Server is UP and listening on port ${ port }`);
});

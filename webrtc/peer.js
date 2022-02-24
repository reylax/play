require('dotenv').config()

const { PeerServer } = require('peer');

const peerServer = PeerServer({ port: process.env.PORT || 3000, debug: 0});

// peerServer.on('connection', (client) => {
//   console.log(client)
// });

// peerServer.on('disconnect', (client) => { 
//   console.log(client)
//  });

 

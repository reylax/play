const { PeerServer } = require('peer');

const peerServer = PeerServer({ port: 9000, path: '/myapp', debug: 0});

// peerServer.on('connection', (client) => {
//   console.log(client)
// });

// peerServer.on('disconnect', (client) => { 
//   console.log(client)
//  });

 
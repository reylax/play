import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
      
      }
    }
  }
});


export const getItem = key => {
  if (typeof window !== 'undefined')
    return localStorage.getItem(key)
}

export const setItem = (key, value) => {
  if (typeof window !== 'undefined')
    localStorage.setItem(key, value)
}

// useEffect(() => {
//   import('peerjs').then(({ default: Peer }) => {
//     const peer = new Peer(undefined, {
//       host: 'localhost',
//       port: 9000,
//       path: '/myapp'
//     });
    



//     peer.on('open', function(id) {
//       console.log('My peer ID is: ' + id);
//     });
    
//     peer.on('error', function (err) {
//       console.log(err);
//       alert('' + err);
//     });
//   });
// }, [])





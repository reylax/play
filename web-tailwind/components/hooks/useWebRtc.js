import { useEffect, useState } from "react";
import { useTheme } from "../../contexts/themeContext"


export default function useWebRtc() {
  const {user: {_id}, setTalkPanelState} = useTheme()
  const [peer, setPeer] = useState(null)
  const [connection, setConnection] = useState(null)
  const [incall, setIncall] = useState(false)

  const [callerStream, setCallerStream] = useState(null)
  const [remoteStream, setRemoteStream] = useState(null)

  useEffect(() => {
    if (!_id || peer) return
    import('peerjs').then(({ default: Peer }) => {
      let peer = new Peer(_id
      ,{
         host: "localhost",
         port: 9000,
         path: '/myapp'
       }
      )
      setPeer(peer)
      peer.on('call', function(call) {
        // accept call check
        if (incall) {
          console.log("user alread in call!")
          return
        }
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        getUserMedia({video: true, audio: true}, function(stream) {
            call.answer(stream); // Answer the call with an A/V stream.
            call.on('stream', function(remote) {
              // Show stream in some video/canvas element.
              setConnection(call)
              setCallerStream(stream)
              setRemoteStream(remote)
            });
            call.on('close', () => {
              setIncall(false)
              stopStreamTrack()
            })
            call.on('error', event => {
              setIncall(false)
              stopStreamTrack()
              console.log(event)
            })
          }, function(err) {
              alert('Failed to get local stream' ,err);
            });
          })
      peer.on('disconnected', () => {
        peer.reconnect()
      })
    })
  }, [_id])


  const streamCall = ({target_id}) => {
    if (peer.destroyed || peer.disconnected) {
      alert("peer conection lost please try again later!")
      return
    }
    console.log('start stream call to:', target_id)
    var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    getUserMedia({video: true, audio: true}, function(stream) {
      const call = peer.call(target_id, stream);
      if (!call) {
        console.log("can't call maybe the callee already in an talk")
        return
      }
        call.on('stream', function(remoteStream) {
          // Show stream in some video/canvas element.
          setIncall(true)
          setConnection(call)
          setCallerStream(stream)
          setRemoteStream(remoteStream)
        });
        call.on('close', () => {
          setIncall(false)
          stopStreamTrack()
        })
        call.on('error', event => {
          setIncall(false)
          stopStreamTrack()
          console.log(event)
        })
      }, function(err) {
        console.log('Failed to get local stream', err);
      });
  }

  const stopStreamTrack = () => {
    callerStream?.getTracks().forEach(function(track) {
      if (track.readyState == 'live') {
          track.stop();
      }
    });
    setCallerStream(null)
    setRemoteStream(null)
    setTalkPanelState("init")
  }

  const cutOffStream = () => {
    if (connection) {
      connection.close()
      setConnection(null)
    }
  }


  return {
    callerStream,
    remoteStream,
    streamCall,
    cutOffStream,
    stopStreamTrack,
  }
}
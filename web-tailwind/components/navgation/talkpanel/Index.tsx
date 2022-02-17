import useWebRtc from '../../hooks/useWebRtc'
import Mediator from './Mediator'

export default function Index({videoId}) {
  const { streamCall, callerStream, remoteStream, cutOffStream, stopStreamTrack } = useWebRtc()
  if (videoId === "random") videoId = "6207d5195e3caf4598bfc15f"
  return (
    <Mediator 
      callerStream={callerStream}
      streamCall={streamCall}
      remoteStream={remoteStream}
      cutOffStream={cutOffStream}
      stopStreamTrack={stopStreamTrack}
      videoId={videoId}
    />
  )
}
import HomeLayout from "../../containers/HomeLayout";
import VideoCard from "../../main_content/video/VideoCard";

const videos = ["6207d5195e3caf4598bfc15f"]

export default function Home() {
  return (
    <HomeLayout 
      Page={() => 
        <div>
          { videos.map(videoId => <VideoCard key={videoId} videoId={videoId} />) }
        </div>
    }/>
  )
}
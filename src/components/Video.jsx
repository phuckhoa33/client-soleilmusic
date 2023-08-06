import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { VideoProgressContext } from "../context/VideoContext";
import { create_video_progress, update_video_progress } from "../api/store";
import ReactPlayer from 'react-player';


const VideoPlayer = ({user_id, video_id, course_id, video_path, setId, handleWhenClickVideoList, id}) => {
  const videoRef = useRef(null);
  const {currentTime, setCurrentTime, getVideoProgress} = useContext(VideoProgressContext);
  const m3u8Url = `https://d1ywwdta0phqxg.cloudfront.net/${video_path}`; // Đường dẫn cố định của video streaming
  const [videoState, setVideoState] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const fetchVideoProgress = async () => {
      try {
        const data = await getVideoProgress(user_id, course_id);
        if(data){
          setVideoState(data);
          
        }
      } catch (error) {
        console.error('Error when calling API on page entry:', error);
      }

    }

    fetchVideoProgress();



    return () => {
      const saveProgress = async () => {
        try {
          const newVideoProgress = {
            current_time: currentTime.toFixed(0),
            user_id,
            video_id,
            course_id
          }
          const create_video = await update_video_progress(newVideoProgress); 
          const update_video = await create_video_progress(newVideoProgress);
          Promise.all([create_video, update_video]);
        } catch (error) {
          console.log(error);
        }
      }
      saveProgress();
    }
  }, [currentTime]);

  const onReady = useCallback(() => {
    if(!isReady){
      const timeToStart = videoState?.current_time
      videoRef.current.seekTo(timeToStart, 'seconds');
      setCurrentTime(timeToStart);
      setIsReady(true);
    }
  }, [isReady])

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
  };

  const handleEndedVideo = () => {
    setId(id+1);
    handleWhenClickVideoList(id);
  }


  

  return (
    <div>
      <ReactPlayer
        ref={videoRef}
        url={m3u8Url} 
        controls 
        width="100%" 
        height="100%" 
        playing={playing}
        onProgress={handleProgress}
        onEnded={handleEndedVideo}
      />
    </div>
  );
};

export default VideoPlayer;

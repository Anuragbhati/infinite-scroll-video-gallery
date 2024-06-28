import { useState, useRef, useCallback } from "react";
import "./VideoContainer.css";
import { Video } from "../utils/fetchVideos";

interface Props {
  videos?: Video[];
  loadMoreVideos: () => void; 
}

const VideoContainer = ({ videos, loadMoreVideos }: Props) => {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleVideoClick = (videoId: number) => {
    setPlayingVideo(videoId);
  };

  const lastVideoElementRef = useCallback(
    (node: Element) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreVideos();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMoreVideos]
  );

  return (
    <div className="video-container">
      {videos?.length ? (
        videos.map((video, index) => (
          <div
            key={video.id}
            className="video-item"
            //@ts-expect-error false
            ref={videos.length === index + 1 ? lastVideoElementRef : null}
          >
            {playingVideo === video.id ? (
              <video
                controls
                onClick={() => setPlayingVideo(null)}
                preload="none"
                playsInline
                controlsList="nodownload"
              >
                <source src={video.videos.large.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="thumbnail" onClick={() => handleVideoClick(video.id)}>
                <img src={video.videos.large.thumbnail} alt="Thumbnail" />
                <div className="play-button">
                  <svg width="50" height="50" viewBox="0 0 50 50">
                    <polygon points="20,15 20,35 35,25" fill="#fff" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No videos found.</p>
      )}
    </div>
  );
};

export default VideoContainer;
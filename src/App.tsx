/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import VideoContainer from "./components/ImageContainer";
import fetchVideos, { Video } from "./utils/fetchVideos";
import "./App.css";

const App = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setHasMore] = useState(true);

  useEffect(() => {
    loadMoreVideos();
  }, []);

  const loadMoreVideos = async () => {
    setLoading(true);
    const newVideos = await fetchVideos(page); 
    setVideos((prev) => [...prev, ...newVideos.hits]);
    setPage((prev) => prev + 1);
    if (newVideos.hits.length === 0) setHasMore(false); 
    setLoading(false);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Video Gallery</h1>
      </header>
      <VideoContainer videos={videos} loadMoreVideos={loadMoreVideos} />
      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default App;

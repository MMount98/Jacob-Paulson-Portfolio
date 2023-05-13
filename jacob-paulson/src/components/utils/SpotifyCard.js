import React, { useState } from "react";
import AudioPlayer from "./SpotifyPlayer";

const SpotifyCard = ({ albums }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState(null);

  const handlePlay = (trackId) => {
    setIsPlaying(true);
    setPlayingTrackId(trackId);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="place-items-center grid grid-cols-4 p-4 gap-2">
      {albums.map((album) => (
        <div
          className="bg-white rounded-md shadow-md overflow-hidden"
          key={album.id}
        >
          <div className="p-4">
            <h2 className="font-bold text-lg">{album.title}</h2>
            <p>{album.role}</p>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handlePlay(album.trackId)}
            >
              Play
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={handlePause}
            >
              Pause
            </button>
          </div>
          {isPlaying && (
            <div className="p-4">
              <AudioPlayer previewUrl={album.trackId} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SpotifyCard;

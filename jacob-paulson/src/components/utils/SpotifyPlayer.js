import React, { useEffect, useState } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';

const AudioPlayer = ({ trackId }) => {
  const [playerReady, setPlayerReady] = useState(false);
  const [playerState, setPlayerState] = useState({
    paused: true,
    position: 0,
  });

  useEffect(() => {
    setPlayerReady(true);
  }, []);

  const handlePlayback = (state) => {
    setPlayerState(state);
  };

  return (
    <SpotifyPlayer
      token={process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN} // Pass the access token as a prop
      uris={[`spotify:track:${trackId}`]}
      initialVolume={0.5}
      play={playerState.paused === true ? false : true}
      callback={handlePlayback}
      styles={{
        activeColor: "#1DB954",
        bgColor: "#282828",
        color: "#FFFFFF",
        loaderColor: "#FFFFFF",
        sliderColor: "#1DB954",
        trackArtistColor: "#CCCCCC",
        trackNameColor: "#FFFFFF",
      }}
    />
  );
};

export default AudioPlayer;
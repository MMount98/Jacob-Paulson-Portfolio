import { useRef, useState, useEffect } from "react";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { GiFastBackwardButton, GiFastForwardButton } from "react-icons/gi";

function AudioPlayer() {
  ///Refences
  const Player = useRef(null);
  const progressBar = useRef(null);

  //States
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  //Function Toggles play btn and sets state value
  const togglePlay = () => {
    const player = Player.current;
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeRange = () => {
    const player = Player.current;
    player.currentTime = progressBar.current.value;
    setCurrentTime(player.currentTime);
  };

  const backThirty = () => {
    const player = Player.current;
    player.currentTime = player.currentTime - 30;
    setCurrentTime(player.currentTime);
  };

  const forwardThirty = () => {
    const player = Player.current;
    player.currentTime = player.currentTime + 30;
    setCurrentTime(player.currentTime);
  };

  const correctTime = (time) => {
    if (isNaN(time)) {
      return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const player = Player.current;

    const handleDuration = () => {
      setDuration(player.duration);
      setCurrentTime(player.currentTime);
    };
    player.addEventListener("loadedmetadata", handleDuration);

    const handleTimeUpdate = () => {
      setCurrentTime(player.currentTime);
    };
    player.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      player.removeEventListener("loadedmetadata", handleDuration);
      player.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="AudioPlayer bg-red-700 w-2/6">
      <audio
        ref={Player}
        src="https://soundcloud.com/blush-1999/tokyo.mp3"
        preload="metadata"
      ></audio>
      <button onClick={backThirty}>
        <GiFastBackwardButton />
      </button>
      <button onClick={togglePlay}>
        {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
      </button>
      <button onClick={forwardThirty}>
        <GiFastForwardButton />
      </button>

      <div className="inline-block">{correctTime(currentTime)}</div>

      <div className="inline-block w-60 mx-4">
        <input
          type="range"
          defaultValue={0}
          ref={progressBar}
          className="slider slider-secondary"
          onChange={changeRange}
          max={duration}
          step="0.01"
        ></input>
      </div>
      {/* Checking for a passed duration and if it is a number */}
      <div className="inline-block">
        {duration && !isNaN(duration) && correctTime(duration)}
      </div>
    </div>
  );
}

export default AudioPlayer;

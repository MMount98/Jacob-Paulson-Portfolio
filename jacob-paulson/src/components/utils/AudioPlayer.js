import { useState, useRef, useEffect } from "react";
import { GiFastBackwardButton, GiFastForwardButton } from "react-icons/gi";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";

export default function AudioPlayer() {
  //State
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  //Refrence
  const Player = useRef();
  const progressBar = useRef();

  //Effect
  useEffect(() => {
    const sec = Math.floor(Player.current.duration);
    setDuration(sec);
    progressBar.current.max = sec;
  }, [Player?.current?.loadedmetadata, Player?.current?.readyState]);

  //Function to correct the time from useEffect
  const correctTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const secsonds = Math.floor(secs % 60);
    const returnSec = secsonds < 10 ? `0${secsonds}` : `${secsonds}`;

    return `${returnMin} : ${returnSec}`;
  };

  //Funciton to Play music and change displaye play or pause
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      Player.current.play();
    } else Player.current.pause();
  };
  //Function to change the value of curent range

  const changeRange = () => {
    Player.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  return (
    <div className="AudioPlayer">
      <audio
        ref={Player}
        src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"
        preload="metadata"
      ></audio>
      <button>
        {" "}
        <GiFastBackwardButton />{" "}
      </button>
      <button onClick={togglePlay}>
        {isPlaying ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
      </button>
      <button>
        <GiFastForwardButton />
      </button>

      <div>{correctTime(currentTime)}</div>

      <div>
        <input
          type="range"
          defaultValue={0}
          ref={progressBar}
          style={{ "--seek-before-width": "100px" }}
          onChange={changeRange}
        ></input>
      </div>
      {/* Checking for a passed duartion and if it is a number */}
      <div>{duration && !isNaN(duration) && correctTime(duration)}</div>
    </div>
  );
}

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({ audioRef, setSongInfo,
  songInfo, currentSong, isPlaying, setIsPlaying, songs, setCurrentSong, setSongs, animationPercentage, skipTrackHandler, libraryStatus }) => {

  //UseEffect 
  useEffect(() => {
    //Add active state
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  }, [currentSong])
  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      //switching state
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      //switching state
      setIsPlaying(!isPlaying);
    }
  };



  //reformating time
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //DragHandler control
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };


  return (
    <div className={`player-container  ${libraryStatus ? 'library-active' : ''}`}>
      <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]}99,${currentSong.color[1]}99)` }} className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})` }} className="track" >

          <input
            min={0}
            max={0 || songInfo.duration}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={{ transform: `translateX(${animationPercentage}%)` }}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div style={{ background: `linear-gradient(to right, ${currentSong.color[0]}ee,${currentSong.color[1]}ee)` }} className="play-control">
        <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />{" "}
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}

        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;

import React, { useState, useRef } from "react";
//importing components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
//importing styles
import './styles/app.scss'
//importing songs data. 
import data from './data'


function App() {
  //Ref with starting value null
  const audioRef = useRef(null);
  /*state*/
  const [songs, setSongs] = useState(data());

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  //Adding percentage to animation 
  const animationPercentage = Math.round((songInfo.currentTime / songInfo.duration) * 100);

  //Library Toggle
  const [libraryStatus, setLibraryStatus] = useState(false);
  //chosing first song by default. 
  const [currentSong, setCurrentSong] = useState(songs[0])
  //stop and play state
  const [isPlaying, setIsPlaying] = useState(false);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
  };

  // //Auto-Skippign to next song upon song end
  // const songEndHandler = async () => {
  //   let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  //   await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  //   if (isPlaying) audioRef.current.play();
  // }
  //Skipping back and forward
  const skipTrackHandler = async (direction) => {
    //asigning index based on the id of the song 
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length])
    } if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);

        //check if the song is playing
        if (isPlaying) setTimeout(() => { audioRef.current.play() }, 100);

        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length])
    }
    //check if the song is playing -- Adding time to avoid functions run at the same time
    if (isPlaying) setTimeout(() => { audioRef.current.play() }, 200);
  }
  return (
    <div className='App' style={{ backgroundImage: `url(${currentSong?.cover})` }} >
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} currentSong={currentSong} />
      <Song currentSong={currentSong} libraryStatus={libraryStatus} />
      <Player
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        animationPercentage={animationPercentage}
        skipTrackHandler={skipTrackHandler}
        libraryStatus={libraryStatus}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}

      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        //auto skip forward
        onEnded={() => skipTrackHandler('skip-forward')}
      ></audio>
    </div >

  );
}

export default App;

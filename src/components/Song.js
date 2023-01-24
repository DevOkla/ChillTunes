import React from "react";

const Song = ({ currentSong, libraryStatus }) => {
  return (
    <div
      className="song-container"
      style={{ background: `linear-gradient(to right, ${currentSong.color[0]}dd,${currentSong.color[1]}dd)` }}
    >
      <div className={` ${libraryStatus ? 'library-active' : ''} song-info `}>
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </div>
  );
};

export default Song;

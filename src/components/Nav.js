import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
const Nav = ({ libraryStatus, setLibraryStatus, currentSong }) => {
  return (
    <nav>
      <h1>ChillTunes</h1>
      <button
        style={{
          boxShadow: `1px 1px 20px ${currentSong.color[1]}`,
          background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
        }}
        onClick={() => setLibraryStatus(!libraryStatus)}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;

import React from "react";

const MediaSinger = ({ artist }) => {
  return (
    <a href="" className="media__singer">
      {artist.name || "hello"}
    </a>
  );
};

export default MediaSinger;

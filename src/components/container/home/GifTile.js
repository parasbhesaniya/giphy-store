import React, { useState } from "react";
import { connect } from "react-redux";

import { THEME_LIGHT } from "../../../constants";
import PlayIcon from "../../../images/play-button.svg";
import PauseIcon from "../../../images/pause-button.svg";

function GifTile({ data, theme }) {
  const [isPlay, setIsPlay] = useState(false);

  const handlePlayClick = () => {
    setIsPlay(!isPlay);
  };

  return (
    <div>
      {data.images.fixed_width.url && (
        <div
          className={`item mx-2 ${
            (theme === THEME_LIGHT && "btn-dark") || "btn-light"
          }`}
        >
          <img
            src={
              (isPlay && data.images.fixed_width.url) ||
              data.images.fixed_width_still.url
            }
          />
          <div
            className="play h-100 w-100 justify-content-center align-items-center"
            onClick={handlePlayClick}
          >
            <img
              height={30}
              width={30}
              src={(isPlay && PauseIcon) || PlayIcon}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  theme: state.appState.theme,
});

export default connect(mapStateToProps)(GifTile);

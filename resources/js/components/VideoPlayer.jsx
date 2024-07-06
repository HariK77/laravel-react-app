import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
    return (
        <div className="container">
            <div className="player-wrapper">
                <ReactPlayer
                    className="react-player"
                    url={videoUrl}
                    playing={true}
                    controls={true}
                    width="100%"
                    height="100%"
                    onReady={() => console.log("onReady")}
                    onStart={() => console.log("onStart")}
                    onBuffer={() => console.log("onBuffer")}
                    onSeek={(e) => console.log("onSeek", e)}
                    onError={(e) => console.log("onError", e)}
                    onPlaybackQualityChange={(e) =>
                        console.log("onPlaybackQualityChange", e)
                    }
                />
            </div>
        </div>
    );
};

export default VideoPlayer;

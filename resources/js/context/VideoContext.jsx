import { VideoApi } from "@Api";
import { notify } from "@Utils/toastMessages";
import React, { createContext, useState, useEffect } from "react";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
    const [videoTracks, setVideoTracks] = useState(null);
    const [isFetchingVideoTracks, setIsFetchingVideoTracks] = useState(false);

    const [videoAlbums, setVideoAlbums] = useState(null);
    const [isFetchingVideoAlbums, setIsFetchingVideoAlbums] = useState(false);

    const getVideoTracks = () => {
        setIsFetchingVideoTracks(true);
        VideoApi.getVideoTracks()
            .then(({ data }) => {
                setVideoTracks(data.data);
            })
            .catch((error) => {
                console.error("error", error);
                notify(
                    error.message ?? "Login failed, check credentials",
                    "error"
                );
            })
            .finally(() => {
                setIsFetchingVideoTracks(false);
            });
    };

    const getVideoAlbums = () => {
        VideoApi.getVideoAlbums()
            .then(({ data }) => {
                setVideoAlbums(data.data);
            })
            .catch((error) => {
                console.error("error", error);
            });
    };

    useEffect(() => {
        getVideoTracks();
        getVideoAlbums();
    }, []);

    return (
        <VideoContext.Provider
            value={{
                videoAlbums,
                setVideoAlbums,
                isFetchingVideoAlbums,
                setIsFetchingVideoAlbums,
                videoTracks,
                setVideoTracks,
                isFetchingVideoTracks,
                setIsFetchingVideoTracks,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};

export { VideoProvider, VideoContext };

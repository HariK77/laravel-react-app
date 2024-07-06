import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { VideoApi } from "@Api/index";
import { NavLink } from "react-router-dom";

const VideosList = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [videoTracks, setVideoTracks] = useState(null);

    const getVideoTracks = () => {
        setIsFetching(true);
        VideoApi.getVideoTracks()
            .then(({ data }) => {
                setVideoTracks(data.data);
            })
            .catch((error) => {
                console.error("error", error);
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    useEffect(() => {
        getVideoTracks();
    }, []);

    return (
        <div className="container my-4">
            <Helmet>
                <title>VideosList</title>
            </Helmet>
            <h2>VideosList</h2>
            <div className="row g-4">
                {videoTracks?.length ? (
                    videoTracks.map((videoTrack, key) => (
                        <div className="col-4" key={key}>
                            <NavLink to={`/watch/${videoTrack.slug}`}>
                                <div className="card">
                                    <img
                                        src={videoTrack.thumbnail}
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {videoTrack.name}
                                        </h5>
                                        <div className="card-text">
                                            <p>{videoTrack.album.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    ))
                ) : (
                    <div className="text-center">No video found</div>
                )}
            </div>
        </div>
    );
};

export default VideosList;

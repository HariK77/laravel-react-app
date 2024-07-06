import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { VideoApi } from "@Api/index";
import VideoPlayer from "@Components/VideoPlayer";

const Watch = () => {
    const { slug } = useParams();

    const [videoTrack, setVideoTrack] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getVideoTrack = () => {
        setIsFetching(true);
        VideoApi.getVideoTrack(slug)
            .then(({ data }) => {
                setVideoTrack(data.data);
            })
            .catch((error) => {
                console.error("error", error);
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    useEffect(() => {
        getVideoTrack();
    }, []);

    return (
        <div className="container">
            <Helmet>
                <title>{videoTrack?.name}</title>
            </Helmet>
            <div className="my-5">
                <h2>{videoTrack?.name}</h2>
                <hr />
                <VideoPlayer
                    videoUrl={
                        videoTrack?.streamUrl
                            ? videoTrack?.streamUrl
                            : videoTrack?.originalSourceUrl
                    }
                />
            </div>
        </div>
    );
};

export default Watch;

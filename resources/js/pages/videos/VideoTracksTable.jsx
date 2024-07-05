import React, { useEffect, useMemo, useState } from "react";
import { VideoApi } from "@Api/index";

const VideoTracksTable = () => {
    const [videoTracks, setVideoTracks] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getVideoTracks = () => {
        setIsFetching(true);
        VideoApi.getVideoTracks()
            .then(({ data }) => {
                setVideoTracks(data.data);
            })
            .catch((error) => {
                console.log("error", error);
            })
            .finally(() => {
                setIsFetching(false);
            });
    };

    useEffect(() => {
        getVideoTracks();
    }, []);

    return (
        <div className="mb-4">
            <div className="d-flex justify-content-between my-2">
                <h3>Video Tracks</h3>
                <div>
                    <input
                        type="text"
                        id="search"
                        className="form-control"
                        name="search"
                        placeholder="search title, album .."
                    />
                </div>
            </div>

            <div className="card">
                <div className="card-body p-0">
                    {isFetching ? (
                        <h3>Loading</h3>
                    ) : (
                        <table className="table table-striped table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Track</th>
                                    <th scope="col">Thumbnail</th>
                                    <th scope="col">Album</th>
                                    <th scope="col">Is Converted</th>
                                    <th scope="col">Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {videoTracks?.length ? (
                                    videoTracks.map((videoTrack, key) => (
                                        <tr key={key}>
                                            <td>{videoTrack.id}</td>
                                            <td>{videoTrack.name}</td>
                                            <td>{videoTrack.thubnail}</td>
                                            <td>{videoTrack.album.name}</td>
                                            <td>
                                                {videoTrack.streamUrl
                                                    ? "Yes"
                                                    : "No"}
                                            </td>
                                            <td>{videoTrack.created_at}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="text-center">
                                        <td colSpan={6}>No Source videos</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoTracksTable;

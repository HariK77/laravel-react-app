import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { VideoContext } from "@Context/VideoContext";
import Modal from "@Components/Modal";

const VideoTracksTable = () => {
    const { videoTracks, isFetchingVideoTracks } = useContext(VideoContext);

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-between my-2">
                <h3>Video Tracks</h3>
                {/* <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                >
                    Launch demo modal
                </button>
                <Modal /> */}
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
                    {isFetchingVideoTracks ? (
                        <h3>Loading</h3>
                    ) : (
                        <table className="table table-striped table-hover mb-0">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Track Name</th>
                                    <th scope="col">Thumbnail</th>
                                    <th scope="col">Album</th>
                                    <th scope="col">Is Converted</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {videoTracks?.length ? (
                                    videoTracks.map((videoTrack, key) => (
                                        <tr key={key}>
                                            <td>{videoTrack.id}</td>
                                            <td>{videoTrack.name}</td>
                                            <td>
                                                <img
                                                    src={videoTrack.thumbnail}
                                                    className="img-fluid rounded me-2"
                                                    alt="..."
                                                    width={40}
                                                    height={40}
                                                ></img>
                                            </td>
                                            <td>{videoTrack.album.name}</td>
                                            <td>
                                                {videoTrack.streamUrl
                                                    ? "Yes"
                                                    : "No"}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <NavLink
                                                        to={`/watch/${videoTrack.slug}`}
                                                    >
                                                        <i className="bi-eye pe-2"></i>
                                                    </NavLink>
                                                    <i className="bi-pencil pe-2"></i>
                                                    <i className="bi-trash"></i>
                                                </div>
                                            </td>
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

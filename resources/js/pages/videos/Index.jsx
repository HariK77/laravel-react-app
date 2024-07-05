import React from "react";
import { Helmet } from "react-helmet";
import VideoTracksTable from "./VideoTracksTable";
import AddVideoTrack from "./AddVideoTrack";
import AddVideoAlbum from "./AddVideoAlbum";

const SourceVideos = () => {
    return (
        <div className="container">
            <Helmet>
                <title>Videos</title>
            </Helmet>
            <div className="row">
                <div className="col-6">
                    <AddVideoAlbum />
                </div>
                <div className="col-6">
                    <AddVideoTrack />
                </div>
            </div>
            <VideoTracksTable />
        </div>
    );
};

export default SourceVideos;

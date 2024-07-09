import React, { useState, useEffect, createContext } from "react";
import { Helmet } from "react-helmet";
import VideoTracksTable from "./VideoTracksTable";
import AddVideoTrack from "./AddVideoTrack";
import AddVideoAlbum from "./AddVideoAlbum";
import { VideoProvider } from "@Context/VideoContext";

const Videos = () => {
    return (
        <div className="container my-4">
            <Helmet>
                <title>Videos</title>
            </Helmet>
            <VideoProvider>
                <>
                    <div className="row">
                        <div className="col-6">
                            <AddVideoAlbum />
                        </div>
                        <div className="col-6">
                            <AddVideoTrack />
                        </div>
                    </div>
                    <VideoTracksTable />{" "}
                </>
            </VideoProvider>
        </div>
    );
};

export default Videos;

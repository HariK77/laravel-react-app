import React, { useState, useContext, useRef } from "react";
import { useFormik } from "formik";
import { addVideoTrackSchema } from "@Utils/validationSchema";
import { VideoApi } from "@Api/index";
import { notify } from "@Utils/toastMessages";
import { createFormObject } from "@Helpers/common";
import { VideoContext } from "@Context/VideoContext";

const AddVideoTrack = () => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const { videoAlbums, setVideoTracks } = useContext(VideoContext);
    const formRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            video_album_id: "",
            video: null,
            thumbnail: null,
        },
        validationSchema: addVideoTrackSchema,
        onSubmit: function (values) {
            setIsBtnDisabled(true);
            VideoApi.addVideoTrack(createFormObject(values))
                .then(({ data }) => {
                    setVideoTracks((prevState) => [...prevState, data.data]);
                    notify(data?.message);
                    resetForm();
                    formRef.current.reset();
                })
                .catch((error) => {
                    if (error?.errors) {
                        Object.keys(error.errors).forEach((key) => {
                            notify(error.errors[key], "error");
                        });
                    } else {
                        notify(error.message ?? "Validation failed", "error");
                    }
                })
                .finally(() => {
                    setIsBtnDisabled(false);
                });
        },
    });

    return (
        <div className="">
            <h3>Add Video Track</h3>
            <div className="card">
                <div className="card-body p-4">
                    <form
                        method="POST"
                        encType="multipart/form-data"
                        ref={formRef}
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className={
                                    formik.touched.name && formik.errors.name
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                name="name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                placeholder="Enter name"
                            />
                            <div className="invalid-feedback">
                                {formik.errors.name}
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="album" className="form-label">
                                Select Video Album
                            </label>
                            <select
                                id="video_album_id"
                                className={
                                    formik.touched.video_album_id &&
                                    formik.errors.video_album_id
                                        ? "form-select"
                                        : "form-select"
                                }
                                name="video_album_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.video_album_id}
                            >
                                <option>Select album</option>
                                {videoAlbums &&
                                    videoAlbums.map((videoAlbum, index) => (
                                        <option
                                            value={videoAlbum.id}
                                            key={index}
                                        >
                                            {videoAlbum.name}
                                        </option>
                                    ))}
                            </select>
                            <div className="invalid-feedback">
                                {formik.errors.video_album_id}
                            </div>
                        </div>

                        <div className="mb-2">
                            <label htmlFor="video" className="form-label">
                                Video
                            </label>
                            <input
                                type="file"
                                id="video"
                                className={
                                    formik.touched.video && formik.errors.video
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                name="video"
                                onChange={(event) => {
                                    formik.setFieldValue(
                                        "video",
                                        event.target.files[0]
                                    );
                                }}
                                onBlur={formik.handleBlur}
                            />
                            <div className="invalid-feedback">
                                {formik.errors.video}
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="thumbnail" className="form-label">
                                Thumbnail Image
                            </label>
                            <input
                                type="file"
                                id="thumbnail"
                                className={
                                    formik.touched.thumbnail &&
                                    formik.errors.thumbnail
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                name="thumbnail"
                                onChange={(event) => {
                                    formik.setFieldValue(
                                        "thumbnail",
                                        event.target.files[0]
                                    );
                                }}
                                onBlur={formik.handleBlur}
                            />
                            <div className="invalid-feedback">
                                {formik.errors.thumbnail}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary mt-2"
                            disabled={isBtnDisabled}
                        >
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVideoTrack;

import { useContext, useRef, useState } from "react";
import { useFormik } from "formik";
import { addVideoAlbumSchema } from "@Utils/validationSchema";
import { VideoApi } from "@Api/index";
import { notify } from "@Utils/toastMessages";
import { createFormObject } from "@Helpers/common";
import { VideoContext } from "@Context/VideoContext";

const AddVideoAlbum = () => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const { setVideoAlbums } = useContext(VideoContext);
    const formRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            name: "",
            thumbnail: null,
            released_at: "",
        },
        validationSchema: addVideoAlbumSchema,
        onSubmit: (values, { resetForm }) => {
            setIsBtnDisabled(true);
            VideoApi.addVideoAlbum(createFormObject(values))
                .then(({ data }) => {
                    setVideoAlbums((prevState) => [...prevState, data.data]);
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
                        notify("Validation failed", "error");
                    }
                })
                .finally(() => {
                    setIsBtnDisabled(false);
                });
        },
    });

    return (
        <div className="">
            <h3>Add Video Album</h3>
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
                            <label htmlFor="released_at" className="form-label">
                                Release date
                            </label>
                            <input
                                type="text"
                                id="released_at"
                                className={
                                    formik.touched.released_at &&
                                    formik.errors.released_at
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                name="released_at"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.released_at}
                                placeholder="Ex: 2015-10-25"
                            />
                            <div className="invalid-feedback">
                                {formik.errors.released_at}
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
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVideoAlbum;

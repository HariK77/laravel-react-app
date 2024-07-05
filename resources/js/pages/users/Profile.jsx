import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import { profileSchema } from "@Utils/validationSchema";
import { Helmet } from "react-helmet";
import { ProfileApi } from "@Api/index";
import { ProfileContext } from "@Context/profileContext";
import { notify } from "@Utils/toastMessages";
import { createFormObject, getGenders, getLanguages } from "@Helpers/common";

const Profile = () => {
    const { profile, setProfile } = useContext(ProfileContext);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const genders = getGenders();
    const languages = getLanguages();

    const getLanguagesSelected = () => {
        return profile.speakingLanguages.map((language) => {
            return {
                value: language,
                label: language,
            };
        });
    };

    useEffect(() => {
        formik.setFieldValue("name", profile.name);
        formik.setFieldValue("email", profile.email);
        formik.setFieldValue("gender", profile.gender);
        formik.setFieldValue("speaking_languages", [...getLanguagesSelected()]);
    }, [profile]);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            gender: "",
            profile_image: null,
            speaking_languages: [],
        },
        validationSchema: profileSchema,
        onSubmit: function (values) {
            setIsBtnDisabled(true);
            ProfileApi.profileUpdate(
                createFormObject({ ...values, id: profile.id })
            )
                .then(({ data }) => {
                    setProfile((prevState) => ({
                        ...prevState,
                        ...data.data,
                    }));
                    notify(data?.message);
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
        <div className="container">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className="my-4">
                <h2>Welcome {profile.name}</h2>
            </div>
            <div className="card mb-4">
                <div className="card-body p-4">
                    <form method="POST" encType="multipart/form-data">
                        <div className="row">
                            <div className="col-6 mb-4">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className={
                                        formik.touched.name &&
                                        formik.errors.name
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
                            <div className="col-6 mb-4">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={
                                        formik.touched.email &&
                                        formik.errors.email
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    placeholder="Enter email"
                                />
                                <div className="invalid-feedback">
                                    {formik.errors.email}
                                </div>
                            </div>
                            <div className="col-6 mb-4">
                                <label htmlFor="gender" className="form-label">
                                    Gender
                                </label>
                                <div>
                                    {genders.map((gender, index) => (
                                        <div
                                            className="form-check form-check-inline"
                                            key={index + gender}
                                        >
                                            <input
                                                type="radio"
                                                id={gender}
                                                name="gender"
                                                className="form-check-input"
                                                value={gender}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                checked={
                                                    formik.values.gender ===
                                                    gender
                                                }
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={gender}
                                            >
                                                {gender}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {formik.touched.gender &&
                                formik.errors.gender ? (
                                    <div
                                        className="text-danger"
                                        style={{ fontSize: "0.875em" }}
                                    >
                                        {formik.errors.gender}
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-6 mb-4">
                                <div className="row">
                                    <div className="col-8">
                                        <label
                                            htmlFor="profile_image"
                                            className="form-label"
                                        >
                                            Profile Image
                                        </label>
                                        <input
                                            type="file"
                                            id="profile_image"
                                            className={
                                                formik.touched.profile_image &&
                                                formik.errors.profile_image
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            name="profile_image"
                                            onChange={(event) => {
                                                formik.setFieldValue(
                                                    "profile_image",
                                                    event.target.files[0]
                                                );
                                            }}
                                            onBlur={formik.handleBlur}
                                        />
                                        <div className="invalid-feedback">
                                            {formik.errors.profile_image}
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <img
                                            src={profile.profileImage}
                                            alt="current profile image"
                                            className="img-fluid"
                                            width={80}
                                            height={80}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-4 custom-select">
                                <label
                                    htmlFor="speaking_languages"
                                    className="form-label"
                                >
                                    Speaking Languages
                                </label>
                                <Select
                                    options={languages}
                                    isMulti
                                    name="speaking_languages"
                                    className={
                                        formik.touched.speaking_languages &&
                                        formik.errors.speaking_languages
                                            ? "form-control p-0 border-0 is-invalid"
                                            : "form-control p-0 border-0"
                                    }
                                    onChange={(selected) => {
                                        formik.setFieldValue(
                                            "speaking_languages",
                                            selected
                                        );
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.speaking_languages}
                                ></Select>
                                <div className="invalid-feedback">
                                    {formik.errors.speaking_languages}
                                </div>
                            </div>
                            <div className="col-6"></div>
                            <div className="col-3">
                                <button
                                    type="submit"
                                    onClick={formik.handleSubmit}
                                    className="btn btn-primary"
                                    disabled={isBtnDisabled}
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;

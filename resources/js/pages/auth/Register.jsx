import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import Select from "react-select";
import { registrationSchema } from "@Utils/validationSchema";
import { Helmet } from "react-helmet";
import { CommonApi } from "@Api/index";
import { notify } from "@Utils/toastMessages";
import { ProfileContext } from "@Context/profileContext";

const Register = () => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const { profile } = useContext(ProfileContext);
    const navigate = useNavigate();
    const genders = ["Male", "Female", "Others"];
    const languages = [
        { value: "Telugu", label: "Telugu" },
        { value: "Hindi", label: "Hindi" },
        { value: "English", label: "English" },
    ];

    const createFormObject = (values) => {
        const formData = new FormData();

        Object.keys(values).forEach((key) => {
            if (key === "speaking_languages") {
                values[key].forEach((selection) => {
                    formData.append(key + "[]", selection.value);
                });
            } else {
                formData.append(key, values[key]);
            }
        });

        return formData;
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            gender: "",
            profile_image: null,
            speaking_languages: "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: registrationSchema,
        onSubmit: function (values) {
            setIsBtnDisabled(true);
            CommonApi.register(createFormObject(values))
                .then(({ data }) => {
                    notify("Registration successful, Login to continue");
                    navigate("/login");
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

    useEffect(() => {
        if (profile.isLoggedIn) {
            navigate("/");
        }
    }, [profile]);

    return (
        <div className="container">
            <Helmet>
                <title>Register</title>
            </Helmet>
            <h1 className="text-center mb-3">Register</h1>
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card p-3">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label
                                        htmlFor="name"
                                        className="form-label"
                                    >
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
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
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
                                <div className="mb-3">
                                    <label
                                        htmlFor="gender"
                                        className="form-label"
                                    >
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
                                                    onChange={
                                                        formik.handleChange
                                                    }
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
                                <div className="mb-3">
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
                                <div className="mb-3">
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
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className={
                                            formik.touched.password &&
                                            formik.errors.password
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        placeholder="Enter password"
                                    />
                                    <div className="invalid-feedback">
                                        {formik.errors.password}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password_confirmation"
                                        className={
                                            formik.touched
                                                .password_confirmation &&
                                            formik.errors.password_confirmation
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="password_confirmation"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={
                                            formik.values.password_confirmation
                                        }
                                        placeholder="Enter password confirmation"
                                    />
                                    <div className="invalid-feedback">
                                        {formik.errors.password_confirmation}
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    onClick={formik.handleSubmit}
                                    className="btn btn-primary"
                                    disabled={isBtnDisabled}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="my-4">
                        <p>
                            Already have an account? Login{" "}
                            <NavLink to="/login">here</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;

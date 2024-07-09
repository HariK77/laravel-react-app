import { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
import { AuthApi } from "@Api/index";
import { ProfileContext } from "@Context/ProfileContext";
import { setCookie } from "@Helpers/cookie";
import { notify } from "@Utils/toastMessages";

const Login = () => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const { profile, setProfile } = useContext(ProfileContext);
    const navigate = useNavigate();
    const cookieName = import.meta.env.VITE_COOKIE_NAME;

    const validationRules = Yup.object().shape({
        email: Yup.string().email().label("Email").required(),
        password: Yup.string().label("Pasword").required(),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationRules,
        onSubmit: function (values) {
            setIsBtnDisabled(true);
            AuthApi.login(values)
                .then(({ data }) => {
                    handleAuth(data);
                })
                .catch((error) => {
                    notify(
                        error.message ?? "Login failed, check credentials",
                        "error"
                    );
                })
                .finally(() => {
                    setIsBtnDisabled(false);
                });
        },
    });

    const handleAuth = (response) => {
        setCookie(cookieName, response.data.token);
        setProfile((prevState) => ({
            ...prevState,
            isLoggedIn: true,
            ...response.data.user,
        }));
        navigate("/profile");
    };

    useEffect(() => {
        if (profile.isLoggedIn) {
            navigate("/");
        }
    }, [profile]);

    return (
        <div className="container my-4">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <h1 className="text-center mb-3">Login</h1>
            <div className="row">
                <div className="col-6 offset-3">
                    <div className="card p-3">
                        <div className="card-body">
                            <form method="POST" onSubmit={formik.handleSubmit}>
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
                                <button
                                    type="submit"
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
                            New to site? Register{" "}
                            <NavLink to="/register">here</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;

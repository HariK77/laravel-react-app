import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProfileContext, authBaseObject } from "@Context/profileContext";
import { BaseApi } from "@Api/index";
import { deleteCookie } from "@Helpers/cookie";

const Header = () => {
    const appName = import.meta.env.VITE_APP_NAME;
    const cookieName = import.meta.env.VITE_COOKIE_NAME;
    const navigate = useNavigate();
    const { profile, setProfile } = useContext(ProfileContext);

    const handleLogout = () => {
        BaseApi.logout()
            .then(({ data }) => {
                deleteCookie(cookieName);
                setProfile((prevState) => ({
                    ...authBaseObject,
                }));
                navigate("/login");
            })
            .catch((error) => {
                console.error("Logout Error", error);
            });
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    {appName}
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#dropdown"
                    aria-controls="dropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="dropdown">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">
                                About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {profile.isLoggedIn ? (
                            <li className="nav-item dropdown">
                                <NavLink
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={profile.profileImage}
                                        className="img-fluid rounded me-2"
                                        alt="..."
                                        width={25}
                                        height={25}
                                    ></img>
                                    {profile.name}
                                </NavLink>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <NavLink
                                            className="dropdown-item"
                                            to="/profile"
                                        >
                                            Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            onClick={handleLogout}
                                        >
                                            logout
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;

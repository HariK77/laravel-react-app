import { ProfileApi } from "@Api/index";
import { getCookie } from "@Helpers/cookie";
import { createContext, useEffect, useState } from "react";

const ProfileContext = createContext();

const Guest = {
    id: "",
    name: "",
    email: "",
    gender: "",
    profileImage: "",
    speakingLanguages: [],
    isLoggedIn: false,
};

const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(Guest);
    const cookieName = import.meta.env.VITE_COOKIE_NAME;

    useEffect(() => {
        if (getCookie(cookieName)) {
            ProfileApi.getAuthenticatedUser()
                .then(({ data }) => {
                    setProfile((prevState) => ({
                        ...prevState,
                        isLoggedIn: true,
                        ...data.data,
                    }));
                })
                .catch((error) => {
                    console.error("error", error);
                });
        }
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export { ProfileProvider, ProfileContext, Guest };

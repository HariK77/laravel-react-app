import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "@Helpers/cookie";
import Header from "./Header";
import Footer from "./Footer";

const ProtectedLayout = () => {
    const cookieName = import.meta.env.VITE_COOKIE_NAME;
    if (!getCookie(cookieName)) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default ProtectedLayout;

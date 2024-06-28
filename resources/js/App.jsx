import { BrowserRouter, Routes, Route } from "react-router-dom";

import BaseLayout from "@Components/BaseLayout";
import ProtectedLayout from "@Components/ProtectedLayout";
import Home from "@Pages/Home";
import Contact from "@Pages/Contact";
import NotFound from "@Pages/NotFound";
import Login from "@Pages/auth/Login";
import Register from "@Pages/auth/Register";
import About from "@Pages/About";
import Profile from "@Pages/users/Profile";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/profile" element={<ProtectedLayout />}>
                    <Route index element={<Profile />} />
                </Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

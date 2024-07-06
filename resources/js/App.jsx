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
import Videos from "@Pages/videos/Index";
import Watch from "@Pages/Watch";
import VideosList from "@Pages/VideoList";

const App = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<BaseLayout />}>
                    <Route path="" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/videos" element={<VideosList />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/watch/:slug">
                        <Route index element={<Watch />} />
                    </Route>
                </Route>
                <Route path="/" element={<ProtectedLayout />}>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/videos/manage" element={<Videos />} />
                </Route>
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

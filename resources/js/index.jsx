import ReactDOM from "react-dom/client";
import App from "./App";
import RootProvider from "@Context/rootProvider";
import { ToastContainer } from "react-toastify";
import "bootstrap";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("app")).render(
    <RootProvider>
        <App />
        <ToastContainer theme="dark" autoClose={2000} />
    </RootProvider>
);

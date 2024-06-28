import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFound = () => {
    return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <div className="my-5">
                <h2>404</h2>
                <p>page not found</p>
                <Link className="btn btn-primary" to="/">
                    Go To Home Page
                </Link>
            </div>
        </div>
    );
};

export default NotFound;

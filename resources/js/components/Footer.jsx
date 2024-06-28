const Footer = () => {
    const appName = import.meta.env.VITE_APP_NAME;
    return (
        <footer className="footer mt-auto py-3 bg-body-tertiary">
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a
                            href="/"
                            className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1"
                        >
                            <svg className="bi" width="30" height="24">
                                <use xlinkHref="#bootstrap"></use>
                            </svg>
                        </a>
                        <span className="mb-3 mb-md-0 text-body-secondary">
                            © {new Date().getFullYear()} {appName}, Inc
                        </span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3">
                            <a className="text-body-secondary" href="#">
                                <i className="bi-twitter"></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="text-body-secondary" href="#">
                                <i className="bi-instagram"></i>
                            </a>
                        </li>
                        <li className="ms-3">
                            <a className="text-body-secondary" href="#">
                                <i className="bi-facebook"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

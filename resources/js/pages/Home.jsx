import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <div className="container">
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className="my-5">
                <h2>Home</h2>
            </div>
        </div>
    );
};

export default Home;

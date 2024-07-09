import { ProfileProvider } from "./ProfileContext";

const RootProvider = ({ children }) => {
    return <ProfileProvider>{children}</ProfileProvider>;
};

export default RootProvider;

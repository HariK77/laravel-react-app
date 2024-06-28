import { ProfileProvider } from './profileContext';

const RootProvider = ({ children }) => {
    return (
        <ProfileProvider>
            {children}
        </ProfileProvider>
    );
};

export default RootProvider;

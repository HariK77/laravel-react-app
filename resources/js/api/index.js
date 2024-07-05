import { default as Base } from '@Api/AuthApi';
import { default as Profile } from '@Api/ProfileApi';
import { default as Video } from '@Api/VideoApi';

const AuthApi = new Base();
const ProfileApi = new Profile();
const VideoApi = new Video();

export {
    AuthApi,
    ProfileApi,
    VideoApi
};

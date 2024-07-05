import ApiCore from '@Api/core';

const videoAlbumsUrl = '/videos/albums';
const videoTracksUrl = '/videos/tracks';

export default class VideoApi extends ApiCore {

    addVideoAlbum(payload) {
        return this.post(videoAlbumsUrl, payload);
    }

    getVideoAlbums() {
        return this.get(videoAlbumsUrl);
    }

    deleteVideoAlbum(payload) {
        return this.delete(videoAlbumsUrl, payload);
    }

    addVideoTrack(payload) {
        return this.post(videoTracksUrl, payload);
    }

    getVideoTracks() {
        return this.get(videoTracksUrl);
    }

    deleteVideoTrack(payload) {
        return this.delete(videoTracksUrl, payload);
    }
}

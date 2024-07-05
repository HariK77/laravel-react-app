import ApiCore from '@Api/core';

export default class ProfileApi extends ApiCore {

    getAuthenticatedUser() {
        return this.get('/profile');
    }

    profileUpdate(payload) {
        return this.post('/profile', payload);
    }
}

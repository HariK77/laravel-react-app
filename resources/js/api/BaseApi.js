import ApiCore from '@Api/core';

export default class BaseApi extends ApiCore {

    register(payload) {
        return this.post('/register', payload);
    }

    login(payload) {
        return this.post('/login', payload);
    }

    logout() {
        return this.post('/logout');
    }

    getAuthenticatedUser() {
        return this.get('/profile');
    }

    profileUpdate(payload) {
        return this.post('/profile', payload);
    }
}

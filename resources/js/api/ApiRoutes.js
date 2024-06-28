import ApiBase from '@Api/core/ApiBase';

export default class ApiRoutes extends ApiBase {

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

import ApiCore from '@Api/core';

export default class AuthAii extends ApiCore {

    register(payload) {
        return this.post('/register', payload);
    }

    login(payload) {
        return this.post('/login', payload);
    }

    logout() {
        return this.post('/logout');
    }
}

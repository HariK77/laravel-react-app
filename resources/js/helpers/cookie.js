const domain = import.meta.env.VITE_SESSION_DOMAIN;
const tokenExpire = import.meta.env.VITE_SANCTUM_TOKEN_EXPIRE;

export const setCookie = (name, value, minutes = 43200) => {
    let expires = '';
    const date = new Date();
    if (minutes) {
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    } else {
        date.setTime(date.getTime() + (Number(tokenExpire) * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = `${name}=${value || ''}${expires};domain=${domain};path=/;SameSite=Lax;`;
};

export const getCookie = (name) => {
    let nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
};

export const deleteCookie = (name) => {
    if (getCookie(name)) {
        const date = new Date();
        document.cookie = `${name}=${''}${date.toUTCString()};domain=${domain};path=/;Max-Age=-99999999;`;
    }
};

import { getCookie } from "./cookie";

const cookieName = import.meta.env.VITE_COOKIE_NAME;

export const getHeaders = () => {
    const token = getCookie(cookieName);
    const headers = {
        Accept: 'application/json',
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};

export const camelToSnake = (string) => {
    return string
        .replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}

export const snakeToCamel = (string) => {
    return string.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    );
}

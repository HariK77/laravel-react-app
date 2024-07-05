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

export const createFormObject = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key])) {
            data[key].forEach((selection) => {
                formData.append(key + "[]", selection.value);
            });
        } else {
            if (data[key]) {
                formData.append(key, data[key]);
            }
        }
    });

    return formData;
};

export const getGenders = () => {
    return [
        "Male",
        "Female",
        "Others"
    ];
}

export const getLanguages = () => {
    return [
        { value: "Telugu", label: "Telugu" },
        { value: "Hindi", label: "Hindi" },
        { value: "English", label: "English" },
    ]
}

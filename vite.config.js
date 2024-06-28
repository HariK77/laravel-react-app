import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react({
            refresh: true,
        }),
        laravel({
            input: ['resources/sass/app.scss', 'resources/js/index.jsx'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "@Pages": resolve(__dirname, "./resources/js/pages"),
            "@Api": resolve(__dirname, "./resources/js/api"),
            "@Components": resolve(__dirname, "./resources/js/components"),
            "@Utils": resolve(__dirname, "./resources/js/utils"),
            "@Helpers": resolve(__dirname, "./resources/js/helpers"),
            "@Context": resolve(__dirname, "./resources/js/context"),
        }
    }
});

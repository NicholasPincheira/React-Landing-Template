import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/js/**/*.{js,ts,jsx,tsx}', // 🔹 Agregado para compatibilidad con TypeScript y otros archivos JS
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                serif: ['Cormorant Garamond', 'serif'], // 🔹 Agregado
                montserrat: ['Montserrat', 'sans-serif'], // 🔹 Agregado
            },
            colors: {
                cream: '#FDF5E6', // 🔹 Agregado
                'warm-gray': { // 🔹 Agregado (manteniendo los colores existentes)
                    50: '#FAFAF9',
                    100: '#F5F5F4',
                    200: '#E7E5E4',
                    300: '#D6D3D1',
                    400: '#A8A29E',
                    500: '#78716C',
                    600: '#57534E',
                    700: '#44403C',
                    800: '#292524',
                    900: '#1C1917',
                },
            },
        },
    },

    plugins: [forms],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                active: '#5932EA',
                'hover-active': '#5932ea4d'
            },
            inset: {
                navbar: 'var(--navbar-width)'
            },
            width: {
                navbar: 'var(--navbar-width)',
                'routes-panel': 'var(--routes-panel-width)'
            },
            height: {
                'substations-panel': 'var(--substations-panel-height)'
            }
        }
    },
    plugins: []
};

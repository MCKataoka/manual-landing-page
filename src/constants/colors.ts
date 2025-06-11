export const colors = {
    primary: {
        red: '#7E0707',
        teal: '#0B3B3C',
        green: '#2c5530',
    },

    background: {
        main: 'white',
        footer: '#E8EFE9',
        mobileHero: '#a1b89e',
        light: '#f8f9fa',
    },

    text: {
        primary: '#0B3B3C',
        secondary: '#666',
        muted: '#6D8A83',
        dark: '#333',
        white: 'white',
    },

    border: {
        light: '#e9ecef',
        medium: '#BDCDC5',
    },

    hover: {
        red: '#8b1f30',
        teal: '#083031',
        green: '#1a3319',
        redLight: '#5a0505',
    },

    decorative: {
        numbers: 'rgba(168, 197, 160, 0.15)',
        shadow: 'rgba(44, 85, 48, 0.15)',
        ghostHover: 'rgba(44, 85, 48, 0.1)',
        linkHover: 'rgba(44, 85, 48, 0.05)',
        selected: '#f8f9fa',
    },

    transparent: 'transparent',
} as const;

export const { primary, background, text, border, hover, decorative } = colors;
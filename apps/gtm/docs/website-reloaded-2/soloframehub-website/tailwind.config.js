/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './src/**/*.{html,js}',
    './assets/**/*.html'
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif-custom': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },

      colors: {
        // Your custom brand colors
        background: {
          DEFAULT: '#020408',
          secondary: '#09090b',
          tertiary: '#18181b'
        }
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      },

      animation: {
        'float': 'float-subtle 6s ease-in-out infinite',
        'gradient': 'gradient-xy 6s ease infinite'
      },

      keyframes: {
        'float-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        }
      }
    }
  },

  plugins: []
};

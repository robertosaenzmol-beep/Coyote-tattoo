/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        obsidian:  '#000000',
        canvas:    '#ffffff',
        plaster:   '#f2f2f2',
        ash:       '#9b9b9b',
      },
      fontFamily: {
        wordmark: ['"Cormorant Garamond"', 'Georgia', 'Times New Roman', 'serif'],
        serif:    ['"Georgia"', '"Times New Roman"', 'Times', 'serif'],
        sans:     ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        caption: ['10px', { lineHeight: '1', letterSpacing: '-0.1px' }],
        sm:      ['14px', { lineHeight: '1.2', letterSpacing: '-0.14px' }],
      },
      borderRadius: {
        tag:    '4px',
        card:   '10px',
        pill:   '48px',
      },
      boxShadow: {
        pill: 'rgba(0, 0, 0, 0.1) 0px 4px 4px 0px',
      },
      spacing: {
        4:  '4px',
        5:  '5px',
        6:  '6px',
        7:  '7px',
        8:  '8px',
        9:  '9px',
        10: '10px',
        12: '12px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        46: '46px',
        68: '68px',
      },
      maxWidth: {
        page: '1440px',
      },
    },
  },
  plugins: [],
};

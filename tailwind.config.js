module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')
,require('@tailwindcss/forms')({
  strategy: 'class'
})
,require('@tailwindcss/line-clamp')
,require('@tailwindcss/typography')
],
};

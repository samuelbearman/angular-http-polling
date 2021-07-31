module.exports = {
  content: ['./dist/*.{html,js}'],

  defaultExtractor: (content) => {    

    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

    return broadMatches.concat(innerMatches);
  },

  css: ['./dist/*.css'],
  options: {
    safelist: [], // add if any special exceptions
  },
  output: './dist/',
};
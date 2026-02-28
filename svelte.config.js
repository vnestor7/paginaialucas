import adapter from '@sveltejs/adapter-static';

const repoName = 'paginaialucas';

const config = {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: `/${repoName}`
    },
    prerender: {
      entries: ['*']
    }
  }
};

export default config;
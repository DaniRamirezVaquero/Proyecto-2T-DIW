// vite.config.js
export default {
    build: {
      rollupOptions: {
        plugins: [
          {
            name: 'fonts',
            resolveId(source) {
              if (source.endsWith('.woff') || source.endsWith('.woff2') || source.endsWith('.ttf') || source.endsWith('.otf')) {
                return source;
              }
            },
            load(id) {
              if (id.endsWith('.woff') || id.endsWith('.woff2') || id.endsWith('.ttf') || id.endsWith('.otf')) {
                return `export default new URL('${id}', import.meta.url).href;`;
              }
            },
          },
        ],
      },
    },
  };
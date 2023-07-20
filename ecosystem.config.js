const ENV_CONFIG = {
  env_test: {
    ENV: 'test',
  },
  env_pro: {
    ENV: 'pro',
  },
  env_dev: {
    ENV: 'dev',
  },
};

module.exports = {
  apps: [
    {
      ...ENV_CONFIG,
      name: 'openai',
      script: './dist/apps/openai/main.js',
    },
    {
      ...ENV_CONFIG,
      name: 'translation',
      script: './dist/apps/translation/main.js',
    },
    {
      ...ENV_CONFIG,
      name: 'dictionary',
      script: './dist/apps/dictionary/main.js',
    },
    {
      ...ENV_CONFIG,
      name: 'third-party-server',
      script: './dist/apps/third-party-server/main.js',
    },
  ],
};

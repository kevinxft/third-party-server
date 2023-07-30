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
      name: 'all-in-one',
      script: './dist/apps/all-in-one/main.js',
    },
    {
      ...ENV_CONFIG,
      name: 'admin',
      script: './dist/apps/admin/main.js',
    },
  ],
};

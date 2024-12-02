const port = (() => {
  if (process.env.APP_NAME === 'platform') return 3500;
  if (process.env.APP_NAME === 'admin') return 3501;
})();

module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      watch: false,
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      exec_mode: 'fork',
      instances: 1,
      increment_var: 'PORT',
      listen_timeout: 100000,
      kill_timeout: 10000,
      env: {
        PORT: port,
      },
    },
  ],
};

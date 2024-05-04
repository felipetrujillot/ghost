module.exports = {
  apps: [
    {
      name: 'ghost',
      port: '4000',
      instances: 1,
      exec_mode: 'fork',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
}

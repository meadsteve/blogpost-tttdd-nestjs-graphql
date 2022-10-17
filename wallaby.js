module.exports = function (wallaby) {
  return {
    autoDetect: true,

    files: ['src/**/*.ts', { pattern: 'src/**/*.spec.ts', ignore: true }],

    tests: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],

    env: {
      type: 'node',
    },
  };
};

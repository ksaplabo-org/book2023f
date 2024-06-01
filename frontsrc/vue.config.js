module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'assets',
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: true,
  css: {
    modules: false,
    extract: true,
    sourceMap: true,
  },
  lintOnSave: true,
    pages: {
        index: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          title: 'Sign in',
        },
        signin: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'signin',
          title: 'Sign in',
        },
        signup: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'signup',
          title: 'Sign up',
        },
        signupconfirm: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'signupconfirm',
          title: 'Sign up Confirm',
        },
        signout: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'signout',
          title: 'Sign out',
        },
        menu: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'menu',
          title: 'Menu',
        },
        rentalbook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'rentalbook',
          title: 'Rental Book',
        },
        maintebook: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'maintebook',
          title: 'Maintenance Book',
        },
        sorry: {
          entry: 'src/main.js',
          template: 'public/pages/index.html',
          filename: 'sorry',
          title: 'Sorry',
        },
    },
};

module.exports = {
  
  head: {
    title: '편의점1+1',
    meta: [{
      charset: 'utf-8',
    }, {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
    }, {
      'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
    }, {
      hid: 'desc', name: 'description', content: '편의점 1+1 상품정보',
    }, {
      hid: 'ogtitle', name: 'og:title', content: '편의점 1+1',
    }, {
      hid: 'ogdesc', name: 'og:description', content: '편의점 1+1 상품정보',
    }, {
      hid: 'ogtype', property: 'og:type', content: 'website',
    }, 
  ]
    
  },
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxyHeaders: false
  },
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',

    // With options
    //['@nuxtjs/vuetify', { /* module options */ }]
  ],
  vuetify: {},
  plugins: ['~plugins/filters.js'],
  transpile: ['vuetify/lib'],
  
}

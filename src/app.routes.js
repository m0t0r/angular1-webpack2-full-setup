const appRoutes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  'ngInject';

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('root', {
      url: '/',
      component:'app'
    })
    .state('root.lazy1', {
      url: 'lazy-page-1',
      views: {
        'main': {
          component: 'lazyPage1Component'
        }
      },
      resolve: {
        lazyLoad: ($ocLazyLoad) => {
          'ngInject';
          return System.import('./page/lazy-page-1/lazy-page-1.module.js')
            .then(module => $ocLazyLoad.load({name: module.default}));
        }
      }
    })
    .state('root.lazy2', {
      url: 'lazy-page-2',
      views: {
        'main': {
          component: 'lazyPage2Component'
        }
      },
      resolve: {
        lazyLoad: ($ocLazyLoad) => {
          'ngInject';
          return System.import('./page/lazy-page-2/lazy-page-2.module.js')
            .then(module => $ocLazyLoad.load({name: module.default}));
        }
      }
    });
};

export default appRoutes;


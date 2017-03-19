import AppComponent from './app.component';

import appRoutes from './app.routes';

const appModule = angular
  .module('app', [
    'ngAria',
    'ngAnimate',
    'ui.router',
    'oc.lazyLoad'
  ])
  .config(appRoutes)
  .component('app', AppComponent);

angular
  .element(document)
  .ready(() => {
    const body = document.getElementsByTagName('body')[0];
    angular.bootstrap(body, [appModule.name]);
  });

export default appModule.name;

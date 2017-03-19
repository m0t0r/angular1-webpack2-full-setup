import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import uiRouter from 'angular-ui-router';
import ocLazyLoad from 'oclazyload';

require('angular-material/angular-material.css');

import AppComponent from './app.component';

import appRoutes from './app.routes';

const appModule = angular
  .module('app', [
    ngAria,
    ngAnimate,
    uiRouter,
    ocLazyLoad
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

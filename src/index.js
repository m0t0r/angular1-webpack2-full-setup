import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import uiRouter from 'angular-ui-router';

require('angular-material/angular-material.css');

import AppComponent from './app.component';

const appModule = angular
  .module('app', [ngAria, ngAnimate, uiRouter])
  .component('app', AppComponent);

angular
  .element(document)
  .ready(() => {
    const body = document.getElementsByTagName('body')[0];
    angular.bootstrap(body, [appModule.name]);
  });
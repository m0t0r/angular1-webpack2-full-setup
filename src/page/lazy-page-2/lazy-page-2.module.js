import angular from 'angular';

import LazyPage2Component from './lazy-page-2-component/lazy-page-2-component.component';

const lazyPage2Module = angular
  .module('lazyPage2', [])
  .component('lazyPage2Component', LazyPage2Component);

export default lazyPage2Module.name;
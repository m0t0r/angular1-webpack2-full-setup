import angular from 'angular';

import LazyPage1Component from './lazy-page-1-component/lazy-page-1-component.component';

const lazyPage1Module = angular
  .module('lazyPage1', [])
  .component('lazyPage1Component', LazyPage1Component);

export default lazyPage1Module.name;
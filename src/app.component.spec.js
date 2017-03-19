//import appModule from './index';

describe('App component', () => {
  let $componentController;

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(($injector) => {
    $componentController = $injector.get('$componentController');
  }));

  it('should be able to set default options', () => {
    let component = $componentController('app', null, {});

    expect(component).toBeDefined();
  });
});
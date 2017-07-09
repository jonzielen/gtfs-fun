class ComponentController {
  constructor($scope) {
    this.one = 'ONE';
    console.log('in the app: ', this.title);
  }
}

// dependency injection
ComponentController.$inject = ['$scope'];

// define component
const mta = {
  bindings: {
    title: '='
  },
  controller: ComponentController,
  templateUrl: '/app/src/mta/components/mta.html'
};

// export
export default mta;

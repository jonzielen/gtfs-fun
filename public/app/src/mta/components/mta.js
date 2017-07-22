class ComponentController {
  constructor($scope, dataFactory) {
    this.one = 'ONE';
    this.name = this.title;
    this.dataFactory = dataFactory;
  }

  $onInit() {
    this.dataFactory.getMtaData().then((response) => {
    //console.log(response);
    this.mtaData = response;
    });
  }
}

// dependency injection
ComponentController.$inject = ['$scope', 'dataFactory'];

// define component
const mta = {
  bindings: {
    title: '@'
  },
  controller: ComponentController,
  templateUrl: '/app/src/mta/components/mta.html'
};

// export
export default mta;

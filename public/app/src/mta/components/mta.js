class ComponentController {
  constructor($scope, dataFactory) {
    this.dataFactory = dataFactory;
  }

  $onInit() {
    this.dataFactory.getMtaData().then((response) => {
      this.mtaData = response.stopData;
    });
  }
}

// dependency injection
ComponentController.$inject = ['$scope', 'dataFactory'];

// define component
const mta = {
  bindings: {},
  controller: ComponentController,
  templateUrl: '/app/src/mta/components/mta.html'
};

// export
export default mta;

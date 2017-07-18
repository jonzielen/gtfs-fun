class ComponentController {
  constructor($scope, dataFactory) {
    this.one = 'ONE';
    this.name = this.title;
    //this.dataFactory = dataFactory;
    //console.log('in the app 2');

    // this.mtaData = {
    //   one: 'one',
    //   two: 'two',
    //   three: 'three'
    // };

    //get album images
    this.mtaData = dataFactory.getMtaData()
      .then(response => {
        console.log(response.stopData);
        return response.stopData;
      })
      .catch(err => {
        // error settings
        console.log('error!');
        return 'ERROR';
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

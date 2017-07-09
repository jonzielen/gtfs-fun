class ComponentController {
   constructor($scope, dataFactory, $timeout) {
     console.log('in the app');
   }
}

// dependency injection
ComponentController.$inject = ['$scope', 'dataFactory', '$timeout'];

// define component
const mta = {
    bindings: {},
    controller: ComponentController,
    templateUrl: '/app/src/mta/components/mta.html'
};

// export
export default mta;

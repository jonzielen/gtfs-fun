// controller constructor
class MainController {
  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    console.log('made it?');
  }
}

// dependency injection
MainController.$inject = ['$scope', '$http'];

// export
export default MainController;

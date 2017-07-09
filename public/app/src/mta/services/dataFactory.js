// Service factory
function dataFactory($http) {

  // get mta data
  function getMtaData(data) {

    return $http.get(url, {cache: false})
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.error('Failed to get mta feed', err.status, err.data);
        return null;
      });
  }

  // return all available methods
  return {
    getMtaData
  };
};

// Dependency injection
dataFactory.$inject = ['$http'];

// Default export
export default dataFactory;

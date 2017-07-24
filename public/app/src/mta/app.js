import angular from 'angular';
import mta from './components/mta';
//import MainController from './controller.main';
import removeSlash from './filters/removeSlash';
import dataFactory from './services/dataFactory';

angular.module('mtaApp', [])
  .component('mta', mta)
  .filter('removeSlash', removeSlash)
  .factory('dataFactory', dataFactory);

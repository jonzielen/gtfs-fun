import angular from 'angular';
import dataFactory from './services/dataFactory';

angular.module('mtaApp', [])
  .factory('dataFactory', dataFactory);

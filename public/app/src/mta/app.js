import angular from 'angular';
import mta from './components/mta';
import MainController from './controller.main';
import dataFactory from './services/dataFactory';

angular.module('mtaApp', [])
  .component('mta', mta)
  .factory('dataFactory', dataFactory);

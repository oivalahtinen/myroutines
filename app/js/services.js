
var services = angular.module('services',["ngResource"]);

services.factory("Service", function($resource) {
    return {
      //products: $resource('/api/products'),
      //prices: $resource('/api/prices'),
      //order: $resource('/api/orders/order')
    };
});
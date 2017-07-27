"use strict";

app.controller("ItemViewCtrl", function($scope, $routeParams, ItemStorage, AuthFactory) {
  $scope.items = [];
  console.log($routeParams.itemId);

  ItemStorage.getSingleItem($routeParams.itemId)
  .then(function(itemData) {
    console.log("todoItem", itemData);
    $scope.item = itemData;
  });
});

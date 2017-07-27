"use strict";

app.controller("ItemEditCtrl", function($scope, $location, $routeParams, ItemStorage){
  $scope.title = "Edit Item";
  $scope.btnText = "Update";
  $scope.todo = {};

  ItemStorage.getSingleItem($routeParams.itemId)
  .then( (response) => {
      $scope.todo = response;
  });

  $scope.saveTodo = function(){
    ItemStorage.updateItem($routeParams.itemId, $scope.todo)
    .then( (response) => {
      console.log(response);
      $location.url("/items/list");
    });
  };
});

"use strict";

app.controller("ItemListCtrl", function($scope, ItemStorage, SearchTermData, AuthFactory) {
  console.log("Hello, Item list ctrl", SearchTermData);
  $scope.searchText = SearchTermData;

  ItemStorage.getItemList(AuthFactory.getUser())
  .then(function(itemCollection) {
    $scope.items = itemCollection;
  });

  $scope.itemDelete = function(itemId){
    console.log("itemId for delete", itemId);
    ItemStorage.deleteItem(itemId)
    .then(function(response){
      ItemStorage.getItemList().then(function(itemCollection){
        $scope.items = itemCollection;
      });
    });
  };
});

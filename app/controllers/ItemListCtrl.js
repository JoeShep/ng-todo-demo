"use strict";

app.controller("ItemListCtrl", function($scope, ItemStorage, SearchTermData, AuthFactory) {
  console.log("Hello, Item list ctrl", SearchTermData);
  $scope.searchText = SearchTermData;

  ItemStorage.getItemList(AuthFactory.getUser())
  .then( (itemCollection) => {
    console.log("itemCollection", itemCollection);
    if(itemCollection.length > 0) {
      $scope.items = itemCollection;
      console.log("items", itemCollection);
    } else {
      $scope.message = "Looks like you need to add some todo items!";
    }
  });

  // We pass in the whole object from the todo list when the checkbox is selected,
  // abd it will have the updated status of isCompleted already in place
  $scope.updateTodoStatus = (todo) => {
    console.log("updated!", todo);
    ItemStorage.updateItem(todo.id, todo)
    .then( (data) => {
      console.log("isCompleted status updated", data);
    })
    .catch( (err) => {
      console.log("oops, couldn't update status", err );
    });
  };

  $scope.itemDelete = (itemId) => {
    console.log("itemId for delete", itemId);
    ItemStorage.deleteItem(itemId)
    .then(function(response){
      ItemStorage.getItemList().then(function(itemCollection){
        $scope.items = itemCollection;
      });
    });
  };
});

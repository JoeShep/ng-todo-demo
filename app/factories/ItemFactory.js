"use strict";

app.factory("ItemStorage", function(FirebaseURL, $q, $http) {

  let getItemList = function(user) {
    console.log("getItemList called " );
    let items = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}items.json?orderBy="uid"&equalTo="${user}"`)
      .success(function(itemObject) {
        let itemCollection = itemObject;
        Object.keys(itemCollection).forEach(function(key) {
          itemCollection[key].id=key;
          items.push(itemCollection[key]);
        });
        resolve(items);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let getSingleItem = (itemId) => {
    return $q(function(resolve, reject){
      $http.get(`${FirebaseURL}items/${itemId}.json`)
      .success(function(itemObject){
        resolve(itemObject);
      })
      .error(function(error){
        reject(error);
      });
    });
  }

  let postNewItem = function(newItem) {
    return $q(function(resolve, reject) {
      $http.post(`${FirebaseURL}items.json`,
        angular.toJson(newItem))
        // JSON.stringify(newItem))
      .success(function(ObjFromFirebase) {
        resolve(ObjFromFirebase);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let updateItem = function(itemId, editedItem) {
    return $q(function(resolve, reject) {
      $http.patch(`${FirebaseURL}items/${itemId}.json`,
        angular.toJson(editedItem))
        // JSON.stringify(editedItem))
      .success(function(ObjFromFirebase) {
        resolve(ObjFromFirebase);
      })
      .error(function(error) {
        reject(error);
      });
    });
  }

  let deleteItem = function(itemId){
    console.log("delete in factory");
    return $q(function(resolve, reject){
      $http.delete(`${FirebaseURL}items/${itemId}.json`)
      .success(function(objectFromFirebase){
        resolve(objectFromFirebase);
      });
    });
  };

  return {getItemList, getSingleItem, postNewItem, updateItem, deleteItem};
});

"use strict";

app.factory("ItemStorage", function(FirebaseURL, $q, $http) {

  let getItemList = (user) => {
    console.log("getItemList called ", user);
    let items = [];
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseURL}todos.json?orderBy="uid"&equalTo="${user}"`)
      .then( (itemObject) => {
        console.log("items?", itemObject);
        if(itemObject.data) {
          let itemCollection = itemObject.data;
          Object.keys(itemCollection).forEach(function(key) {
            itemCollection[key].id=key;
            items.push(itemCollection[key]);
          });
        }
        resolve(items);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  let getSingleItem = (itemId) => {
    return $q( (resolve, reject) => {
      $http.get(`${FirebaseURL}todos/${itemId}.json`)
      .then( (itemObject) => {
        itemObject.data.id = itemId;
        resolve(itemObject.data);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  let postNewItem = (newItem) => {
    return $q( (resolve, reject) => {
      $http.post(`${FirebaseURL}todos.json`,
        angular.toJson(newItem))
        // JSON.stringify(newItem))
      .then( (ObjFromFirebase) => {
        resolve(ObjFromFirebase);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  let updateItem = (itemId, editedItem) => {
    return $q( (resolve, reject) => {
      $http.patch(`${FirebaseURL}todos/${itemId}.json`,
      angular.toJson(editedItem))
      .then( (ObjFromFirebase) => {
        resolve(ObjFromFirebase);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

  let deleteItem = (itemId) => {
    console.log("delete in factory");
    return $q( (resolve, reject) => {
      $http.delete(`${FirebaseURL}todos/${itemId}.json`)
      .then( (objectFromFirebase) => {
        resolve(objectFromFirebase);
      });
    });
  };

  return {getItemList, getSingleItem, postNewItem, updateItem, deleteItem};
});

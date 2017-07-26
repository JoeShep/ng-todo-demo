"use strict";

var app = angular.module("TodoApp", ["ngRoute"])
.constant("FirebaseURL", "https://ng-todo-demo-4c81b.firebaseio.com/");

let isAuth = (AuthFactory) => new Promise( (resolve, reject) => {
  AuthFactory.isAuthenticated()
  .then( (user) => {
    console.log("user???", user );
    if(user) {
      console.log("Authenticated user. Go ahead");
      resolve();
    } else {
      console.log("Not Authenticated user. Go away");
      reject();
    }
  }); 
});

app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/login.html',
      controller: "LoginCtrl"
    }).
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: "LoginCtrl"
    }).    
    when('/logout', {
      templateUrl: 'partials/login.html',
      controller: "LoginCtrl"
    }).
    when('/items/list', {
      templateUrl: 'partials/item-list.html',
      controller: 'ItemListCtrl',
      resolve: {isAuth}
    }).
    when('/items/new', {
      templateUrl: 'partials/item-form.html',
      controller: 'ItemNewCtrl',
      resolve: {isAuth}
    }).
    when('/items/view/:itemId', {
      templateUrl: 'partials/item-details.html',
      controller: 'ItemViewCtrl',
      resolve: {isAuth}
    }).
    when('/items/view/:itemId/edit', {
      templateUrl: 'partials/item-form.html',
      controller: 'ItemEditCtrl',
      resolve: {isAuth}
    }).
    otherwise('/');
});

app.run( ($location, FBCreds) => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.key,
    authDomain: creds.authDomain
  };
  firebase.initializeApp(authConfig);
});

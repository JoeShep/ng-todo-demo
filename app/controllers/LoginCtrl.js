"use strict";
// reinsert AuthFactory when written
app.controller("LoginCtrl", function($scope, $window, AuthFactory){

  let logout = function() {
    console.log("Logout clicked");
    AuthFactory.logoutUser()
    .then(function(data) {
      console.log("logged out?", data );
      $window.location.url = "#/login";
    }, function(error) {
      // An error happened.
    });
  };

  if(AuthFactory.isAuthenticated())
    logout(); 

	$scope.account = {
		email: "",
		password: ""
	};

	$scope.register = () => {
    console.log("you clicked register");
    AuthFactory.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    })
    .then( (userData) => {
      console.log("newUser", userData );
      $scope.login();
    }, (error) => {
        console.log(`Error creating user: ${error}`);
    });
  };

  $scope.login = () => {
    console.log("you clicked login");
    AuthFactory
      .loginUser($scope.account)
      .then(() => {
        // $scope.isLoggedIn = true;
        // console.log("logged in, really", $scope.isLoggedIn );
        // $scope.$apply();

        $window.location.href = "#/items/list";
      });
  };

	$scope.loginGoogle = () => {
		console.log("you clicked login with Googs");
		AuthFactory.authWithProvider()
		.then(function(result) {
	    var user = result.user.uid;
	    console.log("logged in user fer sure", user);
	    // Load to dos?
	    // $location.path("/");
	    $scope.$apply();
	  }).catch(function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	    // The email of the user's account used.
	    var email = error.email;
	    // The firebase.auth.AuthCredential type that was used.
	    var credential = error.credential;
	    // ...
	  });
	};

});

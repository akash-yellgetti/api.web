const app = angular.module('myApp', []);
// allow DI for use in controllers, unit tests
app
  .constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
    $rootScope._ = window._;
  });

app.controller('myCtrl', function ($scope, _, socket) {
  $scope.user = [];

  $scope.toUser = '';
  $scope.message = '';

  socket.on('userSocketId', (id) => {
    console.log('userSocketId', id);
    socket.id = id
    $scope.userSocketId = id;
  })

  socket.on('users', (users) => {
    console.log('users', users);
    $scope.users = _.reject(_.keys(users), (r) => r === socket.id);
  });

  $scope.selectUser = (user) => {
    $scope.toUser = user;
  }


  $scope.send = () => {
    const data = {
      eventName: 'public-chat-message',
      eventData: {
        message: socket.id + " :- " + $scope.message
      },
    }

    if($scope.toUser) {
      data.eventTo = $scope.toUser;
    }
    socket.emit('send', data);
    $scope.message = '';
  }

  socket.on('public-chat-message', (data) => {
    console.log(data);
    alert(JSON.stringify(data))
  })
  
});


app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    console.log(socket)    
    // socket.on('connect', function(){
    //     socket.emit('authentication', {id: id, userId: userId });
    //     socket.on('authenticated', function() {
    //         // use the socket as usual
    //         console.log('User is authenticated');
    //     });
    // });

    return {
      on: function (eventName, callback) {
        console.log('asdsa')
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
            console.log('asdsa')
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    };
  });
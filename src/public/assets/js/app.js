const app = angular.module("myApp", []);
 // allow DI for use in controllers, unit tests
  app.constant('_', window._)
  // use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
     $rootScope._ = window._;
  });
      app.controller("myCtrl", function ($scope, _) {

        const data = {
          subjects: [
            'English',
            'Hindi',
            'Marathi',
            'Maths',
            'History',
            'Geography',
            'Civis',
            'EVS',
          ],
          classes: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
          ],
          divisions: [
            'A',
           
          ],
          teachers: [
            'Sir 1',
            // 'Sir 2',
            // 'Sir 3',
            // 'Sir 4',
            // 'Sir 5',
            // 'Sir 6',
            // 'Sir 7',
            // 'Sir 8',
            // 'Sir 9',
            // 'Sir 10',

           
          ],

        };

        const combination = [];
        
          for(let ii in data.divisions) {
            const division = data.divisions[ii];
            for(let i in data.classes) {
              const classs = data.classes[i];
            for(let iii in data.teachers) {
              const teacher = data.teachers[iii];
              combination.push({ class: classs, division, teacher });
              // data.teachers.shift();
              // console.log(data.teachers)
            }
          }
        }
        console.log(combination)

        $scope.combination = combination;
        
      });
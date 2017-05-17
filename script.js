var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {

    var self = this;
    self.todos = JSON.parse(localStorage.getItem('dataa'));

    self.save = function(){
      var todo = {
        "id": Math.random(),
        "text": $scope.post,
        "status": "pending"
      }
      //console.log(todo);
      self.todos.push(todo);
    };

    self.changes = function(){
      console.log("hello");
    }
});

app.directive("myDirective", function(){
  return {
    restrict: "EA",
    controller: "dirCtrl",
    controllerAs: "vm",
    //bindToController: true,
    scope: {
      dta:'=',
      ngModel: '='
    },
    templateUrl:'task1.html',
    link: function($scope, element, attrs, ctrl){
      //console.log(element.html);
      //console.log($scope);

      // Two way bindings
      $scope.todos = $scope.dta;
      $scope.selected = $scope.ngModel;
    }
  }
})
app.controller('dirCtrl', function($scope){
  $scope.options = ['pending', 'resolved'];
    $scope.selection = [];

    var self = this;

    self.change = function(todoId, $event){

      var checked = angular.element($event.target).is(":checked");

        var idx = $scope.selection.indexOf(todoId);
        //is currently selected
        if(idx > -1) {
          $scope.selection.splice(idx, 1);
        }
        //is newly selected
        else{
          $scope.selection.push(todoId);
        }

        angular.forEach($scope.todos, function(task, index){
          if(task.id === todoId){
            if(checked){
              // Update the task status
              task.status = "resolved";
            }
            else{
              // Update the task status
              task.status = "pending";
            }
          }
        });
        console.log($scope.todos);

        //LOCAL STORAGE
        localStorage.setItem('dataa', JSON.stringify($scope.todos));
        var random = JSON.parse(localStorage.getItem('dataa'));
    }

    // console.log($scope.todos);
    // localStorage.setItem('data',"fghvjvh");
    // var ran =  localStorage.getItem("data");
    // console.log(ran);

});

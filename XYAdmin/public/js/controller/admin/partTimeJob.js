/**
 * Created by ymc on 11/18/15.
 */

myApp.controller('frameCtrl', function($scope, $http, $location) {
});

myApp.controller('listCtrl', function($scope, $http, $location) {
    $scope.addItem = function(){
        $location.url('/editor?mode=0');
    }
});

myApp.controller('editorCtrl', function($scope, $http, $location, $routeParams) {
    var mode = $routeParams.mode;
    if(mode == 0){
        $scope.publisher = '';
        $scope.area = '';
        $scope.payment = '';
        $scope.count = '';
        $scope.experience = '';
        $scope.degree = '';
        $scope.detail = '';
        $scope.promise = '';
        $scope.address = '';

        $scope.submit = function(){
            $http.post('/api/admin/part-time-job/add.json', {
                userId: 1,
                publisher: $scope.publisher,
                area: $scope.area,
                payment: $scope.payment,
                count: $scope.count,
                experience: $scope.experience,
                degree: $scope.degree,
                detail: $scope.detail,
                promise: $scope.promise,
                address: $scope.address
            }).success(function(resp){
                if(resp.status == 0){
                    $location.url('/');
                }
            });
        }
        $scope.cancel = function(){
            $location.url('/');
        }
    }
    else if(mode == 1){

    }
});

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            controller : 'listCtrl',
            templateUrl : 'admin/part-time-job/list'
        })
        .when('/editor', {
            controller : 'editorCtrl',
            templateUrl : 'admin/part-time-job/editor'
        })
}]);
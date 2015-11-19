/**
 * Created by ymc on 11/18/15.
 */

myApp.controller('frameCtrl', function($scope, $http, $location) {
});

myApp.controller('listCtrl', function($scope, $http, $location) {
    $scope.list = function(){
        $http.get('/api/admin/part-time-job/list.json', {
            params: {
                userId: 1
            }
        }).success(function(resp){
            if(resp.status == 0){
                $scope.items = resp.list;
            }
        });
    }
    $scope.addItem = function(){
        $location.url('/editor?mode=0');
    }
    $scope.editItem = function (id) {
        $location.url('/editor?mode=1&itemId='+id);
    }
    $scope.deleteItem = function (id) {
        $http.post('/api/admin/part-time-job/delete.json', {
            userId: 1,
            itemId: id
        }).success(function(resp){
            if(resp.status == 0){
                $scope.list();
            }
        });
    }

    /* Play */
    $scope.list();
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
        var itemId = $routeParams.itemId;

        $scope.getItem = function(){
            $http.get('/api/admin/part-time-job/item.json', {
                params: {
                    userId: 1,
                    itemId: itemId
                }
            }).success(function(resp){
                if(resp.status == 0){
                    $scope.publisher = resp.item.publisher;
                    $scope.area = resp.item.area;
                    $scope.payment = resp.item.payment;
                    $scope.count = resp.item.count;
                    $scope.experience = resp.item.experience;
                    $scope.degree = resp.item.degree;
                    $scope.detail = resp.item.detail;
                    $scope.promise = resp.item.promise;
                    $scope.address = resp.item.address;
                }
            });
        }
        $scope.submit = function(){
            $http.post('/api/admin/part-time-job/update.json', {
                userId: 1,
                itemId: itemId,
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

        /* Play */
        $scope.getItem();
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
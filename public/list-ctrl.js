angular.module('ContactListApp').controller('ListController', function ($scope, $http){
    
    function refresh(){
        $http.get('/api/v1/contacts').then(function (response){
            $scope.contacts = response.data;
        });   
    }
    
    $scope.addContact = function(){
      $http.post('/api/v1/contacts', $scope.newContact).then(function (){
        refresh();  
      });
    };
    
    refresh();
});
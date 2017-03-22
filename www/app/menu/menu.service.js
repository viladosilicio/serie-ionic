angular.module('menu.service', [])
    .factory('menuService', menuService);

function menuService($http, $q) {
// interface
var service = {
    categories: [],
    getCategories: getCategories
};
return service;

// implementacao
function getCategories() {
    var def = $q.defer();

    $http.jsonp("http://localhost/appvila/wp-json/taxonomies/category/terms/?_jsonp=JSON_CALLBACK")
        .success(function(data) {
            service.categories = data;
            def.resolve(data);
        })
        .error(function() {
            def.reject("Falha ao buscar categorias");
        });
    return def.promise;
}
}
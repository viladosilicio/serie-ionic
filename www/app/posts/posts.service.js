angular.module('posts.service', [])
    .factory('postsService', postsService);

function postsService($http, $q) {
    // interface
    var service = {
        posts: [],
        getPosts: getPosts,
        getPostsPerPage: getPostsPerPage
    };
    return service;

    // implementacao
    function getPosts() {
        var def = $q.defer();
        var url = "http://localhost/appvila/wp-json/posts?filter[posts_per_page]=3&_embed&_jsonp=JSON_CALLBACK";

        $http.jsonp(url)
            .success(function (data) {
                service.posts = data;
                def.resolve(data);
            })
            .error(function () {
                def.reject("Falha ao buscar posts");
            });
        return def.promise;
    }

    function getPostsPerPage(pagina) {
        var def = $q.defer();

        $http.jsonp("http://localhost/appvila/wp-json/posts?filter[posts_per_page]=3&page=" + pagina + "&_embed&_jsonp=JSON_CALLBACK")
            .success(function (data) {
                    service.posts = data;
                    def.resolve(data);
            })
            .error(function () {
                def.reject("Falha ao buscar posts");
            });
        return def.promise;
    }


}
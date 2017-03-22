angular.module('post-categories.controller', [])
    .controller('PostCategoriesCtrl', PostCategoriesCtrl);

function PostCategoriesCtrl(postCategoriesService, $ionicLoading, $scope, $stateParams) {
    var vm = this;
    vm.noMore = false;
    //usando nosso service para consultar as postagens
    console.log($stateParams.categorieName);
    vm.posts = [];
    vm.getPosts = function () {
        postCategoriesService.getPosts($stateParams.categorieName)
            .then(
            function (data) {
                for (var i = 0; i < data.length; i++) {
                    vm.posts.push(data[i]);
                }
            },
            function (data) {
                console.log('Falha ao consumir API.')
            }
            );
    };

    vm.paginaAtual = 2;

    vm.getPosts();

    vm.getMorePosts = function () {
        postCategoriesService.getPostsPerPage(vm.paginaAtual, $stateParams.categorieName)
            .then(
            function (data) {
                if (data) {
                    for (var i = 0; i < data.length; i++) {
                        vm.posts.push(data[i]);
                    }
                    vm.paginaAtual++;
                    vm.noMore = false;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                } else {
                    vm.noMore = true;
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }
            },
            function (data) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                console.log('Falha ao consumir API.')
            }
            );
    };

}
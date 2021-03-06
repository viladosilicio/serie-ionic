angular.module('posts.controller', [])
    .controller('PostsCtrl', PostsCtrl);

function PostsCtrl(postsService, $ionicLoading, $scope) {
    var vm = this;
    vm.noMore = false;
    //usando nosso service para consultar as postagens

    vm.posts = [];
    vm.getPosts = function () {
        postsService.getPosts()
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
        postsService.getPostsPerPage(vm.paginaAtual)
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
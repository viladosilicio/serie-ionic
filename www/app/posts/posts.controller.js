angular.module('posts.controller', [])
	.controller('PostsCtrl', PostsCtrl);
    
function PostsCtrl(postsService) {
    var vm = this;
	
    //usando nosso service para consultar as postagens
    vm.posts = [];
    vm.getPosts = function(){
        postsService.getPosts()
            .then(
                function(posts){
                    for(var i=0; i < posts.length; i++){
                            vm.posts.push(posts[i]);
                    }
                    vm.posts = posts;
                },
                function(data) {
                    console.log('Falha ao consumir API.')
                }
            );
    };

    vm.getPosts();

}
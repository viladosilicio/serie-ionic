angular.module('menu.controller', [])
	.controller('MenuCtrl', MenuCtrl);

function MenuCtrl(menuService){
    var vm = this;
	
    //usando nosso service para consultar as postagens
    vm.categorias = [];
    vm.getCategories = function(){
        menuService.getCategories()
            .then(
                function(categorias){
                    vm.categorias = categorias;
                },
                function(data) {
                    console.log('Falha ao consumir API.')
                }
            );
    };

    vm.getCategories();
}
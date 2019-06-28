/**
 * 
 */

'use strict';

angular.module('myApp', []).controller('PessoaController', ['$scope', 'PessoaService',
	function ($scope, PessoaService) {
		var self = this;
		self.pessoa = {id:null,name:'',street:'',neighborhood:'',city:'',state:'',cellphone:'',phone:''};
		self.pessoas = [];
		
		self.submit = submit;
		self.edit = edit;
		self.remove = remove;
		self.reset = reset;
		
		fetchAllPessoas();

		function fetchAllPessoas() {
			PessoaService.fetchAllPessoas()
				.then(
					function (d) {
						self.pessoas = d;
					},
					function (errResponse) {
						console.error('Error while fetching Pessoas');
					}
				);
		}

		function createPessoa(pessoa) {
			PessoaService.createPessoa(pessoa)
				.then(
					fetchAllPessoas,
					function (errResponse) {
						console.error('Error while creating Pessoa');
					}
				);
		}

		function updatePessoa(pessoa, id) {
			PessoaService.updatePessoa(pessoa, id)
				.then(
					fetchAllPessoas,
					function (errResponse) {
						console.error('Error while updating Pessoa');
					}
				);
		}

		function deletePessoa(id) {
			PessoaService.deletePessoa(id)
				.then(
					fetchAllPessoas,
					function (errResponse) {
						console.error('Error while deleting Pessoa');
					}
				);
		}

		function submit() {
			console.log('Saving New Pessoa', self.pessoa);
			if (self.pessoa.id === undefined || self.pessoa.id === null) {
				console.log('Saving New Pessoa', self.pessoa);
				createPessoa(self.pessoa);
			} else {
				updatePessoa(self.pessoa, self.pessoa.id);
				console.log('Pessoa updated with id ', self.pessoa.id);
			}
			reset();
		}
		
		function edit(id) {
			console.log('id to be edited', id);
			alert(self.pessoas.length);
			for (var i = 0; i < self.pessoas.length; i++) {

				console.log(self.pessoas[i].id);
				if (self.pessoas[i].id === id) {
					self.pessoa = angular.copy(self.pessoas[i]);
					break;
				}
			}
		}
		
		
		function remove(id) {
			console.log('id to be deleted', id);
			if (self.pessoa.id === id) {
				reset();
			}
			deletePessoa(id);
		}

		function reset() {
			self.pessoa = {id:null,name:'',street:'',neighborhood:'',city:'',state:'',cellphone:'',phone:''};
			$scope.myForm.$setPristine();
		}
		
	}
]);



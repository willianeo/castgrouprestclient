/**
 * 
 */

'use strict';
angular.module('myApp').factory('PessoaService', ['$http', '$q', function ($http, $q) {
		var REST_SERVICE_URI = 'http://localhost:9000/api/pessoa/';

		var factory = {
			fetchAllPessoas: fetchAllPessoas,
			createPessoa: createPessoa,
			updatePessoa: updatePessoa,
			deletePessoa: deletePessoa
		};
		
		return factory;
		
		function fetchAllPessoas() {
			var deferred = $q.defer();
			$http.get(REST_SERVICE_URI)
				.then(
					function(response) {
						console.log('Fetched successfully all pessoas');
						deferred.resolve(response.data);
					},
					function(errResponse) {
						console.log('Error while loading pessoas');
						deferred.reject(errResponse);
					}
				);
			
			return deferred.promise;
			
		}
		
		function createPessoa(pessoa) {
			console.log('Creating Pessoa');
			var deferred = $q.defer();
			$http.post(REST_SERVICE_URI, pessoa)
				.then(
					function(response) {
						deferred.resolve(response.data);
					},
					function(errResponse) {
						console.error('Error while creating Pessoa : ' + errResponse.data.errorMessage);
						deferred.reject(errResponse);
					}
				);
			return deferred.promise;
		}
		
		function updatePessoa(pessoa, id) {
			console.log('updating Pessoa with id ' + id);
			var deferred = $q.defer();
			$http.put(REST_SERVICE_URI + id, pessoa)
				.then(
					function (response) {
						deferred.resolve(response.data);
					}, 
					function (errResponse) {
						console.error('Erro while updating Pessoa with id: ' + id);
						deferred.reject(errResponse);
					}
				);
			return deferred.promise;
		}
		
		function deletePessoa(id) {
			console.log('Removing Pessoa with id ' + id);
			var deferred = $q.defer();
			$http.delete(REST_SERVICE_URI + id)
				.then(
					function(response) {
						deferred.resolve(response.data);
					}, 
					function(errResponse) {
						console.error('Erro while removing Pessoa with id: ' + id);
						deferred.reject(errResponse)
					}
				);
			return deferred.promise;
		}
	}
]);


/* Librerías y Dependencias */

var urllib 		= require('urllib'); 	/* Librería encargada de hacer las peticiones */
var cheerio	 	= require('cheerio'); 	/* Librería encargada de hacer el scrap */
var express	 	= require('express');	/* Librería encargada de levantar un server */
var swig 		= require('swig');		/* Librería encargada de los folders (?) */
var path 		= require('path');		/* Librería encargada de revisar rutas (?) */
var fs 			= require('fs');		/* Librería encargada de hacer sepa Moya */



var homeController = function (server) {

	server.get('/',function (req, res){
		res.render({foo : 'bar'});
	});


	server.get('/patente/:numPatente',function (req, res){

		var miPatente = req.params.numPatente;

		urllib.request('http://www.prt.cl/infovehiculomttwsNew.asmx/infoVehiculoMTT', {
			method: 'POST',
			data: {ppu: miPatente}
		}, function(err, data, res) {
			
			if(!err && res.statusCode == 200){
				
				var $ = cheerio.load(data);

				$('#patente label').each(function() {
					console.log($(this).text()); 			
				});
				
				
				
				console.log(data);			
			}
			else
				//TODO Manejador de error.
				return console.error(err);
		});
		
		
		res.send({numeroPatente : miPatente});



	});

};
module.exports = homeController;
/* Librerías y Dependencias */

var urllib 		= require('urllib'); 	/* Librería encargada de hacer las peticiones */
var cheerio	 	= require('cheerio'); 	/* Librería encargada de hacer el scrap */
var express	 	= require('express');	/* Librería encargada de levantar un server */
var swig 		= require('swig');		/* Librería encargada de los folders (?) */
var path 		= require('path');		/* Librería encargada de revisar rutas (?) */
var fs 			= require('fs');		/* Librería encargada de hacer sepa Moya */
var parser 		= require('xml2json');	/*Librería para convertir los xml en json */

/*Instanciación del servidor, por ahora en localhost*/

var server = express();


//Configuración para renderiar vistas


/**

 *@title metodo: 	request
 *@author:			Guillermo Rojas L.
 *Descripcion :		Función encargada de hacer un request a una página web.
 *@param string: 	URL: Una dirección web a cual hacer el scraping. ej: www.google.com
 *@param JSON 		ANONYMOUS JSON: Un objeto de javascript, el cual tiene como
 *					clave1 = metodo y valor 1 = Verbo http,
 *					clave y valor 2, corresponden a otro ANONYMOUS JSON, que con tiene
 *					clave y valor como <nombre id del input> : <Valor a consultar>
 *@param function	ANONYMOUS FUNCTION: Permite conocer el estado de la web. Si ésta
 *					está arriba, recibiremos el <body> como respuesta
 *@string ppu		Estándar para referirse a las patentes de vehículos motorizados en Chile
 					autos ABCD30 ó AB1234 motos AB0123
 *@string vin		Número único del vehículo (chasis). Más info en http://es.wikipedia.org/wiki/N%C3%BAmero_de_chasis
 */


/*
	Página de consulta para multas por tag
 */

console.log('Multas por tag');

urllib.request('http://www.tagchile.cl/pista3/consulta_denuncia.php', {
	method: 'POST',
	data: {ppu: 'CDSR70'}
}, function(err, data, res) {
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(data);
		$('#menuTable').each(function() {
			var xml = ($(this).toString());
			var json = parser.toJson(xml);
			console.log(json);
		});
	}
	else
		//TODO Manejador de error.
		return console.error(err);
});

/*
	Página de consulta para Carabineros de Chile
 */

urllib.request('http://consultawebvehiculos.carabineros.cl/index.php', {
	method: 'POST',
	data: { accion : 'buscar' , txtLetras: 'CZ', txtNumeros1: 'PD', txtNumeros2: '15', vin : ''}
}, function(err, data, res) {
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(data);
		console.log('¿Presenta encargo?');
		$('#patente label tr').each(function() {

			var xml = ($(this).toString());
			var json = parser.toJson(xml);
			console.log(json);
		});
	}
	else
		//TODO Manejador de error.
		return console.error(err);
});


/*
	Página de consulta para planta de revisión técnica
 */

urllib.request('http://www.prt.cl/infovehiculomttwsNew.asmx/infoVehiculoMTT', {
	method: 'POST',
	data: {ppu: 'CDSR70'}
}, function(err, data, res) {
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(data);
		console.log('Revisiones Técnicas');

		/* Acá elimino los tags innecesarios, para que dejen de aparecer esos ceros y tag huachos */
		$("codigoPRT").remove(); $("Nvin").remove();
		$('MttVehiculoTO').each(function() {

			var xml = ($(this).toString());
			var json = parser.toJson(xml);
			console.log(json);

		});
	}
	else
		//TODO Manejador de error.
		return console.error(err);
});



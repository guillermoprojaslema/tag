/* Librerías y Dependencias */

var urllib = require('urllib'); 	/* Librería encargada de hacer las peticiones */
var cheerio = require('cheerio'); 	/* Librería encargada de hacer el scrap */
var express = require('express');
var swig = require('swig');
var path = require('path');
var fs = require('fs');

/*Instanciación del servidor, por ahora en localhost*/

var server = express();


// Configuración para renderiar vistas

server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', path.join(
    path.dirname(fs.realpathSync(__filename)), 'app/views'));






/* Vista de un home "localhost/Home" */

server.get('/', function (req, res){
	res.render('home');
});


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

urllib.request('http://www.tagchile.cl/pista3/consulta_denuncia.php', {
	method: 'POST',
	data: {ppu: 'FKKV71'}
}, function(err, data, res) {
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(data);
		$('#TabbedPanels1').each(function() {
			console.log($(this).text().trim()); 		// Esta función imprime sólo el texto, nada de html ni metadatos.
			//console.log($(this).toString());			// Esta función imprime todo el html, segregado por el selector.
		});
	}
	else
		//TODO Manejador de error.
		throw err;
});

/*
	Página de consulta para Carabineros de Chile
*/

urllib.request('http://consultawebvehiculos.carabineros.cl/index.php', {
	method: 'POST',
	data: { accion : 'buscar' , txtLetras: 'FK', txtNumeros1: 'KV', txtNumeros2: '71', vin : ''}
}, function(err, data, res) {
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(data);
		$('#patente').each(function() {
			console.log($(this).text()); 		// Esta función imprime sólo el texto, nada de html ni metadatos.
			// console.log($(this).toString());	// Esta función imprime todo el html, segregado por el selector.
		});
	}
	else
		//TODO Manejador de error.
		throw err;
});


/*
	Página de consulta para planta de revisión técnica
*/
urllib.request('http://www.prt.cl/infovehiculomttwsNew.asmx/infoVehiculoMTT', {
	method: 'POST',
	data: {ppu: 'FKKV71'}
}, function(err, data, res) {
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(data);
		$('*').each(function() {
			console.log($(this).text()); 				// Esta función imprime sólo el texto, nada de html ni metadatos.
			// console.log($(this).toString());			// Esta función imprime todo el html, segregado por el selector.
		});
	}
	else
		//TODO Manejador de error.
		throw err;
});


/*Salida a través del puerto 3000 */
server.listen(3000);
var urllib = require('urllib'); 	/* Librería encargada de hacer las peticiones */
var cheerio = require('cheerio'); 	/* Librería encargada de hacer el scrap */

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
 */


urllib.request('http://www.tagchile.cl/pista3/consulta_denuncia.php', {
	method: 'POST',
	data: {ppu: 'CDSR70'} 
}, function(err, data, res) {
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(data);
		$('#TabbedPanels1').each(function() {
			console.log($(this).text()); 		// Esta función imprime sólo el texto, nada de html ni metadatos.
			//console.log($(this).toString());	// Esta función imprime todo el html, segregado por el selector.
		});
	}
	else
		//TODO Manejador de error.
		throw err;
});


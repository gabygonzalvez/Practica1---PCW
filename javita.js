

function hacerlogin(){

	let url = 'rest/login/',
	fd= new FormData();

	fd.append('login', 'usuario2');
	fd.append('pwd', 'usuario2');

	fetch(url, {'method':'POST', 'body':fd}).then(function(respuesta){
		if(!respuesta.ok){
			respuesta.json().then(function(datos){
				console.log(datos);
			});
			return;
		}
		respuesta.json().then(function(datos){
			console.log(datos);
			sessionStorage.setItem('usuatio', JSON.stringify(datos));
		});
	}, function(respuesta){
		console.log('ERROR2');
	});
}
	


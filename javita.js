/*
function peticionFetchAPI_POST(form_HTML, clave){
	var url = 'rest/login/', 
	valor=new FormData(form_HTML), 
	init = {method:'post', body:valor, headers:{'Authorization':clave}};

	fetch(url, init).then(function(respuesta){
		if(!respuesta.ok){
			console.log('Error con código: ' + respuesta.status);
			return;
		}
		respuesta.json().then(function(data){
			console.log('Nombre:' + data.nombre);
		});
	}).catch(function(err){
		console.log('Fetch Error: ', err);
	});
}*/



function hacerlogin(){

	let url = './rest/login/';
	let loginForm = document.querySelectorAll("form")[0];
	let value= new FormData(loginForm);
	
	
	//fd.append('login', 'usuario2');
	//fd.append('pwd', 'usuario2');

	fetch(url, {'method':'POST', 'body':value}).then(function(respuesta){
		
		if(!respuesta.ok){
			//respuesta.json().then(function(datos){
			console.log('No esta bien hecho, no se han encontrado los datos en la database');
			document.getElementById('usuariologin').focus();
			
			
			document.getElementById('alerta').innerHTML = '<p>Los datos son incorrectos. </p>' //muestra nueva_receta
			//let html='<p> El usuario o contra seña es inkorecto2</p>';
			location.href='#openModal';
			//document.getElementById('login').reset();
			}
		else{
			respuesta.json().then(function(datos){
				console.log(datos);
				sessionStorage.setItem('usuario', JSON.stringify(datos));
				location.href='index.html';
				barradenav();	
			});
		}
	}, function(respuesta){
		console.log('NO HA HECHO EL FECH');
	});
	
	return false;
}

function registramen(formulario){
console.log("hace cosas llega aqui");
let url = './rest/usuario/';
let value= new FormData(formulario);
	
fetch(url, {'method':'POST', 'body':value}).then(function(respuesta){
		
		if(!respuesta.ok){
			//respuesta.json().then(function(datos){
			respuesta.json().then(function(datos){
				console.log(datos);
				
			})
		}
		else{
			respuesta.json().then(function(datos){
				console.log(datos);
				
				location.href='login.html';
			});
		}
	}, function(respuesta){
		console.log('NO HA HECHO EL FECH');
	});
	
	return false;
}


	function barradenav() {
		if(sessionStorage.getItem("usuario")){
			document.getElementById('nueva-receta').innerHTML = '<li > <a href="nueva-receta.html"class="icon-plus-circled" >Nueva receta</a></li>' //muestra nueva_receta
            document.getElementById('logout').innerHTML = '<li > <a href="index.html" onclick="vaciar()" id="logout" class="icon-logout">Cerrar sesión </a></li>'; // Muestra el logout
            document.getElementById('login').innerHTML = ''; // Oculta el login
			document.getElementById('registro').innerHTML = ''; // Oculta registro

		}
	}

	function vaciar(){
		sessionStorage.clear();
	}


	
	


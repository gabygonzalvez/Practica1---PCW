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

/*FUNCION DE LAS SEIS ULTIMAS RECETAS*/

/*function pedirEntradas(){
    let xht=XMLHttpRquest(),
    url='rest/receta/?u=6';

    xhr.open('GET',url, true);
    xhr.onload= function(){
        let objJSON= JSON.parse(xhr.responseText);
        console.log(objJSON);
        document.querySelector('#recetas').innerHTML=xhr.responseText;
        document.querySelector('#recetas').innerHTML='<ul>';
        objJSON.FILAS.forEach(e => {
            document.querySelector('#recetas').innerHTML+='<li>'${e.nombre}'</li>';
        });
    };

    xhr.onerror= funtion(){
        console.log('error')
    };

    xhr.send();
}*/





/*------- FUNCIONES RELACIONADAS CON HACER LOGIN -------*/

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


/*------- FUNCIONES RELACIONADAS CON NUEVA RECETA -------*/

function compruebo(){

	if(sessionStorage.getItem("usuario")){
		console.log("perfe");
	}
	else{
	
		location.href="index.html";
		
		console.log("perfeno");

	}
}


function coments(){

	if(!sessionStorage.getItem("usuario")){
		document.getElementById("comenta").innerHTML='<p> Para poder escribir un comentario debes estar <a href="login.html">logueado</a></p>'
	}
	else{
	
		
	}
}

 function loadfile(event, formulario) {
 	let idraro = formulario.children;
    var foto = document.getElementById(idraro[0].id);
    var tamanyo=300*1024;
    foto.src = URL.createObjectURL(event.target.files[0]);
 
  }

 function eliminar(id){
 	document.getElementById(id).innerHTML='';
 	return false;
 }

 var contador=1;
function menufotos(){
	document.getElementById("nuevasfotos").innerHTML+='<div id="fichero' + contador + '"  onchange="loadfile(event,this)" ><img id="foto' + contador + '" src="img/noimg.jpg" onclick="maria();" class="fotoReceta" alt="imagen"  required><textarea rows="4" cols="50" placeholder="Escriba una breve descripción de la imagen" required></textarea><br><input type="file"  id="archivo" class="button" name="file" accept="image/*"><br><button onclick="return eliminar(parentElement.id)" class="button">Eliminar</button><br></div>'
	contador++;
	return false;
}

function maria(){
	document.getElementById('archivo').click();
}

function ingredientes(){
	console.log("joder");
	document.getElementById("ingrediente").innerHTML += "<li>" + document.getElementById("newingrediente").value + "</li>";
    document.getElementById("newingrediente").value="";
  }
function cargarimagen(){
	var nuevafoto = new Image();
	alert("cargamos la pic");
	nuevafoto = cargarfoti("ejemplo.png");

}
function cargarfoti(){
 var imagen =new Image();
 imagen.onload = imagenCargada;
 imagen.src=url;
 return imagen;
}

function imagenCargada(){
	console.log("no funsiona");
}

/*
function comprobadorsesion(){
	if(sessionStorage.getItem("usuario")){
		location.href='index.html';
		console.log("NO PUEDES ENTRAR")
	}
}*/

/*------- FUNCIONES RELACIONADAS CON REGISTRO -------*/

function registramen(formulario){
	console.log("hace cosas llega aqui");
	let url = './rest/usuario/';
	let value= new FormData(formulario);

	var x=1
	var comprobacion=false;

	for(var valor of value.values()){
		if(x==2){
			pwd=valor;
		}
		if(x==3){
			pwd2=valor;
		}
		x++;
	}
	if(pwd==pwd2){
		comprobacion=true;
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
	else{
			console.log("La contraseña esta mal, escribela de nuevo");
			location.href='#openModal';
	}
}

/*------- FUNCIONES RELACIONADAS CON BUSQUEDA RAPIDA -------*/

/*function redirecBuscar(formulario) {

	busquedaRapida(formulario);
	location.href='buscar.html';

}*/

function busquedita() {

	console.log('hola1');

	let parametros = getParameterByName('buscar');
	var url = 'rest/receta/?t=' + parametros;


	mostrarRecetas(url);
	

}

function getParameterByName(name) {

		console.log('hola2');


	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	let href = location.search;
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(href);

	if( results == null )
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function mostrarRecetas(url) {
	console.log('hola');

	fetch(url).then(function(respuesta){
                if(!respuesta.ok){
                    console.log('Error(' + respuesta.status + '): ' + respuesta.statusText);
                    return;
                }
                else {
                		console.log('holaaaaaaa');
                	respuesta.json().then(function(datos){
                    var elemento;
                    localStorage.setItem("n_resultados", datos.TOTAL_COINCIDENCIAS);
                    console.log("storage mostrar: " + localStorage.getItem("n_resultados"));
                    elemento = document.getElementById("contenidoIndex");
                    if (elemento) {
                        for( let i = 0 ; i < datos.FILAS.length; i++){
                            var receta = datos.FILAS[i];
                            elemento.innerHTML = elemento.innerHTML +
                     
                    	'<section>' +
						'<h4><a href="receta.html?id=' + receta.id + '" class="tituloHome"> ' + receta.nombre + '</a></h4>' +
						'<a href="receta.html?id=' + receta.id + '"><img src="fotos/ ' + receta.fichero + '" class="fotoHome" alt="' + receta.descripcion_foto + '"></a>' +
						'<ul>'
						'<li><b><a href="buscar.html?id=' + receta.autor + '">Autor: </a></b> '+ receta.autor +' </li>' +
						'<li><b>Likes</b> '+ receta.positivos +' </li>'+
						'<li><b>Dislikes</b> '+ receta.negativos +' </li>'+
						'<li><b>Fecha</b> '+ receta.fecha +' </li>'+
						'</ul>'+
						'</section>;'
                        }
                    }

                    
                });

                }
            }, function(respuesta){
			console.log('NO HA HECHO EL FECH');
			 });
}


	
/*------- FUNCIONES RELACIONADAS CON RECETA -------*/


function cargarReceta() {
	if(window.location.search){

		console.log(location.search);
		let url = 'rest/receta/'
	}
}
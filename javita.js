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

function logindisponible(nombre){
let xhr = new XMLHttpRequest();
  url = 'rest/login/' + nombre.value;
  xhr.open('GET', url, true);

  xhr.onload = function(){
    let r = JSON.parse(xhr.responseText);
    console.log(xhr.responseText);

    if(r.DISPONIBLE==true){
      document.getElementById("disponible").innerHTML = '¡Nombre de usuario disponible!';
      document.getElementById("nodisponible").innerHTML = '';
      console.log('Nombre de usuario disponible');
    }
    else{
      document.getElementById("disponible").innerHTML = '';
      document.getElementById("nodisponible").innerHTML = 'Nombre de usuario no disponible';
      console.log('Nombre de usuario no disponible');
    }
  }
  xhr.send();

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

/*------- FUNCIONES RELACIONADAS CON INDEX -------*/

function cargarUltimas(){

	var url = 'rest/receta/?u=6';
	mostrarRecetas(url,'contenidoIndex');

}

function cargarUltimasBusq() {

	var url = 'rest/receta/?u=6';
	mostrarRecetas(url,'contenidoResultado');

}

function mandarBusqueda() {

	var param = document.getElementById("buscar").value;
	window.location.replace('./buscar.html?buscar='+ param);

}

function busquedita() {

	if(window.location.href!=='http://localhost/pcw/practica02/buscar.html'){
		var parametros = window.location.href.split("=")[1];
		console.log(parametros);
		if(parametros===''){
			cargarUltimasBusq();
		}
		else {
			// hacer peticion fetch get con la siguiente url
			var url = 'rest/receta/?t=' + parametros;
			mostrarRecetas(url,'contenidoResultado');
		}
	}
	else {
		cargarUltimasBusq();
	}

}



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
					document.getElementById("registroy").reset();
					console.log("woo");
					location.href='#openModalBIEN';
					
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

/*------- FUNCIONES RELACIONADAS CON BUSQUEDA -------*/

function limpiarBusqueda(){

		document.getElementById('formB').reset();

}

function busqueda(){


}

/*function busquedita(){
	console.log("entra a busquedita obvizmente");
  	var url = 'rest/receta/?t=';

	console.log(url);
	var urlfin=document.getElementById("buscar").value;
	urlllevar='buscar.html/u?=' + urlfin;
	console.log(urlllevar);
	location.href=urlllevar;

  fetch(url).then(function(response){
    if(!response.ok){ // if(response.status!=200)
    		console.log("SALE UN ERROR estoy enfadada");

      console.log('Error(' + response.status + '): ' + response.statusText);
      return;
    }
    	console.log("AQUI NO SALE ERROR ira no seeeeeeeeeeee");

    response.json().then(function(data) {
    console.log(data);

  });
  }).catch(function(errorcito) {
    console.log('Fetch Error: ', errorcito);
  });
}*/









/*
	var url = './buscar.html?buscar=' + parametros;
	var parametros = getParameterByNam('buscar');
	/*var param='?buscar=' + parametros;
	console.log('hola3');

	console.log(url);


	mostrarRecetas(url);

}*/

/*function getParameterByName(name) {

	console.log('hola2');
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	let href = window.location;
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(href);

	if( results == null )
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	var regex=new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results===null ? "": decodeURIComponent(results[1].replace(/\+/g, " "));
}*/

function mostrarRecetas(url, sitio) {
	contar=0;

	fetch(url).then(function(respuesta){
                if(!respuesta.ok){
                    console.log('Error(' + respuesta.status + '): ' + respuesta.statusText);
                    return;
                }
								else {
												respuesta.json().then(function(datos){

			                    var elemento = document.getElementById(sitio);
			                    if (elemento) {
			                        for( let i = 0 ; i < datos.FILAS.length; i++){
			                        	
			                            var receta = datos.FILAS[i];
			                            elemento.innerHTML = elemento.innerHTML +

						                    	'<section>' +
																	'<h4><a href="receta.html?id=' + receta.id + '" class="tituloHome"> ' + receta.nombre + '</a></h4>' +
																	'<a href="receta.html?id=' + receta.id + '"><img src="fotos/' + receta.fichero + '" class="fotoHome" alt="' + receta.descripcion_foto + '"></a>' +
																	'<ul>' +
																	'<li><b><a href="buscar.html?id=' + receta.autor + '">Autor: </a></b> '+ receta.autor +' </li>' +
																	'<li><b>Likes</b> '+ receta.positivos +' </li>'+
																	'<li><b>Dislikes</b> '+ receta.negativos +' </li>'+
																	'<li><b>Fecha</b> '+ receta.fecha +' </li>'+
																	'</ul>'+
																	'</section>'
		                        }
		                    	}


	                			});

										}


            });
}



/*------- FUNCIONES RELACIONADAS CON RECETA -------*/


function cargarReceta() {
	if(window.location.search){

		console.log(location.search);
		let url = 'rest/receta/'
	}
}


var idAc = 0;
function conseguirID(){
  var x = window.location.search;
  var num = x.charAt(x.length - 1);

  console.log(x);
  console.log(num);
  idActual = num;
  return num;
}

function pedirReceta() {   // COGE LA URL Y HACE LA PETICION

  var id = conseguirID(); //?id=8 // https://css-tricks.com/snippets/javascript/get-url-variables/

  url = "./rest/receta/" + id ;
  if(window.location.href=='http://localhost/pcw/practica02/receta.html'){
  	location.href="index.html";
  }
  fetch(url).then(paginareceta, function(e) {
    console.log();
  });
}


function paginareceta(datitos){
let recetina=document.getElementById("recetina");

if (!datitos.ok){
    return false;
  }
  datitos.json().then(lareceta, function(f) {
    console.log('No se ha pasado a json');
  });
}


function conversion(numero){

	console.log(numero);

    if(numero == 0) {
	  difi = 'Baja';
    }else if(numero ==1) {
      difi = 'Media';
    }else if(numero ==2) {
      difi = 'Alta';
    }
}


//FOTOS DE RECETA
var contadorart=0;
var act=0;
var imag;


function anterior(){

console.log(act);
	console.log(contadorart);
if(act>0){
	act-=1;
	console.log(act);
	var fotogra = imag[act];
	console.log(fotogra);
	let hacerfotos =`<figure><img id="fotografias" src=${"fotos/" + fotogra.fichero}  
							alt="fotoreceta" class="fotoReceta"><figure>${fotogra.texto} </figure>
      					<div><input type="button" onclick="anterior()" value="&laquo" >
      				<input type="button" onclick="siguiente()" value="&raquo" ></div>
      				`


     document.getElementById("aquifotos").innerHTML=hacerfotos;
}
else{
	return false;
}
return false;


}


function siguiente(){
	console.log(act);
	console.log(contadorart);
if(act<contadorart -1){
	act+=1;
	console.log(act);
	var fotogra = imag[act];
	console.log(fotogra);
	let hacerfotos =`<figure><img id="fotografias" src=${"fotos/" + fotogra.fichero}  
							alt="fotoreceta" class="fotoReceta"><figure>${fotogra.texto} </figure>
      					<div><input type="button" onclick="anterior()" value="&laquo" >
      				<input type="button" onclick="siguiente()" value="&raquo" ></div>
      				<article> </article>`


     document.getElementById("aquifotos").innerHTML=hacerfotos;
}
else{
	return false;
}
return false;

}


function vamosfoto(recetaJSON2){

	imag = recetaJSON2.FILAS;
	receta= recetaJSON2.FILAS[0];
	
	imag.forEach(function(a, b){
		contadorart++;
	});

	let hacerfotos =`<figure><img id="fotografias" src=${"fotos/" + receta.fichero}  
							alt="fotoreceta" class="fotoReceta"><figure>${receta.texto} </figure>
      					<div><input type="button" onclick="anterior()" value="&laquo" >
      				<input type="button" onclick="siguiente()" value="&raquo" ></div>`


     document.getElementById("aquifotos").innerHTML=hacerfotos;

return false;

}



function manejofoto(receta){

	let recetina = document.getElementById('recetina');

	receta.json().then(vamosfoto, function(e){
		console.log("error json");
	});
	return false;
}


function prepararfoto(){

	var ide = conseguirID();
	console.log("pedirfot" + ide);
	url="./rest/receta/" + ide + "/fotos";

	console.log(url);
	fetch(url).then(manejofoto, function(e){
		console.log("error");
	});
	return false;

}

//RECETA TOCHA
function lareceta(recetaJSON){
	/*while(recetina.lastChild){         // MIENTRAS HAYA UN ULTIMO HIJO
    recetina.removeChild(recetina.lastChild);   // LO ELIMINA
  	}*/
  var receta=recetaJSON.FILAS[0];
  	//receta.FILAS.forEach(function(receta, i){

    	if(receta.dificultad == 0) {
		  receta.dificultad = 'Baja';
	    }else if(receta.dificultad ==1) {
	      receta.dificultad = 'Media';
	    }else if(receta.dificultad ==2) {
	      receta.dificultad = 'Alta';
	    }else{
	    	receta.dificultad='Baja';
	    }

      let recetaficha =`
      	<h2><a href=${"receta.html?id=" + receta.id}> ${receta.nombre} </a></h2><hr><div class="receta"><figcaption>${receta.nombre}</figcaption>`
      	

      	recetaficha+= `<article id="aquifotos"> </article>`

      	recetaficha+=`
      				<ul>
					<li><b><a href=${"buscar.html"}>Autor: </a></b>${receta.autor} </li><li><b>Tiempo de elaboración:</b>${receta.tiempo} minutos</li><li ><b>Dificultad: </b> ${receta.dificultad}</li><li><b>Número de comensales:</b> ${receta.comensales}</li><li><b>Likes:</b> ${receta.positivos} </li><li><b>Dislikes:</b> ${receta.negativos} </li><li><b>Fecha:</b> ${receta.fecha}</li><li><b><a href="#comentarios">Número de comentarios:</a></b> ${receta.comentarios} </li>
				</ul>
				</figure><h4>Ingredientes:</h4><div id ="ingredientesreceta"></div><h4>Elaboración:</h4>
				<p>${receta.elaboracion}</p> <br>`
				recetaficha+=`<div class="likes" id="valoracion"> </div>`
		recetaficha+=`<h4 id="comentarios"> Comentarios: </h4><div id="todoscomentarios"></div>`
		
      let arti = document.createElement('article');
      arti.innerHTML = recetaficha;
      recetina.appendChild(arti);
      prepararfoto();
      prepararingrediente();
      prepararcomentarios();
      //valoracion();
      coments();

}

//INGREDIENTES//
function prepararingrediente(){
	var idingre = conseguirID();
	url="./rest/receta/" + idingre + "/ingredientes";

	fetch(url).then(creandoingredientes, function(e){
		console.log("error en el fetch");
	});
	return false;
}

function creandoingredientes(receta){

	let recetinina = document.getElementById('recetinina');

	receta.json().then(mostrarfinalingredientes, function(e){
		console.log("mal json");
	});
return false;
}

function mostrarfinalingredientes(receta){

	let losingre=`<ul>`;
receta.FILAS.forEach(function(receta, i){
	losingre+="<li>" + receta.nombre + "</li>";
});
	losingre+="</ul>";


	document.getElementById("ingredientesreceta").innerHTML=losingre;
	return false;
}

//comentarios//
function prepararcomentarios(){
	var idcome = conseguirID();
	url="./rest/receta/" + idcome + "/comentarios";

	fetch(url).then(creandocomentarios, function(e){
		console.log("error en el fetch");
	});
	return false;
}

function creandocomentarios(receta){

	let recetinina = document.getElementById('recetinina');

	receta.json().then(mostrarfinalcomentarios, function(e){
		console.log("mal json");
	});
return false;
}

function mostrarfinalcomentarios(receta){

	let loscoments=`<article>`;
receta.FILAS.forEach(function(receta, i){
	loscoments+=`<h3>${receta.titulo}<small><i><small>${receta.autor}-${receta.fecha}</small></i></small></h3>
	<p>${receta.texto}</p>`;
});
	loscoments+="</article>";


	document.getElementById("todoscomentarios").innerHTML=loscoments;
	return false;
}



function coments(){
	if(!sessionStorage.getItem("usuario")){
		document.getElementById("comenta").innerHTML='<p> Para poder escribir un comentario debes estar <a href="login.html">logueado</a></p>'
	}
	else{
		document.getElementById("comenta").innerHTML='<form id="comenta" onsubmit="return realizarcomentario(this);"><h3><label for="comentarios">Escribe un comentario</label></h3><input type="text" id="titulo" placeholder="Título" maxlength="50" required><textarea id="texto" placeholder="Escribe aquí tu comentario..." required></textarea><input type="submit" value="Enviar comentario" ></form><br>';
	}
}


function realizarcomentario(aidi){
 /* let url = './rest/receta/' + aidi + '/comentario';                        // Creamos una URL con la ubicacion de la carpeta
  let valor = new FormData(aidi);                         // Creamos un contenedor de clave/valor

  fetch(url, {'method':'POST', 'body':valor}).then(function(response){ // Conectar peticion con el servidor: /rest/usuario + info de POST
    if(!response.ok){ 
        response.json().then(function(datos){
          console.log(datos);  
          console.log("no ha conectao chaval");
        });
    }
    else{ 
        response.json().then(function(datos){
          console.log(datos);
          console.log('fua la mejor');
        });
    }
  }, function(response){ 
    console.log('fuaaaaaaaaaa');
  });
  return false;*/


  let id = conseguirID();
	let xhr = new XMLHttpRequest(),
		url = 'rest/receta/'+ id +'/comentario/',
		urlderecarga = 'rest/receta/'+ id,
		fd = new FormData(aidi),
		usu = JSON.parse(sessionStorage.getItem('usuario'));
		
	if(!sessionStorage.getItem('usuario'))
		return false;

	fd.append('l', usu.login);
	fd.append('titulo',  document.querySelector('input[id=titulo]').value);
	fd.append('texto',  document.querySelector('textarea[id=texto]').value);


	xhr.open('POST',url,true);
	
	xhr.onload = function()
	{
		console.log(xhr.responseText);
		console.log("ha ocurrido bien");
		console.log(id);
		console.log(aidi);
		location.href="#openModal";

	};

	xhr.setRequestHeader('Authorization', usu.clave);
	xhr.send(fd);

	return false;

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


function comprueboiniciado(){

	if(sessionStorage.getItem("usuario")){
		location.href="index.html";
	}
}


////////////////////////////////////ESTO LO ANTIGUO//////////////////////////////


 function loadfileANTIGUO(event, formulario) {
 	let idraro = formulario.children;
    var foto = document.getElementById(idraro[0].id);
    var tamanyo=300*1024;
    foto.src = URL.createObjectURL(event.target.files[0]);

  }

 function eliminarANTES(id){
 	document.getElementById(id).innerHTML='';
 	return false;
 }

 ////////////////////////////////////ESTO ACABA LO ANTIGUO/////////////////////


var cont=0;
 var fotos=[];
 var sources=[];
 var contador=1;


 
function eliminar(formu){

	var gambi = formu.children;
	if(gambi[0].src !='http://localhost/pcw/practica02/img/noimg.jpg'){
		cont--;
	}
	document.getElementById(formu.id).innerHTML='';
	return false;

}

function loadfile(source){
	if(source.type == "file"){
		console.log("entraaa");
		if(source.files[0]!=null){
			console.log("entraa... mmm");
			var nombre = "";
			var tam = source.files[0].size;
			var foto = document.getElementById("foto" + source.id);

			if(tam>300000){
				location.href="#openModal";
				//LLAMAR MODAL
			}else{
				console.log("entrandito");
				var reader = new FileReader();
				reader.onloadend=function(e){
					nombre = e.target.result;
					foto.src = nombre;
					sources.push(nombre);
					fotos.push(source.files[0]);
				}
				reader.readAsDataURL(source.files[0]);
				cont++;
			}
		}
	}
	else{

	}
}


function menufotos(){
	document.getElementById("nuevasfotos").innerHTML+='<div id="fichero' + contador + '"   ><img id="foto' + contador + '" src="img/noimg.jpg" onclick="loadfile(this);" class="fotoReceta" alt="imagen" required><textarea rows="4" cols="50" id="descripcionfoto' + contador + '" placeholder="Escriba una breve descripción de la imagen" required></textarea><br><input type="file"  id="' + contador + '" class="button" name="file" accept="image/*" onchange="loadfile(this)"><br><button onclick="return eliminar(parentElement)" class="button">Eliminar</button><br></div>'
	contador++;
	return false;
}

function maria(){
	document.getElementById('archivo').click();
}

function ingredientes(){
	console.log("joder");
	document.getElementById("ingrediente").innerHTML += "<li name='ing'>" + document.getElementById("newingrediente").value + "</li>";
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

function subidafoto(id, pos, usuario){
	let xhr = new XMLHttpRequest(), 
	form = new FormData(),
	url = './rest/receta/' + id + '/foto/', 
	descripcion=document.getElementById('descripcionfoto' + pos).value;
	foto = document.getElementById(pos).files[0];
	
	if(xhr){
		form.append('l', usuario.login);
		form.append('t', descripcion);
		form.append('f', foto);
		
		console.log(usuario.login);
		console.log(descripcion);  
		console.log(foto); 
		

		xhr.open('POST', url, true);
		xhr.onload = function(){
			console.log(xhr.responseText);
			let response = JSON.parse(xhr.responseText);
				if(response.RESULTADO=="OK"){
					console.log("FOTO SUBIDA OK")
				}
				else{
					console.log("ERROR");
				}
		};
		xhr.setRequestHeader('Authorization', usuario.clave);
		xhr.send(form);
	}
}


function nuevarecetasubida(){
    let url = './rest/receta/';
    usuario = JSON.parse(sessionStorage['usuario']);
    valor = new FormData();
    var opcion = document.querySelector('select[id=dificult]').value;
     console.log(opcion);

    if(opcion =='Baja') {
	  numero = 0;
    }else if(opcion =='Media') {
      numero = 1;
    }else if(opcion =='Alta') {
      numero = 2;
    }else{
    	numero=0;
    }
    console.log(numero);

    valor.append('l', usuario.login);
    valor.append('n', document.querySelector('input[id=nombreReceta]').value);
    valor.append('e', document.querySelector('textarea[id=elaboracionReceta]').value);
    valor.append('t', document.querySelector('input[id=tiempoReceta]').value);
    valor.append('d', numero);
    valor.append('c', document.querySelector('input[id=comensalesReceta]').value);

    console.log(usuario.login);
    console.log(document.querySelector('input[id=nombreReceta]').value);
    console.log(document.querySelector('textarea[id=elaboracionReceta]').value);
    console.log(document.querySelector('input[id=tiempoReceta]').value);
    console.log( numero);
    console.log(document.querySelector('input[id=comensalesReceta]').value);
    if(usuario.login==''){
    	location.href="#openmodalusuario";
    }
    if(document.getElementById('fichero')==null){
               		location.href="#openModalerrorFOTO";
               	}else{

    fetch(url,{'method':'POST','body':valor, headers:{'Authorization':usuario.clave}}).then(function (response){
        if(!response.ok){
            response.json().then(function(datos){
                console.log(datos);
                 console.log('deberia NO meerlo')
                 location.href="#openModalerror";
            })
        }
        else{
            response.json().then(function(datos){
                console.log(datos);
                console.log('deberia meerlo');
               	
               	for(var i=0; i<=contador; i++){
               		if(document.getElementById('fichero' + i)!=null){
               			subidafoto(datos.ID, i, usuario);
               		}
               	}
               	
               		subidaingredientes(datos.ID, usuario);

               	location.href="#openModalBIENHECHO";
               	//loadfile("img/noimg.jpg");
               	document.getElementById("formulario").reset();
               	
               	 

               	
        })
    }}, function(response){
        console.log('emmmm');
    });

		}
    return false;
 }

 function subidaingredientes(datos, usuario){
 	let xhr = new XMLHttpRequest(),
 	url = 'rest/receta/' + datos + '/ingredientes',
 	valor = new FormData();
 	lista = document.getElementsByName('ing');
 	enviarIngredientes=[];
 	console.log("ha llegao");

 	if(xhr){
 		for(var i=0; i<lista.length; i++){
 			enviarIngredientes.push(lista[i].innerText);
 			 	console.log("cosa");

 		}

 		valor.append('l', usuario.login);
 		valor.append('i', JSON.stringify(enviarIngredientes));

 		console.log(JSON.stringify(enviarIngredientes));

 		xhr.open('POST', url, true);
 		xhr.onload = function(){
 			let response = JSON.parse(xhr.responseText);
 			if(response.RESULTADO == "OK"){
 				console.log("deberia ir de p madre");

 			}else{
 				console.log("mira no funca");
 			}
 			console.log("al menos entra al primer if... ");
 		};

 	}
 	xhr.setRequestHeader('Authorization', usuario.clave);
 	xhr.send(valor);
 }

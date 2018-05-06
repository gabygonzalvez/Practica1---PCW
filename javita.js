

/*------- FUNCIONES RELACIONADAS CON HACER LOGIN -------*/

function hacerlogin(){

	let url = './rest/login/';
	let loginForm = document.querySelectorAll("form")[0];
	let value= new FormData(loginForm);

	fetch(url, {'method':'POST', 'body':value}).then(function(respuesta){

		if(!respuesta.ok){

			respuesta.json().then(function(datos){
					console.log(datos);

			})

			document.getElementById('usuario').focus();
			document.getElementById('alerta').innerHTML = '<p>Los datos son incorrectos. </p>' //muestra nueva_receta
			location.href='#openModal';
			document.getElementById('usuario').autofocus();


			}
		else{

				respuesta.json().then(function(datos){
				console.log(datos);
				sessionStorage.setItem('usuario', JSON.stringify(datos));
				location.href='index.html';
				barradenav();
			});
		}
	}, );

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

var pag = 0;
var totalPag = 0;

function cargarUltimas(pag){

	var url = 'rest/receta/?pag=' + pag + '&lpag=6';
	mostrarRecetas(url,'contenidoIndex');

}

function cargarUltimasBusq(pag) {

	var url = 'rest/receta/?pag=' + pag + '&lpag=6';
	mostrarRecetas(url,'contenidoResultado');

}

function mandarBusqueda() {

	var param = document.getElementById("buscar").value;
	window.location.replace('./buscar.html?buscar='+ param);

}

function busquedita(pag) {

	if(window.location.href!=='http://localhost/pcw/practica02/buscar.html'){
		var parametros = window.location.href.split("=")[1];
		var final = window.location.href.split("?")[1];
		var letra = final.split("=")[0];
		console.log(parametros);
		if(parametros===''){
			cargarUltimasBusq(pag);
		}
		else if(letra=='a') {
			var url = 'rest/receta/?pag=' + pag + '&lpag=6&a=' + parametros;
			mostrarRecetas(url,'contenidoResultado');
		}
		else {
			var url = 'rest/receta/?pag=' + pag + '&lpag=6&t=' + parametros;
			mostrarRecetas(url,'contenidoResultado');
		}
	}
	else {
		cargarUltimasBusq(pag);
	}

}

/*------- FUNCIONES RELACIONADAS CON PAGINACION -------*/

	/*-----PAGINACION INDEX-----*/

function primeraPag() {

	if(pag!=0){
		document.getElementById("contenidoIndex").innerHTML = '';
		document.getElementById("paginacion").innerHTML = '';
		pag=0;
		cargarUltimas(pag);
	}

}

function anteriorPag() {

	if(pag!=0){
		document.getElementById("contenidoIndex").innerHTML = '';
		document.getElementById("paginacion").innerHTML = '';
		pag = pag - 1;
		cargarUltimas(pag);
	}


}

function siguientePag() {

	if(pag<totalPag){
		document.getElementById("contenidoIndex").innerHTML = '';
		document.getElementById("paginacion").innerHTML = '';
		pag = pag + 1;
		cargarUltimas(pag);
	}

	
}

function ultimaPag() {
	
	if(pag<totalPag){
		document.getElementById("contenidoIndex").innerHTML = '';
		document.getElementById("paginacion").innerHTML = '';
		pag = totalPag - 1;
		cargarUltimas(pag);
	}

}

	/*-----PAGINACION BUSQUEDA-----*/

function primeraPagBusq() {

	if(pag!=0){
		document.getElementById("contenidoResultado").innerHTML = '';
		document.getElementById("paginacionBusq").innerHTML = '';
		pag=0;
		cargarUltimas(pag);
	}

}

function anteriorPagBusq() {

	if(pag!=0){
		document.getElementById("contenidoResultado").innerHTML = '';
		document.getElementById("paginacionBusq").innerHTML = '';
		pag = pag - 1;
		cargarUltimas(pag);
	}


}

function siguientePagBusq() {

	if(pag<totalPag){
		document.getElementById("contenidoResultado").innerHTML = '';
		document.getElementById("paginacionBusq").innerHTML = '';
		pag = pag + 1;
		cargarUltimas(pag);
	}

	
}

function ultimaPagBusq() {
	
	if(pag<totalPag){
		document.getElementById("contenidoResultado").innerHTML = '';
		document.getElementById("paginacionBusq").innerHTML = '';
		pag = totalPag - 1;
		cargarUltimas(pag);
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

function busqueda(pag){


	var url = 'rest/receta/?pag=' + pag + '&lpag=6';


	if(document.getElementById('nombre').value!=""){
		var nombre = document.getElementById('nombre').value;
		url = url + '&n=' + nombre;
	}
	if(document.getElementById('ingredientes').value!=""){
		var ingredientes = document.getElementById('ingredientes').value;
		url = url + '&i=' + ingredientes;
	}
	if(document.getElementById('tiempo1').value!=""){
		var tiempo1 = document.getElementById('tiempo1').value;
		url = url + '&di=' + tiempo1;
	}
	if(document.getElementById('tiempo2').value!=""){
		var tiempo2 = document.getElementById('tiempo2').value;
		url = url + '&df=' + tiempo2;
	}
	if(document.getElementById('dificultad').value!="default"){
		var dificultad = document.getElementById('dificultad').value;
		url = url + '&d=' + dificultad;
	}
	if(document.getElementById('comensales').value!=""){
		var comensales = document.getElementById('comensales').value;
		url = url + '&c=' + comensales;
	}
	if(document.getElementById('autor').value!=""){
		var autor = document.getElementById('autor').value;
		url = url + '&a=' + autor;
	}

	console.log(url);

	document.getElementById("contenidoResultado").innerHTML = '';
	document.getElementById("paginacionBusq").innerHTML = '';
	mostrarRecetas(url, 'contenidoResultado');


}

function mostrarRecetas(url, sitio) {

	fetch(url).then(function(respuesta){
                if(!respuesta.ok){

                    respuesta.json().then(function(datos){
					console.log(datos);
					})

                }
				else {
						respuesta.json().then(function(datos){

	                    var elemento = document.getElementById(sitio);
	                    totalPag = Math.ceil(datos.TOTAL_COINCIDENCIAS/6);
	                    if (elemento) {
	                        for( let i = 0 ; i < datos.FILAS.length; i++){
	                        	
	                            var receta = datos.FILAS[i];
	                            elemento.innerHTML = elemento.innerHTML +

				                    	'<section>' +
										'<h4><a href="receta.html?id=' + receta.id + '" class="tituloHome"> ' + receta.nombre + '</a></h4>' +
										'<a href="receta.html?id=' + receta.id + '"><img src="fotos/' + receta.fichero + '" class="fotoHome" alt="' + receta.descripcion_foto + '"></a>' +
										'<ul>' +
										'<li><b><a href="buscar.html?a=' + receta.autor + '">Autor: </a></b> '+ receta.autor +' </li>' +
										'<li><b>Likes</b> '+ receta.positivos +' </li>'+
										'<li><b>Dislikes</b> '+ receta.negativos +' </li>'+
										'<li><b>Fecha</b> '+ receta.fecha +' </li>'+
										'</ul>'+
										'</section>'

                        	}

	                        pagMostrar = pag + 1;

	                        elemento.innerHTML = elemento.innerHTML +

	                        '<ul class="paginacion">' +
							'<li><button id="primera" onclick="primeraPag();">Primera</button>' +
							'<li><button type="button" id="anterior" onclick="anteriorPag();">&laquo;</button>' +
							'<li><p>Página ' + pagMostrar + ' de ' + totalPag + '</p>' +
							'<li><button type="button" id="siguiente" onclick="siguientePag();">&raquo;</button>' +
							'<li><button type="button" id="ultima" onclick="ultimaPag();">Última</button>' +
							'</ul><br><br><br><br>'
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

	if(document.querySelector('input[id=titulo]').value=='' || document.querySelector('textarea[id=texto]').value==''){

		location.href="#modaldelmal";

	 }else{

		xhr.open('POST',url,true);
		
		xhr.onload = function()
		{
			console.log(xhr.responseText);
			console.log(id);
			console.log(aidi);
			location.href="#openModal";

		};

		xhr.setRequestHeader('Authorization', usu.clave);
		xhr.send(fd);
	}

	return false;

}



/*------- FUNCIONES RELACIONADAS CON NUEVA RECETA -------*/

function compruebo(){

	if(sessionStorage.getItem("usuario")){
	}
	else{

		location.href="index.html";

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
		document.querySelector('input[type=file]').click();
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
    for(var i=0; i<=contador; i++){
                 if(document.getElementById('fichero' + i)==null){
                  location.href="#openModalerrorFOTO";
    }else{


	    fetch(url,{'method':'POST','body':valor, headers:{'Authorization':usuario.clave}}).then(function (response){
	        if(!response.ok){
	            response.json().then(function(datos){
	                console.log(datos);
	                 location.href="#openModalerror";
	            })
	        }
	        else{
	            response.json().then(function(datos){
	                console.log(datos);
	               	
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

 		}

 		valor.append('l', usuario.login);
 		valor.append('i', JSON.stringify(enviarIngredientes));

 		console.log(JSON.stringify(enviarIngredientes));

 		xhr.open('POST', url, true);
 		xhr.onload = function(){
 			let response = JSON.parse(xhr.responseText);
 			
 		};

 	}
 	xhr.setRequestHeader('Authorization', usuario.clave);
 	xhr.send(valor);
 }

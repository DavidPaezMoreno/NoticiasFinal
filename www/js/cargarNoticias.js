	
	var globalData;
	
	$( document ).ready(function() {
		var UrlMyJson= 'http://www.uanl.mx/utilerias/json/noticias.php';
		//var UrlMyJson= 'http://provisionalobjetos.uanl.mx/pruebaphp.php';
		var datosJson;
		
		$.ajax({
		    url: UrlMyJson,
		    type: 'GET',
		    dataType: 'json',
		    beforeSend: function( xhr ){
		    	$(".ui-loader-default").hide();
		    	$("#contenedorNoticias").empty();
		    	$('#contenedorNoticias').append("<div class='advert_msg'> <img src='img/loading_spinner.gif'></img> </br> Estamos trayendo las noticias más recientes, por favor espere.</div>");
		    },
		    success: function(data) { 

		    	$("#contenedorNoticias").empty();

		    	globalData = data;
		    	//data = JSON.parse(data);
		    	/*
		    	------------------Formato en que se imprimen las noticias individualmente------------------
				<a href="nota_completa.html">
	                <div class="noticiaIndividual" id="43081" categoria="Académico" fecha="1436481720">
	                    <div class="contenedorMiniaturaNoticia">
	                        <div class="miniaturaNoticia"><img src="http://www.uanl.mx/sites/default/files/media/noticias/reducciones/43081-090715.jpg"></div>
	                        <div class="tituloNoticia">Continuarán formación de técnico superior en Francia</div>
	                    </div> <div class="clear"></div>
	                    <div class="resumenNoticia">Diez estudiantes de la Escuela Industrial y Preparatoria Técnica Álvaro Obregón, realizarán estancias académicas en Francia, como parte del programa de Movilidad Internacional de la UANL.</div>
	                </div>
                </a>
		    	*/

		    	//Fecha que da el dispositivo
		    	var fechaHoy = timeConverter(getUnixTime());
		    	//Fecha en la que siguen estando las noticias
		    	var fechaHastaAhora = fechaHoy;
		    	
		    	$(".contenedorFecha:last").append("");

		    	globalData[0].listaNoticias.forEach(function(entry){


		    		var fechaEnJson = timeConverter(entry.fecha);
		    		if(fechaHastaAhora != fechaEnJson){
		    			fechaHastaAhora = fechaEnJson;		    		
		    			
						encabezadoFecha = '<div class="contenedorFecha">' +
			    								'<div class="fechaLista">' +
	                    						'<img src="img/CALENDARIO.png">' +
	                    						'<span id="fechaListaSpan">' +
								                        fechaHastaAhora +
								                    '</span>' +
								                '</div>'+
							                '</div>';

                		$("#contenedorNoticias").append(encabezadoFecha);
	                }else if(fechaEnJson == fechaHoy){
	    				fechaHastaAhora = "Hoy"
	    				encabezadoFecha = '<div class="contenedorFecha">' +
			    								'<div class="fechaLista">' +
	                    						'<img src="img/CALENDARIO.png">' +
	                    						'<span id="fechaListaSpan">' +
								                        fechaHastaAhora +
								                    '</span>' +
								                '</div>'+
							                '</div>';

                		$("#contenedorNoticias").append(encabezadoFecha);
	    			}


		    		var noticiaIndividual = "\n";
		    		noticiaIndividual +='<div class="noticiaIndividual noticiaMiniatura" id="'+ entry.id + '" categoria="'+ entry.categoria +'" fecha="'+ entry.fecha + '" shareFB="' + entry.url +'">';
		    		noticiaIndividual +='<div class="contenedorMiniaturaNoticia">';
		    		noticiaIndividual +='<div class="miniaturaNoticia"><img src="http://www.uanl.mx/'+ entry.foto +'"></div>';
		    		noticiaIndividual +='<div class="tituloNoticia">'+ entry.titulo +'</div>';
		    		noticiaIndividual +='</div> <div class="clear"></div>';
		    		noticiaIndividual +=' <div class="resumenNoticia">'+ entry.resumen +'</div>';

		    		switch(entry.categoria){
		    			case "Actualidad / Realidad / Oportunidad":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/actualidad_oportunidad.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Ciencia y tecnología":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/ciencia_y_tecno.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Responsabilidad social":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/responsabilidad_social.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Sustentabilidad":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/sustentabilidad.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Vinculación ":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/vinculacion.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Salud":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/salud.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Estudiantiles":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/estudiantil.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Deportes":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/deporte.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Arte y cultura":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/arte_y_cultura.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Investigación":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/investigacion.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Internacional":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/internacional.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Institucional":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/institucional.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    			case "Académico":
		    				noticiaIndividual += '<div class="texto_detalle_miniatura"><img src="img/GRAY/academico.png">    Categoria: ' + entry.categoria + '</div>';
		    			break;
		    		}

		    		noticiaIndividual +='</div>';

		    		
		    		$(".contenedorFecha:last").append(noticiaIndividual);
		    		var vinculo = "nota_completa.html?idNota=" + entry.id +"&shareFB="+ entry.url + " ";
		    		$(".noticiaIndividual:last").click(function(){
				      window.location.href = vinculo;
				    });

		    	});

		    	$(".ui-loader-default").hide();
		    	cargarPreferencias();
		    	
		    },
		 	error:  function(jqXHR, textStatus, errorThrown)
		 	{
		 		$("#contenedorNoticias").empty();
		 		$('#contenedorNoticias').append("<div class='advert_msg'><img src='img/sad_face.png'</img> </br> Lo sentimos se ha producido un error al cargar las noticias. Revise su conexion a intenet y vuelva a intentar.</div>");
		 		$('.iconMenu').css("pointer-events", "none");
			}
		});

	});


	function detectaError(jqXHR, textStatus, errorThrown)
	{
		 //document.getElementById("error").innerHTML = textStatus + " " + errorThrown;
	}

	function getUnixTime(){
		var ts = Math.round((new Date()).getTime() / 1000);
		return ts;
	}

	function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Enero','Febro','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + ' de ' + month + ' del ' + year;
	  return time;
	}
function eliminarGrabacion(boton){
	var miboton = $(boton).val();
	$.post('http://localhost:9981/api/idnode/delete', {uuid: miboton}, function () {}, 'jsonp');
}

function inhabilitarGrabacion(boton){
	var miboton = $(boton).val();
	var miarr = {node: {"enabled": false, "uuid":miboton}};

	console.log(miarr);

	$.ajax({type: "POST",
			ulr: "http://localhost:9981/api/idnode/save",
			data: miarr,
			dataType: 'json'});
}
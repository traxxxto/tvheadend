function getAutorecordings(){
	var canales = new Array();

	$.post('/api/channel/list', function(data){
		$.each(data.entries, function(index, entry){
			canales[entry.key] = entry.val;
		})
	});

	$.post('/api/dvr/autorec/grid', function(data){
		var diasSemana = ['','L','M','X','J','V','S','D'];
		$.each(data.entries, function(index, entry) {
			html = '<div class="row">'+
						'<div class="col-xs-12 divEntry">'+
							'<div class="row">'+
								'<div class="col-xs-2 col-md-1">';
			if (entry.enabled == true) {
				html +=			   '<button class="btn btn-default" onclick="autorecState(this, \''+entry.uuid+'\');"><span class="glyphicon glyphicon-ok"></span></button>';
			} else {
				html +=			   '<button class="btn btn-default" onclick="autorecState(this, \''+entry.uuid+'\');"><span class="glyphicon glyphicon-ok recDisabled"></span></button>';				
			}
			html +=				'</div>'+
								'<div class="col-xs-10 col-md-11">'+
									'<div class="row">'+ // fila de titulo
										'<div class="col-xs-12 recTitle">'+
											entry.title+
										'</div>'+
									'</div>'+ // fila de titulo
									'<div class="row">'+ // fila de canal
										'<div class="col-xs-12 recFechaHora">'+
											nvl(canales[entry.channel], 'Todos los canales')+
										'</div>'+
									'</div>'+ // fila de canal
									'<div class="row">'+ // fila de dias
										'<div class="col-xs-12">';
											var misDias = new Array();
											$.each(entry.weekdays, function(index, val){
												misDias.push(diasSemana[val]);
											});
											html += misDias.join(', ');

			html +=						'</div>'+
									'</div>'+ // fila de canal
									'<div class="row">'+ // fila de titulo
										'<div class="col-xs-12 recComment">'+
											nvl(entry.comment,'')+
										'</div>'+
									'</div>'+ // fila de titulo
								'</div>'+ // col-xs-11
							'</div>'+ // row
							'<a href="add_edit_autorec.html?id='+entry.uuid+'" class="btn btn-default btn-xs btn-edit"><span class="glyphicon glyphicon-pencil"></span></a>'+
						'<div>'+ // divEntry
					'</div>'; // row

			$('#Principal').append(html);
		});


	});


};

function autorecState(el, id){
	if ($(el).children('span').first().hasClass('recDisabled')) {
		entryStateChange(id,true);
		$(el).children('span').first().removeClass('recDisabled');
	} else {
		entryStateChange(id,false);
		$(el).children('span').first().addClass('recDisabled');
	}
};


$(document).ready(function(){
	
	getAutorecordings();

});
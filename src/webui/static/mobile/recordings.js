

function getRecordings(){

	$.post('/api/dvr/entry/grid_upcoming', function(data){
			//$('#tablaPrincipal').empty();
			console.log(data);
			data.entries.sort(function(a, b){
				return ( a.start_real - b.start_real );
			});

			var htmlTxt = '';
			$.each(data['entries'], function(index, value){
				var FechaStart = new Date(0);
				var FechaStop = new Date(0);
				FechaStart.setUTCSeconds(value.start_real);
				var fecha = FechaStart.getDate()+'/'+(FechaStart.getMonth()+1)+'/'+FechaStart.getFullYear(); 
				var startTime = FechaStart.getHours()+':'+FechaStart.getMinutes();
				FechaStop.setUTCSeconds(value.stop_real);
				var stopTime = FechaStop.getHours()+':'+FechaStop.getMinutes();

				htmlTxt = '<div class="row">'+
							   '<div class="col-xs-12 divEntry">'+
							   		'<div class="row">'+
								   		'<div class="col-xs-2 col-md-1 text-right" style="padding-right: 0px;">';
				if (value.sched_status == 'recording') {
					htmlTxt += '<button class="btn btn-default"><span class="glyphicon glyphicon-record status-icon recording" onclick="javascript:cancelRecording(this, \''+value.uuid+'\');"></span></button>';
				} else if (value.sched_status == 'scheduled') {
				    htmlTxt += '<button class="btn btn-default"><span class="glyphicon glyphicon-time status-icon scheduled" onclick="javascript:disableRecording(this, \''+value.uuid+'\');"></span></button>';
				} else if (value.status =="Waiting for stream") {
					htmlTxt += '<button class="btn btn-default"><span class="status-icon glyphicon glyphicon-alert warning" onclick="javascript:cancelRecording(this, \''+value.uuid+'\');"></span></button>';			
				}
			
				htmlTxt +=	   		'</div>'+
								   		'<div class="col-xs-10 col-md-11">'+
											'<div class="row">'+
												  '<div class="col-xs-12">'+
												    '<span class="recTitle"><b>'+value.disp_title+'</b></span>'+
												  '</div>'+
											'</div>'+
											'<div class="row">'+
												  '<div class="col-xs-12 recFechaHora"><b>'+
												  	value.channelname+'</b>'+
												  '</div>'+
											'</div>'+						
											'<div class="row">'+
												  '<div class="col-xs-12 recFechaHora"><b>'+
												  	fecha+' | '+startTime+' a '+stopTime+'</b> '+
												  	'<small>'+Math.round(value.duration/60)+'min</small>'+
												  '</div>'+
											'</div>'+						
											'<div class="row">'+
											  	'<div class="col-xs-12">'+
												  '<div class="recDescr">'+nvl(value.disp_subtitle, '')+'</div>'+
											  	'</div>'+
											'</div>'+						
											'<div class="row">'+
											  	'<div class="col-xs-12">'+
												  '<div class="recComment">'+nvl(value.comment, '')+'</div>'+
											  	'</div>'+
											'</div>'+		
											
								   		'</div>'+
								   	'<div>'+
								   	'<a class="btn btn-default btn-xs btn-edit"><span class="glyphicon glyphicon-pencil"></span></a>'+				
								'</div>'+
						  '</div>';
				$('#Principal').append(htmlTxt);
			});
		}
	);

}

function disableRecording(el, id){
	if ($(el).hasClass("recDisabled")) {
			estado = "true"; $(el).removeClass("recDisabled");
		} else {
			estado = "false"; $(el).addClass("recDisabled");
		}

	entryStateChange(id, estado);
	//var datos = 'node='+encodeURIComponent('[{"enabled":'+estado+', "uuid": "'+id+'"}]');
	//$.post('/api/idnode/save', datos);
}

function cancelRecording(el, id){
	if (!confirm('Grabacion en curso.¿Seguro que quiere cancelarla?')) return false;

	
	var datos = 'uuid='+encodeURIComponent('["'+id+'"]');
	$.post('/api/dvr/entry/stop', datos, function (data){
		$(el).closest('.divEntry').remove();
	});



}

$(document).ready( function() {
	
	getRecordings();

});
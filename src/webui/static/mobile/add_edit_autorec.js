var params = '';

function populateCombos(){
	
	$.post('/api/channel/list', function(data){
		data.entries.sort(function(a,b){
			return a.val.localeCompare(b.val);
		});

		$.each(data.entries, function(index, entry){
			$('#input-channel').append('<option id="input-channel-'+index+'" value="'+entry.key+'">'+entry.val+'</option>');
		});
	});

	$.post('/api/channeltag/list', function(data){
		data.entries.sort(function(a,b){
			return a.val.localeCompare(b.val);
		});

		$.each(data.entries, function(index, entry){
			$('#input-tag').append('<option id="input-tag-'+index+'" value="'+entry.key+'">'+entry.val+'</option>');
		});

	});
}

function getAutorecord(id){
	var myNode = 'uuid='+id;
	$.post('/api/idnode/load', myNode, function(data){
		$('#input-uuid').val(data.entries[0].uuid);
		$.each(data.entries[0].params, function(index, campo){
			if (campo.type == 'str') 
				$('#input-'+campo.id).val(campo.value);
			if (campo.type == 'bool') 
				$('#input-'+campo.id).attr('checked', nvl(campo.value, true));
			if (campo.type == 'u32'){
				if (nvl(campo.list, '0') == 0) {
					$('#input-'+campo.id+'-'+campo.value).attr('checked', true);
				} else {
					$('input[name="'+campo.id+'"]').prop('checked', false);
					$.each(campo.value, function (index, val){
						$('#input-'+campo.id+'-'+val).prop('checked', true);
					});
				}
			}
			if (campo.type == 'int')
				$('#input-'+campo.id).val(campo.value);

		});

	});
}


function saveAutorecord(){
	var formData = $("#myform").serializeObject();
		console.log(JSON.stringify(formData));
	var nodo = {node: JSON.stringify(formData)};

	$.post('/api/idnode/save', nodo);


}

$(document).ready(function(){
	
	populateCombos();
	params = parseURLParams(window.location.search);
	console.log(params);
	try {
		getAutorecord(params['id'][0]);
	} catch (e) {

	}
	//if ((typeof params != "undefined") && typeof (params['id'][0]) != "undefined") getAutorecord(params['id'][0]);

});
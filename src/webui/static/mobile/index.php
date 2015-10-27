<html>
<head>
    <script src="jquery-2.1.1.min.js"></script>
    <script src="funciones.js"></script>
</head>
<body>
<?php 
	
	$res = curl_init('localhost:9981/api/dvr/entry/grid_upcoming');

	curl_setopt($res, CURLOPT_USERPWD, 'tati:tr4xt0');
	curl_setopt($res, CURLOPT_RETURNTRANSFER, 1);
	$result = curl_exec ($res);
    curl_close ($res);
    
    $datos = json_decode($result);
    
    //echo '<pre>'; print_r($datos); echo '</pre>';

    ?>
    <table>
    <?php 
     foreach($datos->entries as $undato) {
	    //echo '<pre>'; print_r($undato); echo '</pre>';
	    ?>
     	<tr>
     		<td><?= $undato->disp_title ?></td>
     		<td> 
                 <button onclick="eliminarGrabacion(this);" value="<?= $undato->uuid ?>">Eliminar</button>
                 <form method="post" action="disable.php">
                    <input name="uuid" type="hidden" value="<?= $undato->uuid ?>">
                    <input name="enabled" type="checkbox" value="1" checked="<?= $undato->enabled;  ?>" onclick="estado" >
                    <button name="node[]" type="submit" value="<?= json_encode(['enabled' => 'false', 'uuid' =>$undato->uuid]); ?>">Inhabilitar</button>
                 </form>
			</td>
     	<tr>
    <?php } ?>
</table>
</body>
</html>
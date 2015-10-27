<?php
	
	$resultado = 'node=%5B%7B%22enabled%22%3Afalse%2C%22uuid%22%3A%22'.$_POST['uuid'].'%22%7D%5D';
	var_dump($resultado);

	$res = curl_init('http://localhost:9981/api/idnode/save');

	curl_setopt($res, CURLOPT_USERPWD, 'tati:tr4xt0');
	curl_setopt($res, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($res, CURLOPT_CUSTOMREQUEST, "POST");
	curl_setopt($res, CURLOPT_POSTFIELDS, $resultado); 
	curl_setopt($res, CURLOPT_VERBOSE, true);

	$verbose = fopen('php://temp', 'w+');
	curl_setopt($res, CURLOPT_STDERR, $verbose);

	$result = curl_exec($res);
	if ($result === false) {
	    printf("cUrl error (#%d): %s<br>\n", curl_errno($res),
	           htmlspecialchars(curl_error($res)));
	}

	rewind($verbose);
	$verboseLog = stream_get_contents($verbose);

	echo "Verbose information:\n<pre>", htmlspecialchars($verboseLog), "</pre>\n";


    curl_close ($res);

    
    var_dump($result);



?> 
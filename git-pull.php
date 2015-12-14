<?php

// When used in conjunction with GitHub web hooks, this script listens for 
// a signal from GitHub. When GitHub tells us that the master or develop
// branches of our repo have been updated, we change into those directories
// and run `git pull`, which updates our code to the latest version. 

function print_log( $log ) {
        file_put_contents( 'logs/github.txt', print_r( $log, TRUE ), FILE_APPEND );
} 

$log = time() . 'Received Signal. ';

$entityBody = file_get_contents('php://input');

try {
        $payload = json_decode($entityBody);
}
catch( Exception $e ) {
        $log .= 'Couldn\'t decode payload.';
        $log .= "Error: $e";
        print_log( $log );
        die();
}

//$log .= 'Payload is:'; 
//$log .= print_r($_POST); 
//$log .= 'Request is:'; 
//$log .= print_r($_REQUEST); 
//$log .= 'The rest of it is'; 
//$log .= $entityBody; 

if ($payload->ref === 'refs/heads/master')
{
        $log .= 'Pulling master!'; 
        // path to your site deployment script
        // shell_exec('cd sanger && git pull origin master');
        shell_exec('cd sanger && git pull origin master');
} else if ($payload->ref === 'refs/heads/develop') { 
        // pull develop
        $log .= 'Got the signal to pull develop. Not pulling yet, though. '; 
} else { 
        $log .= 'Ref did not match known branch! Pulling anyway.'; 
        shell_exec('cd sanger && git pull origin master');
} 

print_log( $log ); 
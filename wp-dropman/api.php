<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization, Authorization");

// load wordpress environment
require( dirname(__FILE__) . '/../../../wp-load.php' );

// ensure wordpress has loaded
if ( ! defined( 'ABSPATH' ) ) { 
	die; 
}

// start a new session
if ( ! session_id() ) {
	session_start();
}

// if user is logged in with sufficient privileges, send the config json
if ( current_user_can( dropman_get_required_capabilities() ) ) {
	header('Content-Type: application/json');
	echo '
		{
			"oAuth": "' . dropman_get_oauth_key() . '"
		}
	';
}

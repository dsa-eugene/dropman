<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization, Authorization");

// dropman configuration

// capabilities required for use of dropman - see https://wordpress.org/support/article/roles-and-capabilities/#capabilities
define( 'DROPMAN_REQUIRED_CAPABILITIES', 'manage_options' );

// oAuth key for droplet api
define( 'DROPMAN_OAUTH_KEY', 'paste your key here' );

// end of dropman configuration

// load wordpress
require( dirname(__FILE__) . '/wp-load.php' );

// ensure wordpress has loaded
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

// start a new session
if ( ! session_id() ) {
	session_start();
}

// if user is logged in with sufficient privileges, send the config json
if ( current_user_can( DROPMAN_REQUIRED_CAPABILITIES ) ) {
	header('Content-Type: application/json');
	echo '
		{
			"oAuth": "' . DROPMAN_OAUTH_KEY . '"
		}
	';
}

<?php
header("Access-Control-Allow-Origin: *");
/*
if (
	! defined( 'ABSPATH' ) || // do not run directly
	! is_admin() || // only run from administration page
	! current_user_can( 'manage_options' ) // user must have sufficient privileges
) {
	die;
}
*/
// copypaste regular dropman config
$dropman_config_json = '
{
  "oAuth": "",
  "server": "api.digitalocean.com/v2/",
  "defaultSize": "c-4",
  "defaultFloatingIp":""
}
';
header('Content-Type: application/json');
echo $dropman_config_json;

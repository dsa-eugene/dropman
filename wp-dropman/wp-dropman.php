<?php
/*
Plugin Name: dropman
Description: Droplet Manager
Author: DSA Eugene
Version: 0
 */
if (
	! defined( 'ABSPATH' ) || // do not run directly
	! is_admin() // only run from administration page
) {
	die;
}

if ( ! session_id() ) {
	session_start();
}

add_action( 'plugins_loaded', 'dropman_init' );

function dropman_init() {
 	// user must have sufficient privileges
	if ( ! current_user_can( 'manage_options' ) ) {
		die;
	}

	define( 'DROPMAN_DIR', plugin_dir_path( __FILE__ ) );
	require_once DROPMAN_DIR . 'inc/panel.php';
}

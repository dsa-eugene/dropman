<?php
/*
Plugin Name: dropman
Description: Droplet Manager
Author: DSA Eugene
Version: 0
 */

if ( ! defined( 'ABSPATH' ) ) { die; } // do not run directly

add_action( 'plugins_loaded', 'dropman_init' );

function dropman_init() {
	define( 'DROPMAN_DIR', plugin_dir_path( __FILE__ ) );
	require_once DROPMAN_DIR . 'inc/admin_menu.php';
}

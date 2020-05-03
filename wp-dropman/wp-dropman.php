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
	define( 'DROPMAN_DIR', plugin_dir_path(__FILE__) );
	define( 'DROPMAN_URL', plugin_dir_url(__FILE__) ); // currently used only for the link until embedding the control panel actually works... so can probably be deleted once thats fixed
	require_once DROPMAN_DIR . 'inc/options.php';
	require_once DROPMAN_DIR . 'inc/admin_menu.php';
}

<?php
if ( ! defined( 'ABSPATH' ) ) { die; } // do not run directly

add_action( 'admin_menu', 'dropman_build_menu' );

function dropman_build_menu() {
	add_menu_page( 
		'Jitsu Meet Control Panel', 
		'Jitsu Meet', 
		dropman_get_required_capabilities(), 
		'dropman', 
		'dropman_build_panel' 
	);
	add_submenu_page( 
		'dropman', 
		'Jitsu Meet Control Panel', 
		'Control Panel',
		dropman_get_required_capabilities(), 
		'dropman', 
		'dropman_build_panel' 
	);
	add_submenu_page( 
		'dropman', 
		'Dropman Settings',
		'Settings',
		dropman_get_required_capabilities(), 
		'dropman_settings', 
		'dropman_build_settings' 
	);
}

function dropman_build_panel() {
	require_once DROPMAN_DIR . 'inc/admin_panel.php';
}

function dropman_build_settings() {
	require_once DROPMAN_DIR . 'inc/admin_settings.php';
}

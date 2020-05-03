<?php
if ( ! defined( 'ABSPATH' ) ) { die; } // do not run directly

add_action( 'admin_menu', 'dropman_build_menu' );

function dropman_build_menu() {
	add_menu_page( 'Jitsu Meet Control Panel', 'Jitsu Meet', 'manage_options', 'dropman', 'dropman_build_panel' );
}

function dropman_build_panel() {
	require_once DROPMAN_DIR . 'inc/panel.php';
}

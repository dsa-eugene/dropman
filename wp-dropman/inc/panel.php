<?php
if (
	! defined( 'ABSPATH' ) || // do not run directly
	! is_admin() || // only run from administration page
	! current_user_can( 'manage_options' ) // user must have sufficient privileges
) {
	die;
}

add_action( 'admin_menu', 'dropman_build_menu' );

function dropman_build_menu() {
	add_menu_page( 'Jitsu Meet Control Panel', 'Jitsu Meet', 'manage_options', 'dropman', 'dropman_build_page' );
}

function dropman_build_page() {
	echo session_id();
	//require_once DROPMAN_DIR . 'dropman/index.html';
}

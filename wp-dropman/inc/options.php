<?php
if ( ! defined( 'ABSPATH' ) ) { die; } // do not run directly

add_action( 'admin_init', 'dropman_register_settings' );

function dropman_get_oauth_key() {
	return dropman_decrypt_oauth_key( get_option( 'dropman_oauth' ) );
}

function dropman_get_required_capabilities() {
	return get_option( 'dropman_required_capabilities', 'manage_options');
}

function dropman_encrypt_oauth_key( $plaintext_oauth_key ) {
	return base64_encode(
		openssl_encrypt( 
			$plaintext_oauth_key, 
			'AES-256-OFB', 
			SECURE_AUTH_KEY, 
			OPENSSL_RAW_DATA,
			substr( NONCE_KEY, 0, 16 )
		)
	);
}

function dropman_decrypt_oauth_key( $encrypted_oauth_key ) {
	return openssl_decrypt( 
		base64_decode( $encrypted_oauth_key ), 
		'AES-256-OFB', 
		SECURE_AUTH_KEY, 
		OPENSSL_RAW_DATA,
		substr( NONCE_KEY, 0, 16 )
	);
}

function dropman_process_oauth_input( $input ) {
	return dropman_encrypt_oauth_key(
		sanitize_text_field( $input )
	);
}

function dropman_process_capabilities_input( $input ) {
	return sanitize_text_field( $input );
}

function dropman_register_settings() {
	register_setting(
		'dropman_options',
		'dropman_oauth',
		array(
			'type' => 'string',
			'sanitize_callback' => 'dropman_process_oauth_input'
		)
	);
	register_setting(
		'dropman_options',
		'dropman_required_capabilities',
		array(
			'type' => 'string',
			'sanitize_callback' => 'dropman_process_capabilities_input',
			'default' => 'manage_options'
		)
	);
}

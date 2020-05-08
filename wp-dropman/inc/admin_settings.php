<?php
if ( ! defined( 'ABSPATH' ) ) { die; } // do not run directly
?>

<div class="wrap">
	<h1>Dropman Options</h1>
	<form method="post" action="options.php">
		<?php 
		settings_fields( 'dropman_options' ); 
		do_settings_sections( 'dropman_options' );
		?>
		<table class="form-table">
			<tr valign="top">
				<th scope="row">OAuth Key</th>
				<td>
					<input
						type="text"
						name="dropman_oauth"
						value="<?php echo esc_attr( dropman_decrypt_oauth_key( get_option( 'dropman_oauth' ) ) ); ?>"
					/>
					<p class="description">OAuth key for droplet api</p>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row">Required Capabilities</th>
				<td>
				<select name="dropman_required_capabilities">
						<?php
						$user = get_user_by( 'id', '1' );
						foreach( $user->allcaps as $key=>$cap): 
						?>
							<option 
								value="<?php echo $key; ?>"
								<?php if ( $key == esc_attr( get_option( 'dropman_required_capabilities' ) ) ) { echo 'selected'; } ?> 
							>
								<?php echo $key; ?>
							</option>
						<?php endforeach; ?>
					</select>
					<p class="description">See <a href="https://wordpress.org/support/article/roles-and-capabilities/#capabilities" target="_blank">https://wordpress.org/support/article/roles-and-capabilities/#capabilities</a></p>
				</td>
			</tr>
		</table>
		<?php submit_button(); ?>
	</form>
</div>
	


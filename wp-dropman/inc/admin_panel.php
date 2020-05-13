<?php
if ( ! defined( 'ABSPATH' ) ) { die; } // do not run directly

//TODO: Set height dynamically: currently, the 700px comes from just looking at the height of it & plugging that in! Not the best...
?>
<div class="wrap">
	<iframe src="<?php echo DROPMAN_URL; ?>dropman/index.html" style="width: 100%; height: 700px;"></iframe>
	<p>Note: If it gets stuck at "Loading data...", refresh the page and try again.</p>
</div>

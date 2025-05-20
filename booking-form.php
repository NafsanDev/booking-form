<?php
/**
 * Plugin Name: Booking Form
 * Description: Tickets booking plugin
 * Plugin URI: https://nafsan.com/
 * Version: 1.0.0
 * Author: Queen's Developer
 * Author URI: https://queens-developer.com/
 * Text Domain: booking
 */

function my_booking_form(){
    $filename = sanitize_file_name('template.html');
    $full_path = realpath( $base_dir . $filename );

    return file_get_contents( $full_path );
}
add_shortcode('booking-form', 'my_booking_form');

?>

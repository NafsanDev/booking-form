<?php
/**
 * Plugin Name: Booking Form
 * Description: Tickets booking plugin
 * Plugin URI: https://nafsan.com/
 * Version: 1.0.0
 * Author: Queen's Developer
 * Author URI: https://queens-developer.com/
 * Text Domain: queensDev
 */


// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Define plugin directory constant
if ( ! defined( 'MY_PLUGIN_DIR' ) ) {
    define( 'MY_PLUGIN_DIR', plugin_dir_path( __FILE__ ) ); // Full path with trailing slash 
}

// Define plugin directory url
if ( ! defined( 'MY_PLUGIN_URL' ) ) {
    define( 'MY_PLUGIN_URL', plugin_dir_url( __FILE__ ) ); // Full path with trailing slash 
}

if ( ! class_exists( 'Booking_Form_Plus' ) ) :

class Booking_Form_Plus {

    /**
     * Constructor: hooks into WordPress.
     */
    public function __construct() {
        add_shortcode( 'booking-form', array( $this, 'shortcode_handler' ) ); // Register shortcode 
        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) ); // Enqueue front‑end assets
        add_action('wp_footer', array($this, 'add_my_js'));
    }

    /**
     * Shortcode handler: includes an HTML file from templates/.
     */
    public function shortcode_handler() {
        $file_path  = MY_PLUGIN_DIR . 'templates/template.html';

        if ( file_exists( $file_path ) && is_readable( $file_path ) ) {
            ob_start();
            include $file_path;   
            return ob_get_clean();
        }

        return;
    }

    /**
     * Enqueue front-end CSS and JS files.
     */
    public function enqueue_assets() { 

        // CSS
        wp_enqueue_style(
            'bf-style',
            MY_PLUGIN_URL . 'public/style.css',
            array() 
        );
    }
        // JS
    public function add_my_js(){
        wp_enqueue_script(
            'bf-script',
            MY_PLUGIN_URL . 'js/scripts.js',
            array( 'jquery' ),                              
            True
        );
    }
}

// Initialize the plugin
new Booking_Form_Plus();
endif;

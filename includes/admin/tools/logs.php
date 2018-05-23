<?php
/**
 * Logs UI
 *
 * @package     EDD
 * @subpackage  Admin/Tools
 * @copyright   Copyright (c) 2018, Pippin Williamson
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       3.0
*/

// Exit if accessed directly
defined( 'ABSPATH' ) || exit;

/**
 * Setup the logs view
 *
 * @since 3.0
 *
 * @param type $type
 * @return boolean
 */
function edd_logs_view_setup( $type = '' ) {

	// Bail if cannot view
	if ( ! current_user_can( 'view_shop_reports' ) ) {
		return false;
	}

	// Includes
	require_once ABSPATH        . 'wp-admin/includes/class-wp-list-table.php';
	require_once EDD_PLUGIN_DIR . 'includes/admin/reporting/class-base-logs-list-table.php';
	require_once EDD_PLUGIN_DIR . 'includes/admin/reporting/class-' . sanitize_key( $type ) . '-logs-list-table.php';

	// Done!
	return true;
}

/**
 * Output the log page
 *
 * @since 3.0
 *
 * @param object $logs_table List table class to work with
 * @param string $tag        Type of log to view
 */
function edd_logs_view_page( $logs_table, $tag = '' ) {
	$tag = sanitize_key( $tag );
	$logs_table->prepare_items(); ?>

	<div class="wrap">
		<?php
		/**
		 * Fires at the top of the File Downloads logs view.
		 *
		 * @since 3.0
		 */
		do_action( "edd_logs_{$tag}_top" ); ?>

		<form id="edd-logs-filter" method="get" action="<?php echo admin_url( 'edit.php?post_type=download&page=edd-tools&tab=' . $tag ); ?>">
			<input type="hidden" name="post_type" value="download" />
			<input type="hidden" name="page" value="edd-tools" />
			<input type="hidden" name="tab" value="<?php echo esc_attr( $tag ); ?>" />
			<?php
			wp_nonce_field( -1, 'edd_filter', false );
			$logs_table->views();
			$logs_table->advanced_filters();
			$logs_table->display();
			?>
		</form>

		<?php
		/**
		 * Fires at the bottom of the File Downloads logs view.
		 *
		 * @since 3.0
		 */
		do_action( "edd_logs_{$tag}_bottom" ); ?>

	</div>
<?php
}

/** Views *********************************************************************/

/**
 * Sales Log View
 *
 * @since 1.4
 * @uses EDD_Sales_Log_Table::prepare_items()
 * @uses EDD_Sales_Log_Table::display()
 * @return void
 */
function edd_logs_view_sales() {

	// Setup or bail
	if ( ! edd_logs_view_setup( 'sales' ) ) {
		return;
	}

	$logs_table = new EDD_Sales_Log_Table();

	edd_logs_view_page( $logs_table, 'sales' );
}
add_action( 'edd_logs_view_sales', 'edd_logs_view_sales' );

/**
 * File Download Logs
 *
 * @since 1.4
 * @uses EDD_File_Downloads_Log_Table::prepare_items()
 * @uses EDD_File_Downloads_Log_Table::search_box()
 * @uses EDD_File_Downloads_Log_Table::display()
 * @return void
 */
function edd_logs_view_file_downloads() {

	// Setup or bail
	if ( ! edd_logs_view_setup( 'file-downloads' ) ) {
		return;
	}

	$logs_table = new EDD_File_Downloads_Log_Table();

	edd_logs_view_page( $logs_table, 'file_downloads' );
}
add_action( 'edd_logs_view_file_downloads', 'edd_logs_view_file_downloads' );

/**
 * Gateway Error Logs
 *
 * @since 1.4
 * @uses EDD_File_Downloads_Log_Table::prepare_items()
 * @uses EDD_File_Downloads_Log_Table::display()
 * @return void
 */
function edd_logs_view_gateway_errors() {

	// Setup or bail
	if ( ! edd_logs_view_setup( 'gateway-error' ) ) {
		return;
	}

	$logs_table = new EDD_Gateway_Error_Log_Table();

	edd_logs_view_page( $logs_table, 'gateway_errors' );
}
add_action( 'edd_logs_view_gateway_errors', 'edd_logs_view_gateway_errors' );

/**
 * API Request Logs
 *
 * @since 1.5
 * @uses EDD_API_Request_Log_Table::prepare_items()
 * @uses EDD_API_Request_Log_Table::search_box()
 * @uses EDD_API_Request_Log_Table::display()
 * @return void
 */

function edd_logs_view_api_requests() {

	// Setup or bail
	if ( ! edd_logs_view_setup( 'api-requests' ) ) {
		return;
	}

	$logs_table = new EDD_API_Request_Log_Table();

	edd_logs_view_page( $logs_table, 'api_requests' );
}
add_action( 'edd_logs_view_api_requests', 'edd_logs_view_api_requests' );


/**
 * Default Log Views
 *
 * @since 1.4
 * @return array $views Log Views
 */
function edd_log_default_views() {
	/**
	 * Filters the default logs views.
	 *
	 * @since 1.4
	 *
	 * @param array $views Logs views. Each key/value pair represents the view slug
	 *                     and label, respectively.
	 */
	return apply_filters( 'edd_log_views', array(
		'file_downloads'  => __( 'File Downloads', 'easy-digital-downloads' ),
		'sales' 		  => __( 'Sales',          'easy-digital-downloads' ),
		'gateway_errors'  => __( 'Payment Errors', 'easy-digital-downloads' ),
		'api_requests'    => __( 'API Requests',   'easy-digital-downloads' )
	) );
}

/**
 * Renders the Reports page views drop down
 *
 * @since 1.3
 * @since 3.0 deprecated
 *
 * @return void
*/
function edd_log_views() {
	$views        = edd_log_default_views();
	$current_view = isset( $_GET['view'] ) && array_key_exists( $_GET['view'], edd_log_default_views() )
		? sanitize_text_field( $_GET['view'] )
		: 'file_downloads'; ?>

	<select id="edd-logs-view" name="view">
		<?php foreach ( $views as $view_id => $label ) : ?>
			<option value="<?php echo esc_attr( $view_id ); ?>" <?php selected( $view_id, $current_view ); ?>><?php echo esc_html( $label ); ?></option>
		<?php endforeach; ?>
	</select>

	<?php
	/**
	 * Fires immediately after the logs view actions are rendered in the Logs screen.
	 *
	 * @since 1.3
	 */
	do_action( 'edd_log_view_actions' );
}
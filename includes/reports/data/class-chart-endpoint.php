<?php
/**
 * Reports API - Chart Endpoint Handler
 *
 * @package     EDD
 * @subpackage  Reports
 * @copyright   Copyright (c) 2018, Pippin Williamson
 * @license     http://opensource.org/licenses/gpl-2.0.php GNU Public License
 * @since       3.0
 */
namespace EDD\Reports\Data;

use EDD\Reports\Data\Charts\v2 as Chart;

/**
 * Handler for building a chart endpoint in the Reports API.
 *
 * @since 3.0
 */
class Chart_Endpoint extends Endpoint {

	/**
	 * Endpoint view (type).
	 *
	 * @since 3.0
	 * @var   string
	 */
	protected $view = 'chart';

	/**
	 * Represents the chart type.
	 *
	 * @since 3.0
	 * @var   string
	 */
	private $type;

	/**
	 * Sets up the chart endpoint.
	 *
	 * @since 3.0
	 *
	 * @param array $args Chart endpoint attributes.
	 */
	public function __construct( array $args ) {
		parent::__construct( $args );

		if ( ! empty( $args['type'] ) ) {
			$this->set_type( $args['type'] );
		} else {
			// TODO: Throw exception.
		}

		if ( ! empty( $args['options'] ) ) {
			$this->set_options( $options );
		} else {
			// TODO: Throw exception.
		}
	}

	/**
	 * Retrieves the graphing library options set for the current endpoint.
	 *
	 * @since 3.0
	 *
	 * @return array Options set for the current graph endpoint.
	 */
	public function get_options() {
		return $this->options;
	}

	/**
	 * Sets options for displaying the graph.
	 *
	 * @since 3.0
	 *
	 * @param array $options Options for displaying the graph via the graphing library.
	 */
	protected function set_options( $options ) {
		$this->options = $options;

		$manifest = new Chart\Manifest( $this->get_type(), $options );
	}

	/**
	 * Retrieves the value of a graph option if set.
	 *
	 * @since 3.0.0
	 *
	 * @param string $key Option key to retrieve a value for.
	 * @return mixed Value of the option key if set, otherwise an empty string.
	 */
	public function get( $key ) {
		if ( isset( $this->options[ $key ] ) ) {
			$value = $this->options[ $key ];
		} else {
			$value = '';
		}

		return $value;
	}

	/**
	 * Retrieves the chart type.
	 *
	 * @since 3.0
	 *
	 * @return string Chart type.
	 */
	public function get_type() {
		return $this->type;
	}

	/**
	 * Sets the chart type.
	 *
	 * @since 3.0
	 *
	 * @param string $type Chart type to set.
	 */
	private function set_type( $type ) {
		$this->type = sanitize_key( $type );
	}

	/**
	 * Builds and outputs the graph JS to the page.
	 *
	 * @since 3.0
	 */
	public function build_graph() {
		$data = $this->get_data();

		if ( empty( $data ) ) {
			return;
		}

		$dataset_count = count( $data );
		$current       = 0;
		$target_el     = $this->get_display_arg( 'target', 'edd-reports-graph' );
		?>
		<canvas id="<?php echo esc_attr( $target_el ); ?>"></canvas>

		<script type="application/javascript">

			var date = moment( 'today', 'MMMM DD YYYY' );

			var lineChartData = {
				<?php foreach ( $data as $set => $atts ) : ?>
				datasets: [{
					label: <?php echo empty( $atts['label' ] ? '' : esc_js( $atts['label'] ) ); ?>,
					borderColor: <?php echo empty( $atts['border_color'] ) ? 'rgb(237,194,64)' : esc_js( $atts['border_color'] ); ?>,
					backgroundColor: <?php echo empty( $atts['bg_color'] ) ? 'rgb(237,194,64)' : esc_js( $atts['bg_color'] ); ?>,
					fill: false,

					data: [
						<?php
						if ( ! empty( $atts['data'] ) ) :
						foreach ( $atts['data'] as $index => $axes ) :
						$axes_count = count( $axes );
						?>
						{
							<?php if ( 2 === $axes_count  ) : ?>
							x: moment( <?php echo $axes[0] * 1000; ?> ),
							y: <?php echo $axes[1]; ?>
							<?php elseif ( 1 === $axes_count ) : ?>
							x: moment( <?php echo $axes[0] * 1000; ?> ),
			<?php endif; ?>
			},
			<?php
			endforeach;
			endif;
			?>
			],
			<?php if ( ++$current !== $dataset_count ) : ?>
			}, {
				<?php endif; ?>
				<?php endforeach; ?>
			};
			};

			myLine = Chart.Line( $( '#<?php echo esc_js( $target_el ); ?>' ), {
				data: lineChartData,
				options: {
					responsive: true,
					hoverMode: 'index',
					stacked: false,
					title:{
						display: true,
						text: <?php echo esc_js( $this->get_label() ); ?>
					},
					scales: {
						yAxes: [{
							type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
							display: true,
							position: "left",
							id: "y-axis-1",
						} ],
						xAxes: [{
							type: 'time',
							display: true,
							id: 'x-axis-1',
							ticks: {
								source: 'auto',
							},
							time: {
								min: moment().startOf( 'day' ),
								max: moment().endOf( 'day' ),
								unit: 'hour',
								displayFormats: {
									day: 'MMM D',
								}
							},
						} ],
					}
				}
			});

		</script>
		<?php
	}

}

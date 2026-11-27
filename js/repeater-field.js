/**
 * Add/remove/reorder rows and per-row image selection for `repeater`-type
 * settings fields (see cb_istp2027_render_repeater_field() in
 * inc/options.php). Generic — works for any repeater's sub-fields without
 * knowing their names, since row markup (including the empty-row
 * <template>) is fully rendered server-side; this only wires interactions.
 *
 * Row reordering is a plain DOM move — submitted field order follows DOM
 * order, and PHP preserves array insertion order regardless of the actual
 * (non-sequential) row index values, so nothing needs renumbering server-
 * side. The visible 1/2/3 row-number badge is purely cosmetic though, and
 * does need renumbering here after every add/remove/move.
 *
 * @package cb-istp2027
 */
( function ( $ ) {
	'use strict';

	function renumberRows( $rowsWrap ) {
		$rowsWrap.find( '.cb-istp2027-settings-repeater__row' ).each( function ( i ) {
			$( this ).find( '.cb-istp2027-settings-repeater__number' ).text( i + 1 );
		} );
	}

	function bindImagePicker( $row ) {
		$row.find( '.cb-istp2027-settings-repeater__select-image' ).on( 'click', function ( event ) {
			event.preventDefault();

			var $button = $( this );
			var $wrap = $button.closest( '.cb-istp2027-settings-repeater__image, .cb-istp2027-settings-repeater__file' );

			var frame = wp.media( {
				title: $button.data( 'select-label' ),
				button: { text: $button.data( 'button-text' ) || 'Use this image' },
				multiple: false,
			} );

			frame.on( 'select', function () {
				var attachment = frame.state().get( 'selection' ).first().toJSON();
				var src = attachment.sizes && attachment.sizes.thumbnail
					? attachment.sizes.thumbnail.url
					: attachment.url;

				$wrap.find( '.cb-istp2027-settings-repeater__image-input' ).val( attachment.id );
				$wrap.find( 'img' ).attr( 'src', src ).show();
				$wrap.find( '.cb-istp2027-settings-repeater__file-name' ).text( attachment.filename || attachment.title || '' );
				$wrap.find( '.cb-istp2027-settings-repeater__clear-image' ).show();
			} );

			frame.open();
		} );

		$row.find( '.cb-istp2027-settings-repeater__clear-image' ).on( 'click', function ( event ) {
			event.preventDefault();

			var $button = $( this );
			var $wrap = $button.closest( '.cb-istp2027-settings-repeater__image, .cb-istp2027-settings-repeater__file' );

			$wrap.find( '.cb-istp2027-settings-repeater__image-input' ).val( '' );
			$wrap.find( 'img' ).attr( 'src', '' ).hide();
			$wrap.find( '.cb-istp2027-settings-repeater__file-name' ).text( 'No file selected.' );
			$button.hide();
		} );
	}

	function bindRowActions( $row, $rowsWrap ) {
		$row.find( '.cb-istp2027-settings-repeater__remove-row' ).on( 'click', function ( event ) {
			event.preventDefault();
			$row.remove();
			renumberRows( $rowsWrap );
		} );

		$row.find( '.cb-istp2027-settings-repeater__move-up' ).on( 'click', function ( event ) {
			event.preventDefault();
			var $prev = $row.prev( '.cb-istp2027-settings-repeater__row' );
			if ( $prev.length ) {
				$row.insertBefore( $prev );
				renumberRows( $rowsWrap );
			}
		} );

		$row.find( '.cb-istp2027-settings-repeater__move-down' ).on( 'click', function ( event ) {
			event.preventDefault();
			var $next = $row.next( '.cb-istp2027-settings-repeater__row' );
			if ( $next.length ) {
				$row.insertAfter( $next );
				renumberRows( $rowsWrap );
			}
		} );

		bindImagePicker( $row );
	}

	// URL fields: type-ahead over pages/posts via core's REST search. Delegated
	// so rows cloned from the template work. Same-site picks are stored as
	// root-relative paths so they survive moving between environments.
	$( document ).on( 'focus', '.cb-istp2027-url-input', function () {
		var $input = $( this );
		var cfg = window.cbIstp2027UrlSearch;

		if ( $input.data( 'ui-autocomplete' ) || ! cfg ) {
			return;
		}

		$input.autocomplete( {
			minLength: 2,
			source: function ( request, response ) {
				$.ajax( {
					url: cfg.endpoint,
					data: { search: request.term, per_page: 10, type: 'post' },
					beforeSend: function ( xhr ) {
						xhr.setRequestHeader( 'X-WP-Nonce', cfg.nonce );
					},
				} ).done( function ( results ) {
					response( results.map( function ( r ) {
						var path = r.url.indexOf( cfg.origin ) === 0 ? r.url.slice( cfg.origin.length ) || '/' : r.url;
						return { label: r.title + ' (' + path + ')', value: path };
					} ) );
				} ).fail( function () {
					response( [] );
				} );
			},
		} );
	} );

	$( function () {
		$( '.cb-istp2027-settings-repeater' ).each( function () {
			var $field = $( this );
			var $rowsWrap = $field.find( '.cb-istp2027-settings-repeater__rows' );
			var templateHtml = $field.find( 'template' )[ 0 ].innerHTML;
			var rowCounter = 0;

			$rowsWrap.find( '.cb-istp2027-settings-repeater__row' ).each( function () {
				bindRowActions( $( this ), $rowsWrap );
			} );

			$field.find( '.cb-istp2027-settings-repeater__add-row' ).on( 'click', function ( event ) {
				event.preventDefault();
				rowCounter += 1;
				var index = 'new_' + Date.now() + '_' + rowCounter;
				var $row = $( templateHtml.split( '__INDEX__' ).join( index ) );
				$rowsWrap.append( $row );
				bindRowActions( $row, $rowsWrap );
				renumberRows( $rowsWrap );
			} );
		} );
	} );
} )( jQuery );

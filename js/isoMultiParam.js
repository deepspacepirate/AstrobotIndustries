// https://codepen.io/desandro/pen/btFfG?editors=1010
// dependencies: 
// 		isoMasonry.js

var filters = {};

$(document).ready(function() {
	// do stuff when checkbox change
	$('#searchParams').on( 'change', function( event ) {
		var checkbox = event.target;
		var $checkbox = $(checkbox);

		if ($checkbox.hasClass('all')){
			// reset checkboxes, remove filters
			$('input:checkbox').prop('checked', false);
			filters = {};

			// reset quicksearch
			if($('#quicksearch')) {
				$('#quicksearch').val('');
				qsRegex = new RegExp( /(?:)/gi );
			}
		}
		else {
			var group = $checkbox.parents('.selector-group').attr('data-group');

			// create array for filter group, if not there yet
			var filterGroup = filters[ group ];
			if ( !filterGroup ) filterGroup = filters[ group ] = [];

			// add/remove filter
			if ( checkbox.checked ) filterGroup.push( $checkbox.attr('data-filter') );
			else { // remove filter
				var index = filterGroup.indexOf( $checkbox.attr('data-filter') );
				filterGroup.splice( index, 1 ); // removed one element at index
			}
		}

		buttonFilter = getComboFilter();
		$grid.isotope();
	});
});

function getComboFilter() {
	var combo = [];
	for ( var prop in filters ) {
		var group = filters[ prop ];
		if ( !group.length ) continue; // no filters in group, carry on

		
		if ( !combo.length ) { // add first group
			combo = group.slice(0);
			continue;
		}
		
		var nextCombo = []; // add additional groups

		// split group into combo: [ A, B ] & [ 1, 2 ] => [ A1, A2, B1, B2 ]
		for ( var i=0; i < combo.length; i++ ) {
			for ( var j=0; j < group.length; j++ ) {
				var item = combo[i] + group[j];
				nextCombo.push( item );
			}
		}
		combo = nextCombo;
	}
	var comboFilter = combo.join(', ');
	return comboFilter;
}
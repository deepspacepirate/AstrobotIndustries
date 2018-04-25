$(document).ready(function() {
	// use value of search field to filter
	var $quicksearch = $('#quicksearch').keyup( debounce( function() {
		// define regex
		qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		$grid.isotope();
	}) );
});
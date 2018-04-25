// dependencies: 
// 	isoMasonry.js
// 	Ben Alen's debounce

$(document).ready(function() {
	var $quicksearch = $('#quicksearch').keyup( $.debounce(300, function() {
		qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		$grid.isotope();
	}));
});
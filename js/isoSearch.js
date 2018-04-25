$(document).ready(function() {
	$('#searchParams').on( 'click', 'button', function() {
		buttonFilter = $( this ).attr('data-filter');
		console.log(buttonFilter);
		$grid.isotope();
	});

	// use value of search field to filter
	var $quicksearch = $('#quicksearch').keyup( debounce( function() {
		qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		$grid.isotope();
	}) );

	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
		});
	});

});
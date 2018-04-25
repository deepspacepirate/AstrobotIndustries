$(document).ready(function() {
	$('#searchParams').on( 'click', 'button', function() {
		buttonFilter = $( this ).attr('data-filter');
		$grid.isotope();
	});
	
	// change is-checked class on buttons
	$('.button-group').each( function( i, buttonGroup ) {
		var $buttonGroup = $( buttonGroup );
		$buttonGroup.on( 'click', 'button', function() {
			$buttonGroup.find('.is-checked').removeClass('is-checked');
			$( this ).addClass('is-checked');
		});
	});
});
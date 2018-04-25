// quick search regex
var qsRegex;
var buttonFilter;
var $grid;

$(document).ready(function() {
	// init Isotope
	$grid = $('.grid').isotope({
		itemSelector: '.grid-item',
		filter: function() {
			var $this = $(this);
			var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
			var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
			return searchResult && buttonResult;
		}
	});

	window.onload = function(){ $grid.isotope(); }
});


// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
	var timeout;
	threshold = threshold || 200;
	return function debounced() {
		clearTimeout( timeout );
		var args = arguments;
		var _this = this;
		function delayed() {
			fn.apply( _this, args );
		}
		timeout = setTimeout( delayed, threshold );
	};
}

// Find number of cards per row on pages with masonry
function changeNumCards() {
	var bodyWidth = $(".bodyContent-inner").width();
	var card = $(".grid-item");

	var numCards;
	var cardWidth;
	if (bodyWidth <= 750) cardWidth = '100%';
	else {
		numCards =  Math.floor(bodyWidth/ parseInt(card.css('min-width')) ) ;
		cardWidth = 100/numCards + '%';
	}
	card.css('width', cardWidth);
	return cardWidth;
}
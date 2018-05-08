// https://codepen.io/desandro/pen/mCdbD
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

	// $(window).on({
	// 	load: function(){ $grid.isotope() },
	// 	resize: $.debounce(50, changeNumCards)
	// });
	window.onload = function(){ $grid.isotope(); }
	window.onresize = $.debounce(50, changeNumCards);
});

// Find number of cards per row on pages with masonry
function changeNumCards() {
	var bodyWidth = $(".bodyContent-inner").width();
	var card = $(".grid-item");

	var numCards;
	var cardWidth;
	if (bodyWidth <= 595) { // keep this limit equal to min-width in masonry.css
		cardWidth = '100%';
	}
	else {
		numCards =  Math.floor(bodyWidth/ parseInt(card.css('min-width')) ) ;
		cardWidth = 100/numCards + '%';
	}
	card.css('width', cardWidth);
	return cardWidth;
}
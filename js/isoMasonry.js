// https://codepen.io/desandro/pen/mCdbD
$(document).ready(function() {
	var GridObject = new Grid( $('.grid') );
});

function Grid(el){
	// init isotope
	this.qsRegex;
	this.buttonFilter;
	this.callback;
	this.filters = {};
	this.$quicksearch;

	var $Grid = this;

	this.$grid = el.isotope({
		itemSelector: '.grid-item',
		filter: function() {
			var $this = $(this);
			var searchResult = $Grid.qsRegex ? $this.text().match( $Grid.qsRegex ) : true;
			var buttonResult = $Grid.buttonFilter ? $this.is( $Grid.buttonFilter ) : true;
			return searchResult && buttonResult;
		}
	});

	window.onload = function(){ 
		$Grid.changeNumCards(); 
		$Grid.$grid.isotope('layout'); 
	}
	window.onresize = $.debounce(100, function(){
		console.log("resize");
		$Grid.changeNumCards();
		$Grid.$grid.isotope('layout');
	});

	// do stuff when checkbox changes
	if ( $('#searchParams') )
		$('#searchParams').on( 'change', function(event) {
			$Grid.multiParam(event);
		});
	
	// do stuff when searchbar changes
	if ( $('#quicksearch') )
		$Grid.$quicksearch = $('#quicksearch').keyup( $.debounce(300, function() {
			$Grid.qsRegex = new RegExp( $Grid.$quicksearch.val(), 'gi' );
			$Grid.$grid.isotope();
		}));
}

// Find number of cards per row on pages with masonry
Grid.prototype.changeNumCards = function() {
	var bodyWidth = $(".bodyContent-inner").width();
	var card = this.$grid.find(".grid-item");

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
};

// https://codepen.io/desandro/pen/btFfG
Grid.prototype.multiParam = function(event){
	var checkbox = event.target;
	var $checkbox = $(checkbox);

	if ($checkbox.hasClass('all')){
		// reset checkboxes, remove filters
		$('input:checkbox').prop('checked', false);
		this.filters = {};

		// reset quicksearch
		if($('#quicksearch')) {
			$('#quicksearch').val('');
			this.qsRegex = new RegExp( /(?:)/gi );
		}
	}
	else {
		var group = $checkbox.parents('.selector-group').attr('data-group');
		// create array for filter group, if not there yet
		var filterGroup = this.filters[ group ];
		if ( !filterGroup ) filterGroup = this.filters[ group ] = [];

		// add/remove filter
		if ( checkbox.checked ) filterGroup.push( $checkbox.attr('data-filter') );
		else { // remove filter
			var index = filterGroup.indexOf( $checkbox.attr('data-filter') );
			filterGroup.splice( index, 1 ); // removed one element at index
		}
	}
	var $this = this;
	this.buttonFilter = this.getComboFilter();
	this.$grid.isotope();
};

Grid.prototype.getComboFilter = function(){
	var combo = [];
	for ( var prop in this.filters ) {
		var group = this.filters[ prop ];
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
};

Grid.prototype.unique = function(array) {
    return $.grep(array, function(el, index) {
        return index === $.inArray(el, array);
    });
}

var lastScrollTop = 0;

$(document).ready(function() {

	screenResize();

	if (window.innerWidth > 650) {
		var t;
		window.onresize = function() {
		    clearTimeout(t);
		    t = setTimeout(function() {
			    screenResize();
				console.log('resize event');
		   	}, 250);
		};
	}

	$('#menuButton').on('click', toggleHamStack());
	// sticky( $('#chaticon') );

	window.addEventListener("scroll", bringmenu, false);

});

function bringmenu() {
	var st = window.pageYOffset || document.documentElement.scrollTop;
	$('#navbar').css('position', 'fixed');

     if (st > lastScrollTop){
		$('#navbar').css('top', '-100%');
     }
	else {
 	    $('#navbar').css('top', '0');
     }

	lastScrollTop = st;
}

// Resize body width
function screenResize() {
	$('#bodyContent').css( 'margin-top', $('#navbar')[0].offsetHeight+20);
	scale($("#bodyContent"), 'width', '%', window.innerWidth, 650, 100, 900, 90, 2000, 70);
	scale($("body"), 'font-size', 'px', window.innerWidth, 800, 9, 1200, 10, 2000, 12);
	scale($(".img-circle"), 'width', 'em', window.innerWidth, 500, 7, 1200, 8.5, 2000, 12);
	changeNumCards();
	// if (window.innerWidth > 650){
	// 	$('.grid').masonry({
	// 		itemSelector: '.grid-item',
	// 	});
	// 	changeNumCards();
	// }

}

function scale(element, property, unit, x, x1, y1, x2, y2, x3, y3){
	if (x <= x1) {
		element.css(property, y1 + unit);
	}
	else if (x > x1 && x < x2) {
		element.css(property, Math.floor( Y(x1, y1, x2, y2, x) ) + unit );
	}
	else if (x > x2 && x < x3){
		element.css(property, Math.floor( Y(x2, y2, x3, y3, x) ) + unit );
	}
	else element.css(property, Math.floor(y3) + unit );
}

function Y(x1, y1, x2, y2, x) { // given two points (x1, y1), (x2, y2), and input, returns y for given x_input
	var y = (y2-y1)/(x2-x1) * (x - x1) + y1 ;
	return y;
}

// Menu toggle
$('#menuButton').click(function(){
	toggleHamStack();
	console.log('menu toggle button clicked');
});

function toggleHamStack() { // pure js
    var nav = document.getElementById('navbar');
    if (nav.classList.contains('hamExpand')) {
	    nav.classList.remove('hamExpand');
	    console.log('menu collapsed');
    }
    else {
	    nav.classList.add('hamExpand');
	    console.log('menu expanded');
    }
}
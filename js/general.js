var page = window.location.pathname.split('/').pop();
// var page = location.href.split("/").slice(0,11); 
page.replace(".html", "");

console.log(page);

if(window.location.href.indexOf(page) > -1) {
   console.log(	'your url contains the name ' + page);
}

var lastScrollTop = 0;
var timer;
screenResize();


$(document).ready(function() {

	$('#bodyContent').css( 'margin-top', $('#navbar')[0].offsetHeight+20);
	screenResize();

	if (window.innerWidth > 650) {
		var t;
		window.onresize = function() {
			clearTimeout(t);
			t = setTimeout(function() {
				screenResize();
				console.log('resize event');
			}, 200);
		};
	}

	$('#menuButton').on('click', toggleHamStack);
	// sticky( $('#chaticon') );


	$(window).scroll(function(){
		if ( timer ) clearTimeout(timer);
		timer = setTimeout( bringmenu, 200);
	});

	// setInterval( bringmenu, 250);


});

function bringmenu() {
	var st = window.pageYOffset || document.documentElement.scrollTop;  
		if (st > lastScrollTop) {
			$('#navbar').css('top', '-100%');
		} 
		else if (st < lastScrollTop) {
			$('#navbar').css('top', 0);
		}
	lastScrollTop = st;
}

// Resize body width
function screenResize() {
	scale($("#bodyContent"), 'width', '%', window.innerWidth, 650, 100, 900, 90, 2000, 70);
	scale($("body"), 'font-size', 'px', window.innerWidth, 800, 9, 1200, 10, 2000, 12);
	scale($(".img-circle"), 'width', 'em', window.innerWidth, 500, 7, 1200, 8.5, 2000, 12);

	if ( page === 'projects.html'){
		changeNumCards();
		console.log('numcards changed');

		if (window.innerWidth > 650){

			$('.grid').masonry({
				itemSelector: '.grid-item',
			});
		}
	}
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

function toggleHamStack() {
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

function sticky(element) {
	var position = element.offset().top;
	if ( $(window).scrollTop() >= position) {
		element.addClass('sticky');
		console.log('stuck');
	}
	else {
		element.removeClass('sticky');
		console.log('unstuck');
	}
}

// Find number of cards per row
function changeNumCards() {
	var bodyWidth = $("#bodyContent").width();
	var card = $(".grid-item");

	var numCards;
	var cardWidth;
	if (bodyWidth <= 750) cardWidth = '100%';
	else {
		numCards =  Math.floor(bodyWidth/ parseInt(card.css('min-width')) ) ;
		cardWidth = 100/numCards + '%';
	}
	card.css('width', cardWidth);
	console.log( bodyWidth + ' ' + numCards + ' ' + cardWidth )
}

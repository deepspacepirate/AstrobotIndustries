// Get page name, for activating almonds
var page = window.location.pathname.split('/').pop();
page = page.replace(".html", "");

var topFly = window.innerHeight - $('#navbar').outerHeight();

// Current distance from top, for bringmenu()
var lastScrollTop1 = 0;
var lastScrollTop2 = 0;

// For scroll timeout
var timer0, timer1, timer2;

var navStuck = false;

$(document).ready(function() {

	// var defaultText
	screenResize();

	// Activate your almonds
	$('#navbar').children().each( function(){
		var element = $(this);
		var navTitle = element.text();
		navTitle = navTitle.toLowerCase();
		if (navTitle == page) {
			element.addClass('active');
		}
		if ( navTitle === 'blog' || navTitle === 'endeavors') element.hide();
	});

	// Position body content from top
	$('#bodyContent').css( 'margin-top', $('#navbar').outerHeight() + 20);
	screenResize();

	// Adjust with of body content
	if (window.innerWidth > 650) {
		window.onresize = function() {
			clearTimeout(timer0);
			timer0 = setTimeout(screenResize, 200);
		};
	}

	$('#menuButton').click(toggleHamStack);
	// sticky( $('#chaticon') );

	// Detect scroll, bring/hide navbar
	$(window).scroll(function(){
		if (page != 'index'){
			if ( timer1 ) clearTimeout(timer1);
			timer1 = setTimeout( bringmenu, 50 );
		}
	});

	// Home sticky menu
	$(window).scroll(function(){
		if (page === 'index' ) {
			var headerHeight = $('.header').offset().top + $('.header').outerHeight();
			var indHeight = $('.ind').offset().top;
			var st = $(window).scrollTop();
			
			if ( !navStuck && headerHeight < st ) {
				$('#navbar').css('position', 'fixed');
				$('#navbar').css('top', '0');
				$('#bodyContent').css('margin-top', '8em')
				navStuck = true;
			}
			else if ( navStuck && headerHeight > st ){
				$('#navbar').css('position', 'relative');
				$('#bodyContent').css('margin-top', '2em')
				navStuck = false;
			}

			if ( indHeight < st ) {
				$('.ind').addClass('swing');
			}
		}
	});


});

function debounce(f, t) {
	clearTimeout(timer);
	timer = setTimeout(f, t);
}

function bringmenu() {
	var st = window.pageYOffset || document.documentElement.scrollTop;  
		if (st > lastScrollTop1 + 10) {
			$('#navbar').css('top', '-6em');
			$('#navbar').removeClass('hamExpand');
		} 
		else if (st < lastScrollTop1 -10) {
			$('#navbar').css('top', 0);
		}
	lastScrollTop1 = st;
}


// All the thins to do when screen is resized
function screenResize() {
	scale($("#bodyContent"), 'width', '%', window.innerWidth, 650, 100, 900, 90, 2000, 70);
	scale($("body"), 'font-size', 'px', window.innerWidth, 800, 9, 1200, 10, 2000, 12);

	if ( page === 'about' ){
		scale($(".img-circle"), 'width', 'em', window.innerWidth, 500, 7, 1200, 8.5, 2000, 12);
	}

	if ( page === 'projects' || page === 'academics'){
		changeNumCards();
		if (window.innerWidth > 650) { $('.grid').masonry({itemSelector: '.grid-item'}); }
	}
}

// Scale property of element to another element (x). Set points as (x1, y1), (x2, y2), (x3, y3)
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

// Given two points (x1, y1), (x2, y2), and x-input, returns y-output
function Y(x1, y1, x2, y2, x) { 
	var y = (y2-y1)/(x2-x1) * (x - x1) + y1 ;
	return y;
}

// Open/close collapsed navbar
function toggleHamStack() {
	$('#navbar').toggleClass('hamExpand');
}

// Stick things to top when scrolled to
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
}

// Get page name, for activating almonds, directory navigation
var path = window.location.pathname,
	// file = path.match(/[^\/]+$/)[0],
	page = path.match(/[^\/]+(?=\.html)/)[0] // match faster than split+pop https://jsperf.com/split-pop-vs-regex-match
	rootpath = path.match(/^.+AstrobotIndustries\//)[0];

// Current distance from top, for bringmenu()
var lastScrollTop1 = 0;
var lastScrollTop2 = 0;

// For scroll timeout
var timer0, timer1, timer2;

var navStuck = false;
var navOpen = false;

$(document).ready(function() {
	console.log('Well, aren\'t you nosy. Click on the $$$$$ checkbox twelve times.');
	console.log(page);
	// console.log(getCookie('daynight'));
	// if (getCookie('daynight') == 'night' ) ldToggle();
	$('.toggle').click(ldToggle);

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
	screenResize();
	if (page != 'index') $('#bodyContent').css( 'margin-top', $('#navbar').outerHeight() + 20);

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
	$(window).scroll(navStick);


});

function ldToggle() {
		screenResize();

		var newfront = $('.back')
		var newback = $('.front')

		newfront.addClass('front');
		newfront.removeClass('back');

		newback.removeClass('front');
		newback.addClass('back');

		if(document.getElementById("darkCSS") == null) {
			$('head').append('<link id="darkCSS" rel="stylesheet" type="text/css" href="' + rootpath + '/css/dark.css">');
			newfront.css('background-color', '#243b6d')
			newback.css('background-color', 'skyblue')
			setCookie('daynight', 'night', .5)
			console.log(getCookie('daynight'));
		}
		else {
			$('#darkCSS').remove();
			newback.css('background-color', '#243b6d')
			newfront.css('background-color', 'skyblue')
			setCookie('daynight', 'day', .5)
			console.log(getCookie('daynight'));
		}
		if ( page === 'projects' || page === 'academics'){
			changeNumCards();
			if (window.innerWidth > 650) { $('.grid').masonry({itemSelector: '.grid-item'}); }
		}
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function navStick() {
	if (page === 'index' ) {
		var headerHeight = $('.header').offset().top + $('.header').outerHeight(); //distance bottom of navbar is from top
		var st = $(window).scrollTop();
		
		if ( !navStuck && headerHeight < st ) {
			$('#navbar').css('position', 'fixed');
			$('#navbar').css('top', '0');
			$('#bodyContent').css('margin-top', 'calc(2em + '+ $('#navbar').height() + 'px)');
			navStuck = true;
		}
		else if ( navStuck && headerHeight > st ){
			$('#navbar').css('position', 'relative');
			$('#bodyContent').css('margin-top', '2em');
			navStuck = false;
		}
	}
}

function debounce(f, t) {
	clearTimeout(timer);
	timer = setTimeout(f, t);
}

function bringmenu() {
	var st = window.pageYOffset || document.documentElement.scrollTop;  
		if (st > lastScrollTop1 + 10) {
			$('#navbar').css('top', '-' + ( $('#navbar').height() + 20 )+'px');
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

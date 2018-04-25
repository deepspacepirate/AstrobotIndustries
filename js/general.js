// dependencies:
// 	Ben Alman's debounce	http://benalman.com/code/projects/jquery-throttle-debounce/jquery.ba-throttle-debounce.js
// 	jQuery

// Get page name, for activating almonds, directory navigation
var path = window.location.pathname;
// file = path.match(/[^\/]+$/)[0],
var parDir = path;
var page = path.match(/[^\/]+(?=\.html)/)[0] // match faster than split+pop https://jsperf.com/split-pop-vs-regex-match
var rootpath = path.match(/^.+AstrobotIndustries\//)[0];
console.log(page);

// Current distance from top, for bringmenu()
var lastScrollTop1 = 0;
var lastScrollTop2 = 0;

var navStuck = false;
var navOpen = false;
var ldToggleEnd = true;

var navbarWidthLimit = 700;

var lastNavLink; 

$(document).ready(function() {
	// console.log(getCookie('daynight'));
	// if (getCookie('daynight') == 'night' ) ldToggle();
	$('#toggle').click(ldToggle);

	// Activate your almonds
	$('#navbar').find('a').each( function(){
		var element = $(this);
		var navTitle = element.text();
		navTitle = navTitle.toLowerCase();
		if (navTitle === 'contact') lastNavLink = element;
		if (navTitle == page) element.addClass('active');
		if (navTitle === 'blog' || navTitle === 'endeavors') element.hide();
	});

	// Position body content from top
	screenResize();
	if (page != 'index') $('#bodyContent').css( 'margin-top', $('#navbar').outerHeight() + 20);

	// Adjust with of body content
	window.onresize = $.debounce(50, screenResize);

	// Detect scroll, bring/hide navbar
	$(window).scroll($.debounce(150, function(){
		if (page != 'index')  bringmenu();
	}));
	$('#menuButton').click(toggleHamStack);
	$('#bodyContent').click( function() {
		if ($('#navbar').hasClass('hamExpand')) toggleHamStack();
	});

	// Home sticky menu
	if (page === 'index' ) {$(window).scroll(navStick);}
});

function ldToggle() {
		screenResize();

		var newfront = $('.back')
		var newback = $('.front')

		newfront.removeClass('back');
		newfront.addClass('front');

		newback.removeClass('front');
		newback.addClass('back');

		if(document.getElementById("darkCSS") == null) {
			$('head').append('<link id="darkCSS" rel="stylesheet" type="text/css" href="' + rootpath + '/css/dark.css">');
			// setCookie('daynight', 'night', .5)
		}
		else {
			$('#darkCSS').remove();
			// setCookie('daynight', 'day', .5)
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

function bringmenu() {
	var st = window.pageYOffset || document.documentElement.scrollTop;  
		if (st > lastScrollTop1 + 5) {
			$('#navbar').css('top', '-' + ( $('#navbar').height() + 20 )+'px');
			$('#navbar').removeClass('hamExpand');
		} 
		else if (st < lastScrollTop1 - 5) {
			$('#navbar').css('top', 0);
		}
	lastScrollTop1 = st;
}


// All the thins to do when screen is resized
function screenResize() {
	moveLDToggle();
	if (navStuck) $('#bodyContent').css('margin-top', 'calc(2em + '+ $('#navbar').height() + 'px)');

	scale($(".bodyContent-inner"), 'width', '%', window.innerWidth, 650, 95, 900, 90, 2000, 70);
	scale($("body"), 'font-size', 'px', window.innerWidth, 800, 10, 1000, 10.5, 2000, 11);

	if ( page === 'about' ) scale($(".img-circle"), 'width', 'em', window.innerWidth, 500, 7, 1200, 8.5, 2000, 12);
	if ( page === 'projects' || page === 'academics') changeNumCards();
	
	console.log('screen resized');
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
	}
	else {
		element.removeClass('sticky');
	}
}

function moveLDToggle(){
	if (ldToggleEnd == true && window.innerWidth > navbarWidthLimit) {
		$('#toggle').insertBefore('.home');
		ldToggleEnd = false;
		console.log('moved to start');
	}
	else if (ldToggleEnd == false && window.innerWidth <= navbarWidthLimit) {
		$('#toggle').insertAfter(lastNavLink);
		ldToggleEnd = true;
		console.log('moved to end');

	}
}

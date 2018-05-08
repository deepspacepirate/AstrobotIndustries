// dependencies:
// 	Ben Alman's debounce	http://benalman.com/code/projects/jquery-throttle-debounce/jquery.ba-throttle-debounce.js
// 	jQuery

// Get page name, for activating almonds, directory navigation
var path = window.location.pathname;
// file = path.match(/[^\/]+$/)[0],
var page = path.match(/[^\/]+(?=\.html)/)[0] // match faster than split+pop https://jsperf.com/split-pop-vs-regex-match
var rootpath = path.match(/^.+AstrobotIndustries\//)[0];
console.log(rootpath);
console.log(page);

// Current distance from top, for bringmenu()
var lastScrollTop1 = 0;
var ldToggleEnd = true;
var navbarWidthLimit = 700;
var lastNavLink;

window.jQuery || document.write('<script src=\"' + rootpath + 'js/jquery-3.2.1.min.js\"><\/script>');

$(document).ready(function() {

	// Activate your almonds
	$('#navbar').find('a').each( function(){
		var element = $(this);
		var navTitle = element.text();
		navTitle = navTitle.toLowerCase();
		if (navTitle == page) element.addClass('active');
		if (navTitle === 'contact') lastNavLink = element;
		if (navTitle === 'blog' || navTitle === 'endeavors') element.hide();
	});

	// Theme management
	$('#toggle').click(ldToggle);
	if(getCookie('theme') === 'dark') ldToggle();

	// Position body content from top
	if (page != 'index') $('#bodyContent').css( 'margin-top', 'calc(' + $('#navbar').outerHeight() + 'px + var(--bodyContent-margin)');

	$(window).on({
		load: screenResize(),
		// Adjust with of body content
		resize: $.debounce(50, screenResize), 
		// Detect scroll, bring/hide navbar
		scroll: $.debounce(150, function(){ 
			if (page != 'index') bringmenu(); })
	});

	// Navbar expand/collapse
	$('#menuButton').click(toggleHamStack);
	$('#bodyContent').click( function() {
		if ($('#navbar').hasClass('hamExpand')) toggleHamStack();
	});

});

function ldToggle() {
	var newfront = $('.back')
	var newback = $('.front')

	newfront.removeClass('back');
	newfront.addClass('front');

	newback.removeClass('front');
	newback.addClass('back');

	if(document.getElementById("darkCSS") == null) {
		$('head').append('<link id="darkCSS" rel="stylesheet" type="text/css" href="' + rootpath + '/css/dark.css">');
		setCookie('theme', 'dark', 3);
	}
	else {
		$('#darkCSS').remove();
		setCookie('theme', 'light', 3);
	}
	screenResize();
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

function eraseCookie(cname) {setCookie(cname, '', -1);}
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
	scale($(".bodyContent-inner"), 'width', '%', window.innerWidth, 650, 95, 900, 90, 2000, 70);
	scale($("body"), 'font-size', 'px', window.innerWidth, 800, 10, 1000, 10.5, 2000, 11);
	if ( $('.grid')[0] ) changeNumCards();
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
	return (y2-y1)/(x2-x1) * (x - x1) + y1 ;
}

// Open/close collapsed navbar
function toggleHamStack() {
	$('#navbar').toggleClass('hamExpand');
}

// Stick things to top when scrolled to
function sticky(element) {
	var $el = $(element);
	var position = $el.offset().top;
	if ( $(window).scrollTop() + 11 >= position) {
		$el.addClass('sticky');
	}
	else $el.removeClass('sticky');
}

function moveLDToggle(){
	if (ldToggleEnd == true && window.innerWidth > navbarWidthLimit) {
		$('#toggle').insertBefore('.home');
		ldToggleEnd = false;
	}
	else if (ldToggleEnd == false && window.innerWidth <= navbarWidthLimit) {
		$('#toggle').insertAfter(lastNavLink);
		ldToggleEnd = true;
	}
}

// dependencies:
// 	Ben Alman's debounce	http://benalman.com/code/projects/jquery-throttle-debounce/jquery.ba-throttle-debounce.js
// 	jQuery

// Get page name, for activating almonds, directory navigation
var PathNS = PathNS || {};
PathNS.path = window.location.pathname; 
PathNS.page = PathNS.path.match(/[^\/]+(?=\.html)/)[0] // match faster than split+pop https://jsperf.com/split-pop-vs-regex-match
PathNS.rootpath = PathNS.path.match(/^.+AstrobotIndustries\//)[0];
// file = path.match(/[^\/]+$/)[0],
// console.log(PathNS.page);

window.jQuery || document.write('<script src=\"' + PathNS.rootpath + 'js/jquery-3.2.1.min.js\"><\/script>');

$(document).ready(function() {
	var navObj = new NavbarNS($('#navbar'));
	var bodyObj = new BodyNS();

	if (CookiesNS.getCookie('theme') === 'dark') navObj.ldToggle();
});

// Stick things to top when scrolled to
// function sticky(element) {
// 	var $el = $(element);
// 	var position = $el.offset().top;
// 	if ( $(window).scrollTop() + 11 >= position) {
// 		$el.addClass('sticky');
// 	}
// 	else $el.removeClass('sticky');
// }

// BODY NAMESPACE **************************************************

function BodyNS() {
	var $this = this;

	$(window).on({
		load: $this.bodyResize(),
		resize: $.debounce(50, function(){ $this.bodyResize(); }),
	});

	// Position body content from top
	if (PathNS.page != 'index') $('#bodyContent').css( 'margin-top', 'calc(' + $('#navbar').outerHeight() + 'px + var(--bodyContent-margin)');

}

// All the thins to do when screen is resized
BodyNS.prototype.bodyResize = function() {
	this.scale($(".bodyContent-inner"), 'width', '%', window.innerWidth, 650, 95, 900, 90, 2000, 70);
	this.scale($("body"), 'font-size', 'px', window.innerWidth, 800, 10, 1000, 10.5, 2000, 11);
}

// Scale property of element to another element (x). Set points as (x1, y1), (x2, y2), (x3, y3)
BodyNS.prototype.scale = function(element, property, unit, x, x1, y1, x2, y2, x3, y3){
	var $this = this;

	if (x <= x1) {
		element.css(property, y1 + unit);
	}
	else if (x > x1 && x < x2) {
		element.css(property, Math.floor( $this.Y(x1, y1, x2, y2, x) ) + unit );
	}
	else if (x > x2 && x < x3){
		element.css(property, Math.floor( $this.Y(x2, y2, x3, y3, x) ) + unit );
	}
	else element.css(property, Math.floor(y3) + unit );
}

// Given two points (x1, y1), (x2, y2), and x-input, returns y-output
BodyNS.prototype.Y = function(x1, y1, x2, y2, x) { 
	return (y2-y1)/(x2-x1) * (x - x1) + y1 ;
}

// NAVBAR NAMESPACE **************************************************

function NavbarNS(el) {
	var $this = this;

	this.nav = el;
	this.lastScrollTop = 0;
	this.ldToggleEnd = true;
	this.navbarWidthLimit = 700;
	this.lastNavLink;

	// Activate your almonds
	this.nav.find('a').each( function(){
		var element = $(this);
		var navTitle = element.text().toLowerCase();
		if (navTitle == PathNS.page) element.addClass('active');
		if (navTitle === 'contact') $this.lastNavLink = element;
		if (navTitle === 'blog' || navTitle === 'endeavors') element.hide();
	});

	// Navbar expand/collapse
	$('#menuButton').click(function(){
		$this.navToggleOpen();
	});
	$('#bodyContent').click( function() {
		if ($('#navbar').hasClass('hamExpand')) $this.navToggleOpen();
	});

	// toggle day/night
	$('#toggle').click(function(){$this.ldToggle()});
	if(CookiesNS.getCookie('theme') === 'dark') this.ldToggle();

	$(window).on({
		// Adjust with of body content
		load: $this.moveLDToggle(),
		resize: $.debounce(50, function(){ $this.moveLDToggle(); }),

		// Detect scroll, bring/hide navbar
		scroll: $.debounce(150, function(){ 
			if (PathNS.page != 'index') $this.bringmenu(); })
	});
}

NavbarNS.prototype.bringmenu = function() {
	var st = window.pageYOffset || document.documentElement.scrollTop;  
		if (st > this.lastScrollTop + 5) {
			this.nav.css('top', '-' + ( this.nav.height() + 20 )+'px');
			this.nav.removeClass('hamExpand');
		} 
		else if (st < this.lastScrollTop - 5) {
			this.nav.css('top', 0);
		}
	this.lastScrollTop = st;
}

NavbarNS.prototype.navToggleOpen = function() {
	this.nav.toggleClass('hamExpand');
}

NavbarNS.prototype.moveLDToggle = function(){
	if (this.ldToggleEnd == true && window.innerWidth > this.navbarWidthLimit) {
		$('#toggle').insertBefore('.home');
		this.ldToggleEnd = false;
	}
	else if (this.ldToggleEnd == false && window.innerWidth <= this.navbarWidthLimit) {
		$('#toggle').insertAfter(this.lastNavLink);
		this.ldToggleEnd = true;
	}
}

NavbarNS.prototype.ldToggle = function() {
	var newfront = $('.back')
	var newback = $('.front')

	newfront.removeClass('back');
	newfront.addClass('front');

	newback.removeClass('front');
	newback.addClass('back');

	if(document.getElementById("darkCSS") == null) {
		$('head').append('<link id="darkCSS" rel="stylesheet" type="text/css" href="' + PathNS.rootpath + '/css/dark.css">');
		CookiesNS.setCookie('theme', 'dark', 3);
	}
	else {
		$('#darkCSS').remove();
		CookiesNS.setCookie('theme', 'light', 3);
	}

	window.dispatchEvent(new Event('resize'));
}


// COOKIES NAMESPACE **************************************************

var CookiesNS = CookiesNS || {};

CookiesNS.getCookie = function(cname) {
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

CookiesNS.eraseCookie = function(cname) {setCookie(cname, '', -1);}
CookiesNS.setCookie = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
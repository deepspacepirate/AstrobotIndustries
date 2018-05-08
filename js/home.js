var navStuck = false;

$(document).ready(function() {
	$(window).on({
		load: navStick,
		scroll: navStick
	});
});

function navStick() {
	var headerHeight = $('.header').offset().top + $('.header').outerHeight(); //distance bottom of navbar is from top
	var st = $(window).scrollTop();
	
	if ( !navStuck && headerHeight < st ) {
		$('#navbar').css('position', 'fixed');
		$('#bodyContent').css('margin-top', 'calc(2em + '+ $('#navbar').height() + 'px)');
		navStuck = true;
	}
	else if ( navStuck && headerHeight > st ){
		$('#navbar').css('position', 'relative');
		$('#bodyContent').css('margin-top', '2em');
		navStuck = false;
	}
}
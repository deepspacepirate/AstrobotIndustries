
$(document).ready(function() {
	var homeNav = new NavbarNS.home();
});

NavbarNS.home = function(){
	navStuck = false;

	var $this = this;

	window.onload = this.navStick();
	$(window).scroll(function(){ $this.navStick(); });

	$('.chevron').click($this.scrollToTop);
	$('#menuButton').click($this.scrollToTop)
}

NavbarNS.home.prototype.scrollToTop = function(){
	var dist = $("#navbar").offset().top;
	console.log(dist);
	$("html, body").animate({ scrollTop: dist }, "fast");
}

NavbarNS.home.prototype.navStick = function() {
	var headerHeight = $('.header').offset().top + $('.header').outerHeight(); //distance bottom of navbar is from top
	var st = $(window).scrollTop();
	
	if ( !this.navStuck && headerHeight < st ) {
		$('#navbar').css('position', 'fixed');
		$('#bodyContent').css('margin-top', 'calc(2em + '+ $('#navbar').height() + 'px)');
		this.navStuck = true;
	}
	else if ( this.navStuck && headerHeight > st ){
		$('#navbar').css('position', 'relative');
		$('#bodyContent').css('margin-top', '2em');
		this.navStuck = false;
	}
}
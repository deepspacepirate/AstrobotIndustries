var timer2;

$(document).ready(function() {
	$(window).scroll(function(){
		if ( timer2 ) clearTimeout(timer2);
		timer2 = setTimeout( bringContact, 100 );
	});
});

function bringContact() {
	var st = window.pageYOffset || document.documentElement.scrollTop;  
		if (st > lastScrollTop2 + 10) {
			$('#contactButton').css('opacity', 0);
		} 
		else if (st < lastScrollTop2 - 10) {
			$('#contactButton').css('opacity', 1);
		}
	lastScrollTop2 = st;
}
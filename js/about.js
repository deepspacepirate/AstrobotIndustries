$(document).ready(function() {

	showChats();
	$(window).on('scroll', showChats);

});

function showChats(){
	var scrollPosition = $(window).scrollTop();
	$('.chat').each( function() {
		var element = $(this);
		if (scrollPosition + window.innerHeight > element.offset().top + .2*window.innerHeight) {
			element.addClass('appear');
		}

	});
}
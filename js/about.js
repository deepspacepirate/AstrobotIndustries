$(document).ready(function() {
	var permGlow = false;

	$(window).on({
		load: showChats,
		scroll: showChats
	});

	$(".buttonCard").click( function() {
		if 		(dark && !permGlow) {permGlow = true;  $('.answer').addClass('glow');}
		else if (dark && permGlow) 	{permGlow = false; $('.answer').removeClass('glow');}
		console.log(permGlow);
	});

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
$(document).ready(function() {
	var permGlow = false;

	$(window).on({
		load: showChats(),
		load: $.debounce(100, resizeInner),
		resize: $.debounce(100, resizeInner)
	});

	$('.bodyContent-inner2').on({
		// scroll: showChats
		scroll: $.debounce(2, showChats)
	});

	$("#iconHolder-main").click( function() {
		if (getCookie('theme') === 'dark') $('.answer > .chat').toggleClass('glow');
	});

});

function showChats(){
	var scrollPosition = $('.bodyContent-inner2').offset().top;
	$('.chat').each( function() {
		var element = $(this);
		if (scrollPosition + .6*window.innerHeight > element.offset().top ) {
			element.addClass('appear');
		}
	});
	$('.iconHolder').each( function() {
		var element = $(this);
		if (scrollPosition + .6*window.innerHeight > element.offset().top ) {
			element.addClass('appear');
		}
	});
}

function resizeInner() {
	var wrHeight = $('.bodyContent-inner').innerHeight() - $('.formcontainer').outerHeight();
	$('.bodyContent-inner2').css('height', wrHeight + 'px');
}
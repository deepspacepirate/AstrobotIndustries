$(document).ready(function() {
	var permGlow = false;

	$(window).on({
		load: showChats,
		load: $.debounce(100, resizeInner),
		resize: $.debounce(100, resizeInner)
			
	});

	$('.bodyContent-inner2').on({
		scroll: showChats
	});

	$("#iconHolder-main").click( function() {
		if 		(dark && !permGlow) {permGlow = true;  $('.answer > .chat').addClass('glow');}
		else if (dark && permGlow) 	{permGlow = false; $('.answer > .chat').removeClass('glow');}
		console.log(permGlow);
	});

});

function showChats(){
	// var scrollPosition = $('window').scrollTop();
	// $('.chat').each( function() {
	// 	var element = $(this);
	// 	if (scrollPosition + window.innerHeight > element.offset().top + .2*window.innerHeight) {
	// 		element.addClass('appear');
	// 	}
	// });

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
	// $('.wrapper').css('height', wrHeight + 'px');
	$('.bodyContent-inner2').css('height', wrHeight + 'px');
}
$(document).ready(function() {

	$('.images').click( function(){  zoom($(this));  } );

});

function consoleTest(){
	console.log("console test");
}

function zoom(element) {
	element.toggleClass('zoom');

	var elOffsetTop = element.offset().top;
	var winHeight = window.innerHeight;
	var elHeight = element.height();
	var offset;
	
	if (elHeight < winHeight) offset = elOffsetTop - (winHeight - elHeight)/2;
	else offset = elOffsetTop;
	$(window).scrollTop(offset);
}
var firstImage, lastImage, 
	selectedImage, targetImage; // img object, #id object
var galOpened = false;

$(document).ready(function() {
	firstImage = $('.img_link').first();
	lastImage = $('.img_link').last();
	selectedImage = firstImage;
	targetImage = $(selectedImage.attr('href'));
	targetImage.css('display','block');

	// remove x for image gallery
	$('#close').click(closeGallery);

	// select gallery images on click
	$('#thumbs > a').click( function(e) {
		select($(this));
		if (!galOpened) openGallery();
		e.preventDefault();
	});

	// horizontal scrolling of gallery thumbs
	$('#thumbs').mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 60);
		this.scrollRight -= (delta * 60);
		event.preventDefault();
	});

	// navigate gallery thumbs with arrow keys
	$(document).keydown(function(e) {
		if (galOpened) {
			if (e.which == 37 && !selectedImage.is(firstImage)){
				$('#thumbs').animate({scrollLeft: '-=' + $('#thumbs').height()}, 200); ;
				select(selectedImage.prev());
			}
			if (e.which == 39 && !selectedImage.is(lastImage)) {
				select(selectedImage.next());
				$('#thumbs').animate({scrollLeft: '+=' + $('#thumbs').height()}, 200); ;
			}
			if (e.which == 27) closeGallery(); // esc key
		}
	});

	// fix gallery on resize
	window.onresize = function() {
		clearTimeout(timer2);
		timer2 = setTimeout(function() {
			if (galOpened) {
				select(selectedImage);
				openGallery();
			}
		}, 200);
	};
});


// select image
function select(imageClicked) {
	// scroll to gallery
	$('html, body').animate({
		scrollTop: $('#gallery').offset().top
	}, 300);

	if (imageClicked !== selectedImage) {
		selectedImage.removeClass('selected');
		targetImage.css('display', 'none');

		selectedImage = imageClicked;
		targetImage = $(selectedImage.attr('href'));

		targetImage.css('display', 'block');
		selectedImage.addClass('selected');
	}

	$('#navbar').css('top', '-' + ( $('#navbar').height() + 20 ) +'px'); // hide navbar
}

function openGallery() {
	galOpened = true;
	$('#gallery').addClass('opened');
	var galleryHeight = 'calc(100vh - 7px - ' + $('#thumbs').height() + 'px';

	$('#photo').css('height', galleryHeight);
	$('.images').css('max-height', galleryHeight);
}

function closeGallery() {
	galOpened = false;
	$('#gallery').removeClass('opened');
	$('.img_link').removeClass('selected');

	$('#photo').css('height', '40vw');
	$('.images').css('max-height', '1000vh');
}
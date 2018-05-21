$(document).ready(function() {
	var gal = new Gallery($('.gallery'));

	// remove x for image gallery
	$('.close').click(gal.closeGallery);

	// select gallery images on click
	$('.thumbs > a').click( function(e) {
		gal.select($(this));
		if ( !gal.galOpened ) gal.openGallery();
		e.preventDefault();
	});

	// horizontal scrolling of gallery thumbs
	$('.thumbs').mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 60);
		this.scrollRight -= (delta * 60);
		event.preventDefault();
	});

	// navigate gallery thumbs with arrow keys
	$(document).keydown(function(e){
		gal.scrollSelect(e);
	});

	// fix gallery on resize
	window.onresize = $.debounce(200, gal.resize);

});

function Gallery(el) {
	this.el = el;
	this.galOpened = false;
	this.firstImage = el.find('.img_link').first();
	this.lastImage =  el.find('.img_link').last();
	this.selectedImage = this.firstImage;
	this.targetImage = $(this.selectedImage.attr('href'));

	this.targetImage.css('display', 'block');
};

Gallery.prototype.openGallery = function() {
	this.galOpened = true;
	this.el.addClass('opened');
	var galleryHeight = 'calc(100vh - 7px - ' + $('.thumbs').height() + 'px';

	$('.photo').css('height', galleryHeight);
	$('.images').css('max-height', galleryHeight);
}

Gallery.prototype.closeGallery = function() {
	this.galOpened = false;
	this.el.removeClass('opened');
	this.el.find('.img_link').removeClass('selected');

	this.el.find('.photo').css('height', '40vw');
	this.el.find('.images').css('max-height', '1000vh');
}

// when img thumbnail is clicked
Gallery.prototype.select = function(imageClicked) {
	$('html, body').animate({
		scrollTop: this.el.offset().top
	}, 300);

	if (imageClicked !== this.selectedImage) {
		this.selectedImage.removeClass('selected');
		this.targetImage.css('display', 'none');

		this.selectedImage = imageClicked;
		this.targetImage = $(this.selectedImage.attr('href'));

		this.targetImage.css('display', 'block');
		this.selectedImage.addClass('selected');
	}

	$('#navbar').css('top', '-' + ( $('#navbar').height() + 20 ) +'px'); // hide navbar
}

// scroll to gallery
Gallery.prototype.scrollSelect = function(event) {
	if (this.galOpened) {
		if (event.which == 37 && !this.selectedImage.is(this.firstImage)){
			$('.thumbs').animate({scrollLeft: '-=' + $('.thumbs').height()}, 200); ;
			this.select(this.selectedImage.prev());
		}
		if (event.which == 39 && !this.selectedImage.is(this.lastImage)) {
			this.select(this.selectedImage.next());
			$('.thumbs').animate({scrollLeft: '+=' + $('.thumbs').height()}, 200); ;
		}
		if (event.which == 27) this.closeGallery(); // esc key
	}
}

Gallery.prototype.resize = function(){
	if (this.galOpened) {
		this.select(this.selectedImage);
		this.openGallery();
	}
}
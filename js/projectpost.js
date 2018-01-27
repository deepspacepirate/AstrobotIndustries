var firstImage, lastImage, selectedImage, targetImage;
var galOpened = false;

$(document).ready(function() {
	firstImage = $('.img_link').first();
	lastImage = $('.img_link').last();
	selectedImage = firstImage;
	targetImage = $(selectedImage.attr('href')).children();

	// remove x for image gallery
	$('#gallery > #close').css('visibility', 'hidden');
	$('#gallery > #close').click(closeGallery);

	// select gallery images
	$('#gallery-tiles > a').click( function() {
		select($(this));
		openGallery();

	});

	$('#gallery > .images').click( function() {
		if (!galOpened) {
			select(selectedImage);
			openGallery();
		}
	});

	// horizontal scrolling of gallery tiles
	$('#gallery-tiles').mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 60);
		this.scrollRight -= (delta * 60);
		event.preventDefault();
	});

	// navigate gallery tiles (h scroll) with v scroll
	$(document).keydown(function(e) {
		if (galOpened) {
			if (e.which == 37 && !selectedImage.is(firstImage)){
				$('#gallery-tiles').animate({scrollLeft: '-=' + $('#gallery-tiles').height()}, 200); ;
				select(selectedImage.prev());
			}
			if (e.which == 39 && !selectedImage.is(lastImage)) {
				select(selectedImage.next());
				$('#gallery-tiles').animate({scrollLeft: '+=' + $('#gallery-tiles').height()}, 200); ;
			}
			if (e.which == 27 && galOpened) closeGallery();
		}
	});

	// fix gallery on resize
	window.onresize = function() {
		clearTimeout(timer2);
		timer2 = setTimeout(function() {
			if (galOpened) select(selectedImage);
			else reScroll();
		}, 200);
	};
});


// select image
function select(imageClicked) {
	$('#navbar').css('top', '-' + ( $('#navbar').height() + 20 ) +'px');

	selectedImage = imageClicked;
	targetImage = $(selectedImage.attr('href'));
	window.location = path + selectedImage.attr('href');
	$('.img_link').removeClass('selected');
	selectedImage.addClass('selected');
}

// opens gallery
function openGallery() {
	if (!galOpened) {
		galOpened = true;

		$('#gallery > #close').css('visibility', 'visible');

		$('#gallery').css('max-height', '100vh');
		$('#gallery').css('height', 'calc(100vh - 7px - ' + $('#gallery-tiles').height() + 'px)');
	
		$('#gallery > .images').css('height', 'calc(100vh - 7px - ' + $('#gallery-tiles').height() + 'px)');

		$('#gallery > .images > img').css('width', 'auto');
		$('#gallery > .images > img').css('max-height', 'calc(100vh - 7px - ' + $('#gallery-tiles').height() + 'px)');
	}
}

// closes gallery
function closeGallery() {
	if (galOpened) {
		galOpened = false;
		$('.img_link').removeClass('selected');

		$('#gallery > #close').css('visibility', 'hidden');

		$('#gallery').css('height', '40vw');
		$('#gallery').css('max-height', '600px');

		$('#gallery > .images').css('height', 'auto');

		$('#gallery > .images > img').css('width', '100vw');
		$('#gallery > .images > img').css('max-height', '1000vh');

		reScroll();
	}
}

function reScroll() {
	window.location.href = path + selectedImage.attr('href');

	if (window.innerWidth * 0.3 > 600) galHeight = 600;
	else galHeight = window.innerWidth * 0.3;

	var imgHeight = targetImage[0].offsetTop + targetImage.height()/2 - galHeight/2 - 15;
	
	$('#gallery').animate({
		scrollTop: imgHeight
	}, 500);
	
}
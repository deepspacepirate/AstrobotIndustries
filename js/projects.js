$(document).ready(function() {
	
	$('.grid-item').each(function() {
		var link = $(this).find('h1 > a');
		var idNum = $(this).attr('id').match(/\-.+/)[0].replace('-', '');
		var title = link.text().toLowerCase().replace(/ /g, '-').replace(/[<>:"\/\\\\\|?\*]/g, 'x');
		// link.attr('href', rootpath + "pages/projects/" + idNum + '-' + title + '.html');
		link.attr('href', rootpath + 'pages/projects/' + title + '/' + title + '.html');
	});

	$('.searchbox').click(toggleSearchParams());

});

function toggleSearchParams() {
	console.log('entered');
	$('#search').addClass('expand');
}
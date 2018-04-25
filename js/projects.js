$(document).ready(function() {
	// create links for each project
	$('.grid-item').each(function() {
		var link = $(this).find('h1 > a');
		var idNum = $(this).attr('id').match(/\-.+/)[0].replace('-', '');
		var title = link.text().toLowerCase().replace(/ /g, '-').replace(/[<>:"\/\\\\\|?\*]/g, 'x');
		// link.attr('href', rootpath + "pages/projects/" + idNum + '-' + title + '.html');
		link.attr('href', rootpath + 'pages/projects/' + title + '/' + title + '.html');
	});

	$('.searchbox').click(function(){$('#searchParams').addClass('expand');});

	console.log('Well, aren\'t you nosy. Click on the $200+ checkbox twelve times.');
	var click200Count = 0;
	$('#vhighcost').mousedown(function() {
		click200Count++; 
		if (click200Count == 11) window.alert('Bored, I take it?');
	});
});
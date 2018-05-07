$(document).ready(function() {
	
	$('.grid-item').each(function() { // create links for each project
		var status = $(this).find('.status').html();
		status = status.replace(/\s+/g, '');

		if (status === "Completed"){
			var link = $(this).find('h1 > a');
			var title = link.text().toLowerCase().replace(/ /g, '-').replace(/[<>:"\/\\\\\|?\*]/g, 'x'); // replace spaces with '-' , replace special chars with 'x'

			// var idNum = $(this).attr('id').match(/\-.+/)[0].replace('-', '');
			// link.attr('href', rootpath + "pages/projects/" + idNum + '-' + title + '.html');
			link.attr('href', rootpath + 'pages/projects/' + title + '/' + title + '.html');
		}
	});

	$('.searchbox').click(function(){$('#searchParams').addClass('expand');});

	console.log('Well, aren\'t you nosy. Click on the $200+ checkbox twelve times.');
	var click200Count = 0;
	$('#vhighcost').mousedown(function() {
		click200Count++; 
		if (click200Count == 11) window.alert('Bored, I take it?');
	});
});
$(document).ready(function() {
	
	// create links for each project
	$('.grid-item').each(function() { 
		var status = $(this).find('.status').html();
		status = status.replace(/\s+/g, '');

		var link = $(this).find('h1 > a');
		if (status === "Completed"){
			var title = link.text().toLowerCase().replace(/ /g, '-').replace(/[<>:"\/\\\\\|?\*]/g, 'x'); // replace spaces with '-' , replace special chars with 'x'

			// var idNum = $(this).attr('id').match(/\-.+/)[0].replace('-', '');
			// link.attr('href', rootpath + "pages/projects/" + idNum + '-' + title + '.html');
			link.attr('href', PathNS.rootpath + 'pages/projects/' + title + '/' + title + '.html');
		}
		else link.addClass('unclickable');

	});

	$('.searchbox').click(function(){$('#search').addClass('expand');});
	$('.chevron').click(function(){$('#search').toggleClass('expand');});

	$('.compShortcut').click(
		function(){$('#search').addClass('expand');
		$("#reset > .button").prop("checked", true).trigger('change');
		$("#completed > .button").prop("checked", true).trigger('change');
	});

	console.log('Well, aren\'t you nosy. Click on the $200+ checkbox twelve times.');
	var click200Count = 0;
	$('#vhighcost').mousedown(function() {
		click200Count++; 
		if (click200Count == 11) window.alert('Bored, I take it?');
	});
});
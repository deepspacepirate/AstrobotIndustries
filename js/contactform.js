$(document).ready(function() {

	$('#subjectDropdown').on('change', function() {
		if (this.value == 2) $('#tutorDropdown').show();
		else {
			$('#tutorDropdown').hide();
			$('.tutorSubjSpecify').each( function() {
				$(this).hide();
			});
		}
	});

	$('#tutorDropdown').on('change', function() {
		var val = this.value;
		if (val == 0 || val == 1) {
			hideDropdown();
		}
		if (val == 2) {
			hideDropdown();
			$('#chemDropdown').show();
		}
		if (val == 3) {
			hideDropdown();
			$('#mathDropdown').show();
		}
		if (val == 4) {
			hideDropdown();
			$('#physicsDropdown').show();
		}
		if (val == 5) {
			hideDropdown();
			$('#csDropdown').show();
		}
		if (val == 6) {
			hideDropdown();
			$('#tpDropdown').show();
		}
	});

});

function hideDropdown () {
	$('.tutorSubjSpecify').each( function() {
		$(this).hide();
	});
}
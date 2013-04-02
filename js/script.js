jQuery(document).ready(function($) {

// Panels
// ==========

// Hide all panels
$('#panel-wrapper .panel').hide();

// Show active/first panel
var activePanel = $('#panel-tabs li.active:first');
if (!activePanel.length) activePanel = $('#panel-tabs li:first');

if (activePanel.length) {
	activePanel.addClass('active');
	var panelName = activePanel.attr('class').match(/panel-(\w+)/);
	$('#' + panelName[1] + '-panel').show(); // Show active
}

// Show panel on tab click
$('#panel-tabs li').click(function() {
	$('#panel-wrapper .panel').hide(); // Hide all

	var panelName = $(this).attr('class').match(/panel-(\w+)/);
	$('#' + panelName[1] + '-panel').show(); // Show clicked

	$(this).find('a').blur(); // shh
});


// end document.ready()
});
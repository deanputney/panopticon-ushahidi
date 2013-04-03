function drawWindow(){
	console.log('drawing #map to '+(window.innerHeight-$('#header_nav').outerHeight()))
	$('#middle, #map, #panel-wrapper, .panel, .panel iframe').css('height', window.innerHeight-$('#header_nav').outerHeight()-3);
}


jQuery(document).ready(function($) {
  // Draw map on page load
  drawWindow();
    
  // Redraw map on resize
  $(window).resize(function(){ drawWindow(); });
	
	
	// Panels
	// ==========

	$('#mapStatus').addClass('panel-open');

	// Hide all panels
	$('#panel-wrapper .panel').hide();

	// Show active/first panel
	var activePanel = $('#panel-tabs li.active:first'),
		hashPanel   = $('#panel-tabs li.panel-' + document.location.hash.substr(1));

	if (!activePanel.length) activePanel = $('#panel-tabs li.panel-pins');
	if (hashPanel.length)    activePanel = hashPanel;

	if (activePanel.length) {
		activePanel.addClass('active');
		var panelName = activePanel.attr('class').match(/panel-(\w+)/);
		$('#' + panelName[1] + '-panel').show(); // Show active
	}

	// Hide panel if #panel-closed
	if (document.location.hash == '#panel-closed')
		$('#panel-wrapper').removeClass('open').addClass('closed');

	// Show panel on tab click
	$('#panel-tabs li a').click(function() {
		var li      = $(this).parent('li'),
			wrapper = $('#panel-wrapper'),
			panelName;

		$(this).blur(); // shh
		
		if (wrapper.hasClass('closed')) { // Open panel
			wrapper.removeClass('closed').addClass('open');
			$('#mapStatus').addClass('panel-open');
		} else if (li.hasClass('active')) { // Close panel
			wrapper.removeClass('open').addClass('closed');
			document.location.hash = 'panel-closed';
			$('#mapStatus').removeClass('panel-open');
			return;
		}

		// Hide all
		$('#panel-wrapper .panel').hide();

		$('#panel-tabs li.active').removeClass('active');

		panelName = li.attr('class').match(/panel-(\w+)/);
		$('#' + panelName[1] + '-panel').show(); // Show clicked
		$('#panel-tabs li.panel-' + panelName[1]).addClass('active');
	});


// end document.ready()
});
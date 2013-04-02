function drawWindow(){
	console.log('drawing #map to '+(window.innerHeight-$('#header_nav').height()))
	$('#middle, #map, #panel-wrapper').css('height', window.innerHeight-$('#header_nav').height());
}

jQuery(document).ready(function($) {

  // Draw map on page load
  drawWindow();
    
  // Redraw map on resize
  $(window).resize(function(){ drawWindow(); });


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
  $('#panel-tabs li a').click(function() {
  	$('#panel-wrapper .panel').hide(); // Hide all

  	var panelName = $(this).parent('li').attr('class').match(/panel-(\w+)/);
  	$('#' + panelName[1] + '-panel').show(); // Show clicked

  	$(this).blur(); // shh
  });


// end document.ready()
});
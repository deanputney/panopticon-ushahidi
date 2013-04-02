function drawWindow(){
	console.log('drawing #map to '+(window.innerHeight-$('#header_nav').height()))
	$('#middle, #map, #panel-wrapper').css('height', window.innerHeight-$('#header_nav').height());
}

jQuery(document).ready(function($) {

  // Draw map on page load
  drawWindow();
    
  // Redraw map on resize
  $(window).resize(function(){ drawWindow(); });


// end document.ready()
});
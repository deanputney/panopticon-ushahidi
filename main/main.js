function drawWindow(){
	console.log('drawing big-maps to '+(window.innerHeight-$('#header_nav').outerHeight()))
	$('#middle, .big-map, #panel-wrapper, .panel, .panel iframe').css('height', window.innerHeight-$('#header_nav').outerHeight()-3);
	$('.big-map.panel-open').css('width', window.innerWidth-400);
	updateMapsSize();
}

function updateMapsSize(){
	map.resize();
	if(frames[0].map) frames[0].map.updateSize();
}

function managePanelControls(panelName){
	switch(panelName) {
		case 'submit':
			$('#reportMap').show();
			$('#mapFilters').hide();
			$('#mapControls').hide();
			break;
		case 'pins':
			$('#reportMap').hide();
			$('#mapFilters').show();
			$('#mapControls').show();
			break;
		default:
			$('#reportMap').hide();
			$('#mapFilters').show();
			$('#mapControls').show();
			break;
	}
}

jQuery(document).ready(function($) {
	
	if(!$('#panel-wrapper').hasClass('closed')) $('.big-map').addClass('panel-open');
	
  // Draw map on page load
  drawWindow();
    
  // Redraw map on resize
  $(window).resize(function(){ drawWindow(); });
	
	
	// Panels
	// ==========

	$('#mapStatus, #mapControls').addClass('panel-open');

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
		managePanelControls(panelName[1]);
	}

	// Hide panel if #panel-closed
	if (document.location.hash == '#panel-closed')
		$('#panel-wrapper').removeClass('open').addClass('closed');
		
		
	// Show panel on tab click
	$('#panel-tabs li a').click(function() {
		var li      = $(this).parent('li'),
			wrapper = $('#panel-wrapper'),
			panelName,
			lastPanel;

		$(this).blur(); // shh
		
		if (wrapper.hasClass('closed')) { // Open panel
			wrapper.removeClass('closed').addClass('open');
			$('#mapStatus, #mapControls, .big-map').addClass('panel-open');
			setTimeout('drawWindow();', 200);
		} else if (li.hasClass('active')) { // Close panel
			wrapper.removeClass('open').addClass('closed');
			document.location.hash = 'panel-closed';
			$('.big-map').css('width', '100%');
			updateMapsSize();
			$('#mapStatus, #mapControls, .big-map').removeClass('panel-open');
			return;
		}

		// Hide all
		$('#panel-wrapper .panel').hide();

		lastPanel = $('#panel-tabs li.active').removeClass('active');
		if (lastPanel.length) lastPanel = lastPanel.attr('class').match(/panel-(\w+)/);
		panelName = li.attr('class').match(/panel-(\w+)/);

		if (panelName[1] == 'submit') {
			if (map && window.reports.map) {
				window.reports.map.setCenter([map._olMap.center.lon, map._olMap.center.lat], map._olMap.zoom);
				window.setTimeout(function() { window.reports.map.baseLayer.redraw(); }, 500);
			}
		} else if (lastPanel[1] == 'submit') {
			if (window.reports.map) map._olMap.setCenter([window.reports.map.center.lon, window.reports.map.center.lat], window.reports.map.zoom);
		}

		$('#' + panelName[1] + '-panel').show(); // Show clicked
		managePanelControls(panelName[1]);
		$('#panel-tabs li.panel-' + panelName[1]).addClass('active');

	});

	$('#info-close').click(function() {
		document.location.hash = 'pins';
		$('#panel-tabs .panel-info a').css({ display: 'none' }).click();
		$('#panel-tabs .panel-pins a').click();
	});

	$('#map')
		.observe('childlist', '#chicken', function(record) {
		$('#chicken .infowindow_meta a:first, #chicken, .infowindow_list a:first').click(function() {
			$('#panel-tabs .panel-info a').css({ display: 'block' }).click();
			$('#info-panel iframe').attr({
				src: $(this).attr('href') + '?panel'
			});
			return false;
		});

	});

// end document.ready()
});

// jquery.observer.js
(function(c){c.sub||(jQuery.sub=function(){function c(f,e){return new c.fn.init(f,e)}jQuery.extend(!0,c,this);c.superclass=this;c.fn=c.prototype=this();c.fn.constructor=c;c.sub=this.sub;c.fn.init=function(f,e){e&&(e instanceof jQuery&&!(e instanceof c))&&(e=c(e));return jQuery.fn.init.call(this,f,e,h)};c.fn.init.prototype=c.fn;var h=c(document);return c});var h=c.sub();"find has not filter is closest index add addBack".split(" ").forEach(function(d){var i=h.fn[d];h.fn[d]=function(){for(var f=[],e,
d=0;d<arguments.length;d++){var g=arguments[d];if(g&&(g.nodeType||g instanceof jQuery)){var n=c(g);e=e||this.root();if(e.is(n)||e.find(n).length){f.push(g);continue}g=[];for(d=0;d<n.length;d++)var k=c(n[d]).capturePath(e.data("branch")),g=g.concat(e.yieldPath(k).get());g=c(g)}f.push(g)}f=i.apply(this,f);return f instanceof jQuery?h(f.get()):f}});c.fn.root=function(){var d=this.map(function(){for(var d=c(this),f;d.length;)f=d,d=d.parent();return f.get(0)}).get();return c(c.unique(d))};c.fn.branch=
function(c,i){return h(this.clone(void 0===c?!1:c,void 0===i?!1:i).data("branch",this).get())}})(jQuery);
(function(c){c.fn.path=function(h){var d=[],i=!!h,h=c(h||window.document);this.each(function(){for(var f=[],e=c(this),j=e.parent();j.length&&!e.is(h);j=j.parent()){var g=e.get(0).tagName.toLowerCase();f.push(g+":eq("+j.children(g).index(e)+")");e=j}(!i||j.length||e.is(h))&&d.push(f.reverse().join(" > "))});return d.join(", ")};c.fn.capturePath=function(h){var d=this,i=this.get(0)instanceof Text,f;if(i){var d=this.parent(),e=d.contents();for(f=0;f<e.length&&e[f]!==this[0];f++);}var j=d.path(h),g=d.is(h);
return function(d){d||(d=this instanceof jQuery||this.nodeType?this:document);var e=c(d).find(j);g&&(e=c(d));return!i?e:c(e.contents()[f])}};c.fn.yieldPath=function(c){return"function"===typeof c?c(this):this.find(c)}})(jQuery);
(function(c){var h=function(a,b){var c={};a.forEach(function(a){(a=b(a))&&(c[a[0]]=a[1])});return c},d=h("childList attributes characterData subtree attributeOldValue characterDataOldValue attributeFilter".split(" "),function(a){return[a.toLowerCase(),a]}),i=h(Object.keys(d),function(a){if("attributefilter"!==a)return[d[a],!0]}),f=h(["added","removed"],function(a){return[a.toLowerCase(),a]}),e=c([]),j=function(a){if("object"===typeof a)return a;var a=a.split(/\s+/),b={};a.forEach(function(a){a=a.toLowerCase();
if(!d[a]&&!f[a])throw Error("Unknown option "+a);b[d[a]||f[a]]=!0});return b},g=function(a){return"["+Object.keys(a).sort().reduce(function(b,c){var d=a[c]&&"object"===typeof a[c]?g(a[c]):a[c];return b+"["+JSON.stringify(c)+":"+d+"]"},"")+"]"},n=window.MutationObserver||window.WebKitMutationObserver,k=function(a,b,l,d){this._originalOptions=c.extend({},b);b=c.extend({},b);this.attributeFilter=b.attributeFilter;delete b.attributeFilter;l&&(b.subtree=!0);b.childList&&(b.added=!0,b.removed=!0);if(b.added||
b.removed)b.childList=!0;this.target=c(a);this.options=b;this.selector=l;this.handler=d};k.prototype.is=function(a,b,c){return g(this._originalOptions)===g(a)&&this.selector===b&&this.handler===c};k.prototype.match=function(a){var b=this.options,l=a.type;if(!this.options[l])return e;if(this.selector)switch(l){case "attributes":if(!this._matchAttributeFilter(a))break;case "characterData":return this._matchAttributesAndCharacterData(a);case "childList":if(a.addedNodes&&(a.addedNodes.length&&b.added)&&
(l=this._matchAddedNodes(a),l.length))return l;if(a.removedNodes&&a.removedNodes.length&&b.removed)return this._matchRemovedNodes(a)}else{var d=a.target instanceof Text?c(a.target).parent():c(a.target);if(!b.subtree&&d.get(0)!==this.target.get(0))return e;switch(l){case "attributes":if(!this._matchAttributeFilter(a))break;case "characterData":return this.target;case "childList":if(a.addedNodes&&a.addedNodes.length&&b.added||a.removedNodes&&a.removedNodes.length&&b.removed)return this.target}}return e};
k.prototype._matchAttributesAndCharacterData=function(a){return this._matchSelector(this.target,[a.target])};k.prototype._matchAddedNodes=function(a){return this._matchSelector(this.target,a.addedNodes)};k.prototype._matchRemovedNodes=function(a){var b=this.target.branch(),d=Array.prototype.slice.call(a.removedNodes).map(function(a){return c(a).clone(!1,!1).get(0)});a.previousSibling?b.find(a.previousSibling).after(d):a.nextSibling?b.find(a.nextSibling).before(d):(b.is(a.target)?b:b.find(a.target)).empty().append(d);
return this._matchSelector(b,d).length?c(a.target):e};k.prototype._matchSelector=function(a,b){var d=a.find(this.selector),b=c(Array.prototype.slice.call(b).map(function(a){return a instanceof Text?c(a).parent().get(0):a}));return d=d.filter(function(){return b.is(this)||b.has(this).length})};k.prototype._matchAttributeFilter=function(a){return this.attributeFilter&&this.attributeFilter.length?0<=this.attributeFilter.indexOf(a.attributeName):!0};var p=function(a){this.patterns=[];this._target=a;this._observer=
null};p.prototype.observe=function(a,b,c){var d=this;this._observer?this._observer.disconnect():this._observer=new n(function(a){a.forEach(function(a){for(var b=0;b<d.patterns.length;b++){var c=d.patterns[b],e=c.match(a);e.length&&e.each(function(){c.handler.call(this,a)})}})});this.patterns.push(new k(this._target,a,b,c));this._observer.observe(this._target,this._collapseOptions())};p.prototype.disconnect=function(a,b,c){var d=this;this._observer&&(this.patterns.filter(function(d){return d.is(a,
b,c)}).forEach(function(a){a=d.patterns.indexOf(a);d.patterns.splice(a,1)}),this.patterns.length||this._observer.disconnect())};p.prototype.disconnectAll=function(){this._observer&&(this.patterns=[],this._observer.disconnect())};p.prototype.pause=function(){this._observer&&this._observer.disconnect()};p.prototype.resume=function(){this._observer&&this._observer.observe(this._target,this._collapseOptions())};p.prototype._collapseOptions=function(){var a={};this.patterns.forEach(function(b){var d=a.attributes&&
a.attributeFilter;if((d||!a.attributes)&&b.attributeFilter){var e={},f=[];(a.attributeFilter||[]).concat(b.attributeFilter).forEach(function(a){e[a]||(f.push(a),e[a]=1)});a.attributeFilter=f}else d&&(b.options.attributes&&!b.attributeFilter)&&delete a.attributeFilter;c.extend(a,b.options)});Object.keys(f).forEach(function(b){delete a[f[b]]});return a};var m=function(a){this.patterns=[];this._paused=!1;this._target=a;this._events={};this._handler=this._handler.bind(this)};m.prototype.NS=".jQueryObserve";
m.prototype.observe=function(a,b,d){a=new k(this._target,a,b,d);c(this._target);a.options.childList&&(this._addEvent("DOMNodeInserted"),this._addEvent("DOMNodeRemoved"));a.options.attributes&&this._addEvent("DOMAttrModified");a.options.characterData&&this._addEvent("DOMCharacerDataModified");this.patterns.push(a)};m.prototype.disconnect=function(a,b,d){var e=c(this._target),f=this;this.patterns.filter(function(c){return c.is(a,b,d)}).forEach(function(a){a=f.patterns.indexOf(a);f.patterns.splice(a,
1)});var g=this.patterns.reduce(function(a,b){b.options.childList&&(a.DOMNodeInserted=!0,a.DOMNodeRemoved=!0);b.options.attributes&&(a.DOMAttrModified=!0);b.options.characterData&&(a.DOMCharacerDataModified=!0);return a},{});Object.keys(this._events).forEach(function(a){g[a]||(delete f._events[a],e.off(a+f.NS,f._handler))})};m.prototype.disconnectAll=function(){var a=c(this._target),b;for(b in this._events)a.off(b+this.NS,this._handler);this._events={};this.patterns=[]};m.prototype.pause=function(){this._paused=
!0};m.prototype.resume=function(){this._paused=!1};m.prototype._handler=function(a){if(!this._paused){var b={type:null,target:null,addedNodes:null,removedNodes:null,previousSibling:null,nextSibling:null,attributeName:null,attributeNamespace:null,oldValue:null};switch(a.type){case "DOMAttrModified":b.type="attributes";b.target=a.target;b.attributeName=a.attrName;b.oldValue=a.prevValue;break;case "DOMCharacerDataModified":b.type="characterData";b.target=c(a.target).parent().get(0);b.attributeName=a.attrName;
b.oldValue=a.prevValue;break;case "DOMNodeInserted":b.type="childList";b.target=a.relatedNode;b.addedNodes=[a.target];b.removedNodes=[];break;case "DOMNodeRemoved":b.type="childList",b.target=a.relatedNode,b.addedNodes=[],b.removedNodes=[a.target]}for(a=0;a<this.patterns.length;a++){var d=this.patterns[a],e=d.match(b);e.length&&e.each(function(){d.handler.call(this,b)})}}};m.prototype._addEvent=function(a){this._events[a]||(c(this._target).on(a+this.NS,this._handler),this._events[a]=!0)};c.fn.observe=
function(a,b,d){b?d||(d=b,b=null):(d=a,a=i);return this.each(function(){var e=c(this),f=e.data("observer");f||(f=n?new p(this):new m(this),e.data("observer",f));a=j(a);f.observe(a,b,d)})};c.fn.disconnect=function(a,b,d){a&&(b?d||(d=b,b=null):(d=a,a=i));return this.each(function(){var e=c(this),f=e.data("observer");f&&(a?(a=j(a),f.disconnect(a,b,d)):(f.disconnectAll(),e.removeData("observer")))})}})(jQuery);

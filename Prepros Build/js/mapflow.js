jQuery(document).ready(function($){
	
function pauseEvent(e){
	// oké, lets try this
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}
	
$('.mapflow-map').each(function(){
	var lat = $(this).data('lat');
	var lng = $(this).data('lng');
	var zoom = $(this).data('zoom');
	var pos = new google.maps.LatLng(lat, lng);
	var controls = !($(this).data('size') == 'small');
	var map = new google.maps.Map($(this)[0], {
		scrollwheel: false,
		zoom: zoom,
		center: pos,
		zoomControl: controls,
		streetViewControl: controls,
		overviewMapControl: controls,
		mapTypeControl: controls
	});
	new google.maps.Marker({position: pos, map: map});
});
	
var setMapflowPosition = function(el, pos){
	el.css('transform', 'translateY('+(-pos)+'px)');
	el.data('position', pos);
};
	
$('.mapflow-agencies').data('position', '0');
$('.mapflow-agency').click(function(e){
	var $this = $(this),
		$wrap = $this.parents('.mapflow-agencies');
	// check if element was grabbed
	if ( Math.abs($wrap.data('position-old')-$wrap.data('position')) > 10 ) {
		e.preventDefault();
	} else {
		$this.siblings('.active').removeClass('active');
		$this.addClass('active');
		var i = $this.prevAll().length,
			$infoWrap = $this.parents('.mapflow').find('.mapflow-info');
		$infoWrap.find('.active').removeClass('active');
		$infoWrap.find('.mapflow-agency').eq(i).addClass('active');
		// warning: check if this works on short lists
		var $el = $this.prev().length ? $this.prev() : $this,
			pos = $wrap.data('position'),
			topOffset = $el.position().top-$wrap.position().top;
		if ( (topOffset-pos) < 0 ) {
			// move list down to show previous item
			setMapflowPosition($wrap, topOffset);
		} else {
			$el = $this.next().length ? $this.next() : $this;
			var bottomOffset = $el.position().top-$wrap.position().top+$el.outerHeight() -  $wrap.parents('.mapflow-list').outerHeight() + parseInt($el.css('margin-top'));
			if ((bottomOffset-pos) > 0) {
				// or move list up to show next item
				setMapflowPosition($wrap, bottomOffset);
			}
		}
	};
});
$('.mapflow-agencies').mousedown(function(e){
	if (e.which != 1) return
	pauseEvent(e);
	var $this = $(this);
	$this.data('grabbed-from', e.pageY);
	$this.data('position-old', $this.data('position'));
	$this.addClass('mapflow-grabbing');
});
$('body').mouseup(function(e){
	// warning: not bulletproof
	var $this = $('.mapflow-agencies');
	if ($this.hasClass('mapflow-grabbing')) {
		$this.removeClass('mapflow-grabbing');
		var pos = $this.data('position'),
			maxPos = $this.outerHeight()-$this.parents('.mapflow-list').outerHeight();
		if (pos<0) {
			setMapflowPosition($this, 0);
		} else if ( pos > maxPos ) {
			setMapflowPosition($this, maxPos);
		}
	}
});
$('.mapflow').on('mousemove', '.mapflow-grabbing', function(e){
	var $this = $(this),
		pos = e.pageY-$this.data('grabbed-from')-$this.data('position-old');
	setMapflowPosition($this, -pos);
});

	
});
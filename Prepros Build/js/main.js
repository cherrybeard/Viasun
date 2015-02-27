jQuery(document).ready(function($){
	$('.slider-pro').sliderPro({
		arrows: true,
		autoplay: false,
		autoHeight: true,
		buttons: false,
		fadeCaption: false,
		fadeArrows: false,
		loop: false,
		thumbnailHeight: 70,
		thumbnailWidth: 190,
		width: '100%'
	});
	$('.select-countries').click(function(e){
		e.stopPropagation();
	});
	$('.select-countries-sections a[data-toggle=tab]').click(function(e){
		$(this).tab('show');
		$(this).parents('.dropdown').removeClass('active');
	});
});
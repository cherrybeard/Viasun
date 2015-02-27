jQuery(document).ready(function($){
	
	var checkBanner = function() {
		var paginationOffset = $('.nav-pagination').parent().offset().top - 800;
		var scrollPosition = $(document).scrollTop();
		if (scrollPosition > paginationOffset) {
			$('.bigbanner').removeClass('bigbanner-hidden');
		}
	}
	checkBanner();
	
	$(document).scroll(function() {
		checkBanner();
	});
	
	$('.bigbanner .close').click(function(){
		$(this).parents('.bigbanner').addClass('bigbanner-disabled');
		$('body').removeClass('body-bigbanner');
	});
});
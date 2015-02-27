function pluralize(count, s1, s2, s3) {
		var value = parseInt(count);
		if ([11, 12, 13, 14].indexOf(value % 100) != -1) {
			return s3;
		} else if (value % 10 == 1) {
			return s1;
		}
		if ([2, 3, 4].indexOf(value % 10) != -1) {
			return s2;
		}
		return s3;
	};
function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}
moment.locale('ru', {
	months : [
		'январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
	],
	monthsShort : [
		'янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авгу', 'сен', 'окт', 'ноя', 'дек'
	],
	weekdays : [
		'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'
	],
	weekdaysShort : [
		'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'
	],
	weekdaysMin : [
		'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'
	]
});
moment().locale('ru');
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
	$('[data-toggle=phone]').click(function(){
		$(this).addClass('btn-hidden');
	});
	$('[data-select=select]').simpleselect();
});
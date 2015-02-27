jQuery(document).ready(function($){
var BARS_HEIGHT = 120,
	BARS_BASE_HEIGHT = 0.2;
	
	moment.locale('ru');
	
var barHeight = function(value, min, max) {
	return Math.floor((value-min)/(max-min) * BARS_HEIGHT*(1-BARS_BASE_HEIGHT) + BARS_HEIGHT*BARS_BASE_HEIGHT);
}

var breakNumber = function(value) {
	if (value < 10000) return '' + value;
	var valueEnd = '' + (value % 1000),
		valueStart = Math.floor(value/1000);
	while (valueEnd.length != 3) {
		valueEnd = '0' + valueEnd;
	}
	return valueStart + ' ' + valueEnd;
}

$('.graph').each(function(){
	var $values = $(this).find('.graph-value'),
		values = [];
	$values.each(function(){
		values.push($(this).data('value'));
	});
	values = jQuery.grep(values, function(value) {
		return value;
	});
	var	absoluteMin = Math.min.apply(Math, values),
		min = Math.floor(absoluteMin/5000)*5000,
		max = Math.ceil(Math.max.apply(Math, values)/5000)*5000;
	$(this).find('.graph-level-max .graph-level-value').text(breakNumber(max));
	$(this).find('.graph-level-mid .graph-level-value').text(breakNumber((max-min)/2 + min));
	$(this).find('.graph-level-min .graph-level-value').text(breakNumber(min));
	$values.each(function(){
		var $this = $(this),
			value = $this.data('value');
		$this.find('.graph-value-bar').css('height', barHeight(value, min, max));
		if (value == absoluteMin) {
			$this.addClass('graph-value-min');
		}
		$this.find('.graph-value-date').text($this.data('id'));
		var date = moment({
			month: parseInt($this.parents('.graph-group').data('name'))-1,
			date: $this.data('id')
		});
		$this.find('.graph-value-weekday').text(date.format('dd'));
		if ((date.weekday() == 5) || (date.weekday() == 6)) {
			$this.addClass('graph-value-weekend');
		}
		var text = 'от <span class="text-price">'+ breakNumber(value) +'</span> ₽';
		if (!value) {
			text = 'туров нет'
		}
		$this.tooltip({
			html: true,
			title: text
		});
	});
	$(this).find('.graph-group').each(function(){
		var $this = $(this),
			month = moment({
				month: parseInt($this.data('name'))-1,
				date: 1
			});
		var format = 'MMMM';
		if ($this.find('.graph-value').length < 3) {
			format = ' ';
		} else if ($this.find('.graph-value').length < 4) {
			format = 'MMM';
		}
		$this.find('.graph-group-name span').text(month.format(format));
	});
});

});
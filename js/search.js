jQuery(document).ready(function($){
	$('[data-select=country]').selectize({
		render: {
			item: function(item, escape) {
				return '<div class="item">' +
					'<span class="countryflag countryflag-' + item.value +'">' + escape(item.text) + '</span>' +
				'</div>';
			},
			option: function(item, escape) {
				return '<div>' +
					'<span class="countryflag countryflag-' + item.value +'">' + escape(item.text) + '</span>' +
				'</div>';
			}
		}
	});
    $('[data-select=resort]').multiselect({
        includeSelectAllOption: true,
        selectAllText: 'Все курорты',
        nonSelectedText: 'Все курорты',
        buttonClass: 'btn btn-primary btn-sm',
        buttonContainer: '<div class="input-resort" />',
        maxHeight: 300,
        buttonText: function (options, select) {
            if ((options.length == 0) || (options.length == $('option', select).size())) {
                return this.nonSelectedText;
            }
            else {
                return options.length + ' курорт' + pluralize(options.length, '', 'а', 'ов');
            }
        }
    });
	$('[data-select=people]>.input-complicated>.dropdown-menu').click(function(e){
		e.stopPropagation();
		var target = e.target;
		$(this).find('.form-group.open').each(function(){
			if ($(this).get(0) != $(target).parent().get(0)) {
				$(this).removeClass('open');
			}
		});
	});
	var updatePeopleText = function($select){
		var adults = $select.find('.js-search-adults').val(),
			children = $select.find('.js-search-children').val(),
			text = '';
		if (children!='0') {
			text = adults + ' взр. и ' + children + ' реб.';
		} else {
			text = adults + ' взросл' + pluralize(adults, 'ый', 'ых', 'ых');
		}
		$select.find('.input-complicated>.dropdown-toggle').text(text);
	};
	$('[data-select=people] .js-search-adults').change(function(){
		updatePeopleText($(this).parents('[data-select=people]'));
	});
	$('[data-select=people] .js-search-children').change(function(){
		var $this = $(this),
			$select = $this.parents('[data-select=people]');
		updatePeopleText($select);
		var children = parseInt($this.val(), 10);
		if (children) {
			$select.find('.js-search-age').removeClass('off');
			$select.find('.js-search-age .form-group').each(function(index){
				if (children>0) {
					$(this).removeClass('off');
					children--;
				} else {
					$(this).addClass('off');
				}
			});
		} else {
			$select.find('.js-search-age').addClass('off');
			$select.find('.js-search-age .form-group').addClass('off');
		}
	});
	$('[data-select=nights]>.input-complicated>.dropdown-menu').click(function(e){
		e.stopPropagation();
		var target = e.target;
		$(this).find('.form-group.open').each(function(){
			if ($(this).get(0) != $(target).parent().get(0)) {
				$(this).removeClass('open');
			}
		});
	});
	$('[data-select=nights] [data-select=select]').change(function(){
		var $select = $(this).parents('[data-select=nights]'),
			$from = $select.find('.js-search-nights-from'),
			from = parseInt($from.val(), 10),
			$to = $select.find('.js-search-nights-to'),
			to = parseInt($to.val(), 10);
		if (from > to) {
			if (this === $from.get(0)) {
				$to.simpleselect('select', from);
				to = parseInt($to.val(), 10);
			} else {
				$from.simpleselect('select', to);
				from = parseInt($from.val(), 10);
			}
		};
		var text = from + ' – ' + to;
		if (from == to) {
			text = from;
		}
		$select.find('.input-complicated>.dropdown-toggle').text(text);
	});
	
	var tomorrow = moment().add(1, 'day');
	$('.js-search-date').datepicker({
		format: "dd/mm/yyyy",
    	startDate: tomorrow.format('DD/MM/YYYY'),
		language: 'ru'
	});
	$('.js-search-date').datepicker('update', tomorrow.format('DD/MM/YYYY'));
	$('[data-select=date]').find('.dropdown-toggle').text(tomorrow.format('D MMM'));
	$('.js-search-date').datepicker().on('changeDate', function(e){
		var $select = $(this).parents('[data-select=date]'),
			date = moment(e.date);
		if ($select.find('.select-date-range input').is(':checked')){
			var from = moment(date).subtract(3, 'days'),
				to = moment(date).add(3, 'days');
			if (from.isBefore(tomorrow)) {
				from = moment(tomorrow);
			};
			$select.find('.js-search-date-from').val(from.format('DD/MM/YYYY'));
			$select.find('.js-search-date-to').val(to.format('DD/MM/YYYY'));
		} else {
			$select.find('.js-search-date-from').val(date.format('DD/MM/YYYY'));
			$select.find('.js-search-date-to').val(date.format('DD/MM/YYYY'));
		}
		$select.find('.dropdown-toggle').text(date.format('D MMM'));
	});
	$('.js-search-date .datepicker-switch').click(function(e){
		e.stopPropagation();
	});
	$('[data-select=date]>.input-complicated>.dropdown-menu').click(function(e){
		e.stopPropagation();
	});
	var hotel_search = {
		countryID: 0,
		cityID: 0
	};
	$('[data-select=resort-big]').selectize();
	$('[data-select=hotel]').selectize({
		valueField: 'id',
		labelField: 'Title',
		searchField: 'Title',
		create: false,
		render: {
			option: function(item, escape) {
				var html = '<div class="item media">';
				/*html += '<div class="media-image">' +
						'<img src="' + item.Image + '">' +
					'</div>';*/
				html += '<div class="media-content">' +
						'<div class="hotel-stars">';
				for (var i = 1; i < parseInt(item.Stars); i++) {
					html+= '<span class="glyphicon glyphicon-star"></span>';
				};
				html += '</div>' +
						'<h4 class="hotel-name">' + escape(item.Title) + '</h4>' +
						'<p>' +
							'<span class="hotel-resort">'+ escape(item.City) + '</span>' +
							'<span class="hotel-rating hotel-rating-good">Рейтинг: ' + escape(item.Rating) + '</span>' +
					'</div>' +
				'</div>';
				return html
			}
		},
		load: function(query, callback) {
			if (!query.length) return callback();
			$.ajax({
				type: "POST",
				dataType: 'json',
				url: "/ajax/hotels/getcity/",
				data: {
					search: query,
					countryID: hotel_search.countryID,
					cityID: hotel_search.cityID
				},
				error: function() {
					callback();
				},
				success: function(res) {
					callback(res.result.hotel);
				},
				fixture: "fixtures/hotels.json"
			});
			/*
			$.ajax({
				url: 'https://api.github.com/legacy/repos/search/' + encodeURIComponent(query),
				type: 'GET',
				error: function() {
					callback();
				},
				success: function(res) {
					callback(res.repositories.slice(0, 10));
				}
			});*/
		}
	});
});
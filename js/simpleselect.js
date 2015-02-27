(function( $ ) {
 
    $.fn.simpleselect = function(action, value) {
		var $self, $select;
		if (action == 'select') {
			this.each(function() {
				var $self = $(this),
					$select = $self.parent(),
					$item = $select.find('.simpleselect-item[data-value="'+value+'"]');
				if ($item.length) {
					$item.siblings('.active').removeClass('active');
					$item.addClass('active');
					$select.find('.simpleselect').text($item.text());
					$select.find('.simpleselect').data('value', value);
					$select.find('select').val(value).trigger('change');
				}
			});
		} else {
			this.each(function() {
				$self = $(this);
				$self.css('display', 'none');
				var html = '',
					selectedText = '',
					selectedValue;
				html += '<div class="dropdown-menu simpleselect-menu">';
				$self.find('option').each(function(){
					var $this = $(this),
						text = $this.text(),
						val = $this.val(),
						active = '';
					if ($this.attr('selected')) {
						selectedText = text;
						selectedValue = val;
						active = ' active'
					}
					var	classes = 'class="simpleselect-item' + active + '"',
						value = 'data-value="' + val + '"';
					html += '<div ' + classes + ' ' + value + '>';
					html += text;
					html += '</div>';
				});
				html += '</div>';
				html = '<div data-toggle="dropdown" class="dropdown-toggle simpleselect" data-value="' + selectedValue + '">' + selectedText + '</div>' + html;
				$self.after($(html));
				$select = $self.parent();
				$select.on('click', '.dropdown-toggle', function() {
					var $select = $(this).parent();
					if (!$select.hasClass('open')) {
						$select.addClass('open');
					} else {
						$select.removeClass('open');
					};
				});
				$select.on('click', '.simpleselect-item', function() {
					var $this = $(this),
						$select = $this.closest('.simpleselect-menu').parent(),
						value = $this.data('value');
					$this.siblings('.active').removeClass('active');
					$this.addClass('active');
					$select.find('.simpleselect').text($this.text());
					$select.find('.simpleselect').data('value', value);
					$select.find('select').val(value).trigger('change');
					$select.removeClass('open');
				});
			});
		}
        return this;
    };
}( jQuery ));
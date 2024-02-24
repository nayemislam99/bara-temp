let header = document.querySelector('header');
let headerNavigation = document.querySelector('.navigation');
window.addEventListener("scroll", () => {
	header.classList.toggle('sticky', scrollY > 0);
});

// icon bars
const iconBar = document.querySelector('#iconBar');
iconBar.onclick = () => {
	iconBar.classList.toggle('fa-times');
	iconBar.classList.toggle('icon_active');
	headerNavigation.classList.toggle('active');
	// alert('iconBar clicked');
}


window.onscroll = function () { scrollFunction() };

function scrollFunction() {
	var scrollToTopBtn = document.getElementById("scrollToTopBtn");

	if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
		scrollToTopBtn.style.display = "block";
	} else {
		scrollToTopBtn.style.display = "none";
	}
}

function scrollToTop() {
	document.body.scrollTop = 0; // For Safari
	document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}




//uzzazal

// faq script 

document.querySelectorAll('.accordion-header').forEach(button => {
	button.addEventListener('click', () => {
		const accordionContent = button.nextElementSibling;

		button.classList.toggle('active');

		if (button.classList.contains('active')) {
			accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
		} else {
			accordionContent.style.maxHeight = 0;
		}

		// Close other open accordion items
		document.querySelectorAll('.accordion-header').forEach(otherButton => {
			if (otherButton !== button) {
				otherButton.classList.remove('active');
				otherButton.nextElementSibling.style.maxHeight = 0;
			}
		});
	});
});


//counter js  animated achievement section script

(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};

		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from: $(this).data('from'),
				to: $(this).data('to'),
				speed: $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals: $(this).data('decimals')
			}, options);

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;

			// references & variables that will change with each update
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};

			$self.data('countTo', data);

			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);

			// initialize the element with the starting value
			render(value);

			function updateTimer() {
				value += increment;
				loopCount++;

				render(value);

				if (typeof (settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}

				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;

					if (typeof (settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}

			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};

	$.fn.countTo.defaults = {
		from: 0,               // the number the element should start at
		to: 0,                 // the number the element should end at
		speed: 1000,           // how long it should take to count between the target numbers
		refreshInterval: 100,  // how often the element should be updated
		decimals: 0,           // the number of decimal places to show
		formatter: formatter,  // handler for formatting the value before rendering
		onUpdate: null,        // callback method for every time the element is updated
		onComplete: null       // callback method for when the element finishes updating
	};

	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}
}(jQuery));

jQuery(function ($) {
	// custom formatting example
	$('.count-number').data('countToOptions', {
		formatter: function (value, options) {
			return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
		}
	});

	// start all the timers
	$('.timer').each(count);

	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}
});

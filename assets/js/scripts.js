function tabs($this) {
    var active_tab = $this.attr('href');

    $(active_tab).addClass('is-active').siblings().removeClass('is-active');
    $this.addClass('is-active').siblings().removeClass('is-active');

}

$(document).ready(function() {

    $('.actions-type').on('click', function(e) {
        var $this = $(this);

        e.preventDefault();
        tabs($this);
    });

	$('.btn-user').on('click', function(e) {
		$('.popup_overlay').addClass('is-show');
		e.preventDefault();
	});

	$('.popup_close').on('click', function() {
		$('.popup_overlay').removeClass('is-show');
	});

	$('#main-slider').owlCarousel({
        items: 1,
        nav: true,
        dotsContainer: '.bullets'
    });

    $('.slider-nav_item').click(function (e) {
        $('#main-slider').trigger('to.owl.carousel', [$(this).index(), 300]);
        e.preventDefault();
    });

    $('#profile-feedback').tinycarousel({
        bullets  : true,
        buttons   : false
	});

    $('.grid').isotope({
  		itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer'
        }
	});
});
function tabs($this) {
    var active_tab = $this.attr('href');

    $(active_tab).addClass('is-active').siblings().removeClass('is-active');
    $this.addClass('is-active').siblings().removeClass('is-active');

}

function menuFixed() {
    var scrollTop = $(window).scrollTop(),
        menu = $('.js-menu-fixed');

    if (scrollTop > 150) {
        menu.addClass('menu-fixed-top');
    } else {
        menu.removeClass('menu-fixed-top');
    }
}

$(document).ready(function() {

    $(window).on('scroll', function() {
        menuFixed();
    });

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

    $('.js-btn-popup').on('click', function(e) {
        $('.popup_overlay').addClass('is-show');
        e.preventDefault();
    });

	$('#main-slider').owlCarousel({
        items: 1,
        nav: true,
        margin: 10,
        dotsContainer: '.bullets'
    });

    $('.slider-nav_item').on('click', function (e) {
        $('#main-slider').trigger('to.owl.carousel', [$(this).index(), 300]);
        e.preventDefault();
    });

    $('#feedback').owlCarousel({
        dots  : true,
        nav   : false,
        items : 1
	});

    $('.grid').isotope({
  		itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer'
        }
	});
});
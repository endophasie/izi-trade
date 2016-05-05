$(document).ready(function() {

	$('.btn-user').on('click', function(e) {
		$('.popup_overlay').addClass('is-show');
		e.preventDefault();
	});

	$('.popup_close').on('click', function() {
		$('.popup_overlay').removeClass('is-show');
	});

	$('#main-slider').tinycarousel({
        bullets  : true
    });

    $('#tab-slider').tinycarousel({
        bullets  : true,
        buttons   : false,
    	animation : false

    });

    /*$('.grid').isotope({
  		itemSelector: '.grid-item'
	});*/
});
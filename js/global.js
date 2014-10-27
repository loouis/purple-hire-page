(function($){

	$('.hear-team-gallery').bxSlider({
		mode: 'horizontal',
		pagerCustom: '#bx-pager'
	});


  $('a[href*=#]:not([href=#])').click(function(e) {
  	e.preventDefault();
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top -135
        }, 1000);
        return false;
      }
    }
  });



})(jQuery);
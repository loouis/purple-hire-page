( function( $ ){ 
	$( document ).ready(function () {
		iframeResize();
		subNavScroll();
		
		$('.main-nav').css('display', 'none');
		$('.menu-toggle').click(function () {
			$('.main-nav').slideToggle('medium');
		});
		
		$('.upload').click(function () {
			$('.upload').closest('h3')
			.css('background-color', 'red');
		});
		
		$( '.clients-area li a:first-child' ).click( function( e ){
			e.preventDefault();
			
			var quote = $( '#' + $( this ).data( 'quote-id' ) );
			
			quote.show();
			$( '#fade' ).show();
		});
		
		$( 'a[href="#"]' ).click( function( e ){
			e.preventDefault();
		})
		
		$( '.quote a.close' ).click( function( e ){
			e.preventDefault();
			
			$( this ).closest( '.quote' ).hide();
			$( '#fade' ).hide();
		});
		
		$( '.homepage video, .homepage object' ).maximage( 'maxcover' );
		
		$( '#meet-the-team #tabs a' ).click( function( e ){
			e.preventDefault();
			
			$( '#meet-the-team #tabs a' ).attr( 'id', '' );
			$( this ).attr( 'id', 'current' );
			
			var category = $( this ).data( 'category' );
			
			if ( !category )
				$( '#meet-the-team #content .team-member' ).fadeIn();
			else
			{
				$( '#meet-the-team #content .team-member:not( .' + category + ' )' ).fadeOut({
					complete: function(){
						$( '#meet-the-team #content .team-member.' + category ).fadeIn();
					}
				});
			}
		});
		
		$( 'input[type=file]' ).change( function( e ){
			$( this ).parent().addClass( 'uploaded' );
		});
		
		if ( !( 'placeholder' in $( '<input>' )[0] ) )
		{
			$( '*[placeholder]' ).each( function(){
				var placeholder = $( this ).attr( 'placeholder' );
				
				if ( $( this )[0].tagName.toLowerCase() == 'textarea' )
					$( this ).html( placeholder);
				else
					$( this ).val( placeholder );
				
				$( this )
					.focus( function(){
						if ( $( this )[0].tagName.toLowerCase() == 'textarea' )
						{
							if ( $( this ).text() == placeholder )
								$( this ).html( '' );
						}
						else
						{
							if ( $( this ).val() == placeholder )
								$( this ).val( '' );
						}
				})
					.blur( function(){
						if ( $( this )[0].tagName.toLowerCase() == 'textarea' )
						{
							if ( !$( this ).text() )
								$( this ).html( placeholder );
						}
						else
						{
							if ( !$( this ).val() )
								$( this ).val( placeholder );
						}
				});
			});
		}
		
		$( window ).on( 'resize', function( e ){
			iframeResize();
		});
		
		$( window ).on( 'scroll', function( e ){
			subNavScroll();
		});
		
		$( '.sub-menu a' ).on( 'click', function( e ){
			e.preventDefault();
			
			var scroll = 0;
			
			if ( $( this ).parent().index() != 0 )
			{
				scroll =  $( $( this ).attr( 'href') ).offset().top - 135;
				
				if ( !$( '.scroll' ).length )
					scroll -= $( '.sub-menu' ).outerHeight();
			}
			
			$( window ).scrollTop( scroll );
		});
		
		$( '#cookie_policy a#accept' ).on( 'click', function( e ){
			e.preventDefault();
			
			$( '#cookie_policy form input[type="submit"]' ).click();
		});
	});
	
	function subNavScroll()
	{
		//if ( window.innerWidth < 1016 ) return false;
		
		if ( window.scrollY >= 160 )
			$( '.sub-menu' ).addClass( 'scroll' );
		else
			$( '.sub-menu' ).removeClass( 'scroll' );
	}
	
	function iframeResize()
	{
		$( 'iframe' ).each( function(){
			var height = $( this ).attr( 'height' );
			var width = $( this ).attr( 'width' );
			var ratio = height / width;
			
			$( this ).css( 'height', $( this ).width() * ratio );
		});
	}
})( jQuery );



jQuery(window).load(function($){

  "use strict"; // jshint ;_;
    var realScreenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

  	/*===========================================================*/
	/*	Revolution Slider
	/*===========================================================*/	
	var tpj=jQuery;
	tpj.noConflict();

	tpj(document).ready(function() {

	if (tpj.fn.cssOriginal!=undefined)
		tpj.fn.css = tpj.fn.cssOriginal;

		tpj('.fullwidthbanner').revolution(
			{
				delay:9000,
				startwidth:1024,
				startheight:425,

				onHoverStop:"off",						// Stop Banner Timet at Hover on Slide on/off

				thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
				thumbHeight:50,
				thumbAmount:3,

				hideThumbs:200,
				navigationType:"none",				// bullet, thumb, none
				navigationArrows:"verticalcentered",				// nexttobullets, solo (old name verticalcentered), none

				navigationStyle:"square",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


				navigationHAlign:"center",				// Vertical Align top,center,bottom
				navigationVAlign:"bottom",					// Horizontal Align left,center,right
				navigationHOffset:0,
				navigationVOffset:0,

				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"center",
				soloArrowLeftHOffset:0,
				soloArrowLeftVOffset:0,

				soloArrowRightHalign:"right",
				soloArrowRightValign:"center",
				soloArrowRightHOffset:0,
				soloArrowRightVOffset:0,

				touchenabled:"on",						// Enable Swipe Function : on/off
				
				stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
				stopAfterLoops:1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

				fullWidth:"on",

				shadow:0								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)

		});
	});	
});



$(document).ready(function($) {

    //  ==========
    //  = Scroll event function =
    //  ==========
    var goScrolling = function(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = elem.offset().top;
        var elemBottom = elemTop + elem.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    };
    //  ==========
    //  = Progress bars =
    //  ==========
    $('.progress .bar').data('width', $(this).width()).css({
        width : 0
    });
    $(window).scroll(function() {
        $('.progress .bar').each(function() {
            if (goScrolling($(this))) {
                $(this).css({
                    width : $(this).attr('data-value') + '%'
                });
            }
        });
    })


	 /*----------------------------------------------------------*/
	 /*FLEX SLIDER*/
	 /*----------------------------------------------------------*/
	 if ( $( '.flexslider' ).length && jQuery() ) { 
	        var target_flexslider = $('.flexslider');
	        target_flexslider.flexslider({
	        animation:"fade",
			controlNav: true,
            directionNav: true, 
            slideshowSpeed: 4000
	    });
	}

	$('.testi').flexslider({
				animation:"slide",
				easing:"swing",
				controlNav: true, 
				reverse:true,
				smoothHeight:false,
				directionNav: false, 
				controlsContainer: '.testi-container',
				slideshowSpeed: 9000
	});
	$('.twitter-feed').flexslider({
				animation:"slide",
				easing:"swing",
				controlNav: false, 
				reverse:false,
				smoothHeight:false,
				directionNav: false, 
				slideshowSpeed: 3000
	});



    /*==================================================
	/*	Tooltip
	/*================================================== */
	$( 'body' ).tooltip({
		selector: "a[data-toggle=tooltip]"
	});


	/*===========================================================*/
	/*	FancyBox & toTop
	/*===========================================================*/	
	$(".fancybox").fancybox({
		openEffect	: 'none',
		closeEffect	: 'none'
	});
	
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});



	/*===========================================================*/
	/*	Isotope Posrtfolio
	/*===========================================================*/	
	if(jQuery.isFunction(jQuery.fn.isotope)){
		jQuery('.portfolio_list').isotope({
			itemSelector : '.list_item',
			layoutMode : 'fitRows',
			animationEngine : 'jquery'
		});

	/* ---- Filtering ----- */
		jQuery('#filter li').click(function(){
			var $this = jQuery(this);
			if ( $this.hasClass('selected') ) {
				return false;
			} else {
					jQuery('#filter .selected').removeClass('selected');
					var selector = $this.attr('data-filter');
					$this.parent().next().isotope({ filter: selector });
					$this.addClass('selected');
					return false;
				}
		});	
	}








	/*===========================================================*/
	/*	Slider : bxSlider, Carousel
	/*===========================================================*/
	var sliderTestim = $('.bxslider');
	sliderTestim.bxSlider({
		pagerCustom: '#bx-pager',
		auto: true,
		mode: 'vertical',
		controlDirections:true
	});

	//	Scrolled by user interaction
	$('#blog-carousel').carouFredSel({
		auto: false,
		width: '100%',
		prev : {
			button      : "#prev2",
			key         : "left",
			items       : 1,
			duration    : 750
			},
		next : {
			button      : "#next2",
			key         : "right",
			items       : 1,
			duration    : 750
		},
		mousewheel: true,
		swipe: {
			onMouse: false,
			onTouch: true
		}
	});

	
	/*===========================================================*/
	/*	Colorbox & flexslider in Single Post
	/*===========================================================*/	
	//Examples of how to assign the ColorBox event to elements
	$(".group1").colorbox({rel:'group1',
		transition:"fade",
		speed: 1700, 
		onComplete:function(){
			$('.flexslider').flexslider({
			animation: "slide",
			controlNav: false,
			directionNav: true,

		  });
		}
	});




	//---------------------------------- Google map location -----------------------------------------//
	

	// Create an array of styles.
	var styles = [
					{
						stylers: [
							{ saturation: -300 }
							
						]
					},{
						featureType: 'road',
						elementType: 'geometry',
						stylers: [
							{ hue: "#ecf0f1" },
							{ visibility: 'simplified' }
						]
					},{
						featureType: 'road',
						elementType: 'labels',
						stylers: [
							{ visibility: 'off' }
						]
					}
				  ],
					
					// Lagitute and longitude for your location goes here
				   lat = -7.79722,
				   lng = 110.36880,
			
				  // Create a new StyledMapType object, passing it the array of styles,
				  // as well as the name to be displayed on the map type control.
				  customMap = new google.maps.StyledMapType(styles,
					  {name: 'Styled Map'}),
			
				// Create a map object, and include the MapTypeId to add
				// to the map type control.
				  mapOptions = {
					  zoom: 12,
					scrollwheel: false,
					  center: new google.maps.LatLng( lat, lng ),
					  mapTypeControlOptions: {
						  mapTypeIds: [google.maps.MapTypeId.ROADMAP],
						
					  }
				  },
				  map = new google.maps.Map(document.getElementById('map'), mapOptions),
				  myLatlng = new google.maps.LatLng( lat, lng ),

				  marker = new google.maps.Marker({
					position: myLatlng,
					map: map,
					icon: "images/marker.png"
				  });
			
				  //Associate the styled map with the MapTypeId and set it to display.
				  map.mapTypes.set('map_style', customMap);
				  map.setMapTypeId('map_style');
		
	//---------------------------------- End google map location -----------------------------------------//
	


	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});

	/*===========================================================*/
	/*	Sticky Nav
	/*===========================================================*/	
	
	function scrollTo(target){
		$.scrollTo( $(target), 800 );
	}

	$('.navMenu').onePageNav({
		currentClass: 'current',
	    changeHash: false,
	    scrollSpeed: 750,
	    scrollOffset: 30,
	    scrollThreshold: 0.5,
	    filter: '',
	    easing: 'swing',
	    begin: function() {
	        //I get fired when the animation is starting
	    },
	    end: function() {
	        //I get fired when the animation is ending
	    },
	    scrollChange: function($currentListItem) {
	        //I get fired when you enter a section and I pass the list item of the section
	    }
	});
	



	/*$(".menu").sticky({topSpacing:0});*/
	$(".headContent").sticky({topSpacing:0});
	
      // Create the dropdown base
      $("<select />").appendTo("nav");
      
		// Create default option "Go to..."
		$("<option />", {
			"selected": "selected",
			"value"   : "",
			"text"    : "Go to..."
		}).appendTo("nav select");
      
      // Populate dropdown with menu items
      $("nav a").each(function() {
       var el = $(this);
       $("<option />", {
           "value"   : el.attr("href"),
           "text"    : el.text()
       }).appendTo("nav select");
      });
      
	   // To make dropdown actually work
      $("nav select").change(function() {
        window.location = $(this).find("option:selected").val();
      });





	/*===========================================================*/
	/*	Jquery Lavalamp Menus
	/*===========================================================*/	
	$('nav').lavaLamp({
		fx: 'easeOutQuad',
		autoResize:true,
		speed: 500,
		startItem:0,
	});
	
	document.getElementById('nav').scrollIntoView()

    // Placeholders for input/textarea
    $("input, textarea").placeholder();
         // Focus state for append/prepend inputs
    $('.input-prepend, .input-append').on('focus', 'input', function () {
      $(this).closest('.control-group, form').addClass('focus');
    }).on('blur', 'input', function () {
      $(this).closest('.control-group, form').removeClass('focus');
    });




	/*===========================================================*/
	/*	Contact Form
	/*===========================================================*/	
	$('#contact-form').validate({
	rules: {
		username: {
			minlength: 6,
			required: true
		},
		email: {
			required: true,
			email: true
		},
		url: {
			minlength: 12,
			required: true
		},
		message: {
			minlength: 10,
			required: true
			}
		},
		highlight: function(element) {
			$(element).closest('.control-group').removeClass('success').addClass('error');
		},
		success: function(element) {
			element
			.text('OK!').addClass('valid')
			.closest('.control-group').removeClass('error').addClass('success');
		}
	});
      
    // Tabs
    $(".nav-tabs a").on('click', function (e) {
      e.preventDefault();
      $(this).tab("show");
    })

    jQuery(".accordion").on("show",function (e) {
        jQuery(e.target).prev(".accordion-heading").find(".accordion-toggle").addClass("active");
    }).on("hide",function (e) {
                jQuery(this).find(".accordion-toggle").not(jQuery(e.target)).removeClass("active");
            }).each(function () {
                var $a = jQuery(this);
                $a.find("a.accordion-toggle").attr("data-parent", "#" + $a.attr("id"));
            });




		var hash = window.location.hash,
			hashParts = hash.split("&");
		if (hash.length > 1){
			$("a[href='" + hashParts[0] + "']").trigger("click");
			setTimeout(function(){
				$("a[href='#" + hashParts[1] + "']").trigger("click");
			},100);
		}

/*********remove active class top menu**********/
		$(".navbar").each(function(){
			var self = $(this);
			self.find("a[href^='#']").on("click", function(){
				if (self.find("button[data-toggle='collapse']").is(":visible")) {
					self.find("button[data-toggle='collapse']").trigger("click");
				}
			});
		});
  function scrollTo(target){
		$.scrollTo( $(target), 2000 );
	}

    $('[data-spy="scroll"]').each(function () {
    	var $spy = $(this).scrollspy('refresh')
    });




});


	$(".twitter-feed").tweet({
		join_text: "auto",
		username: ["envato"],
		modpath: "inc/twitter/",
		count: 10,
		loading_text: "loading ..."
    });

    
/*===========================================================*/
/*	Preloader 
/*===========================================================*/	

//<![CDATA[
	$(window).load(function() { // makes sure the whole site is loaded
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
	})
//]]>


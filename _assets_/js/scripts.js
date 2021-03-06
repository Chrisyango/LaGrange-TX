/*-----------------------------------------------------------------------------------

	Theme Name: LaGrange, TX
	Front-end Developer: Chris Yang
	Author Design: Samir Alley @samiralley | Tom Gooden @good3n
	Author URI: http://www.revize.com/
	Date: April 9, 2019

-----------------------------------------------------------------------------------*/

(function($) {

	'use strict';

	var $window = $(window),
		$body = $('body');

	/*!
	 * IE10 viewport hack for Surface/desktop Windows 8 bug
	 * Copyright 2014-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	// See the Getting Started docs for more information:
	// http://getbootstrap.com/getting-started/#support-ie10-width
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(
			document.createTextNode(
			  '@-ms-viewport{width:auto!important}'
			)
		); document.querySelector('head').appendChild(msViewportStyle);
	}

	/*
	* E-Notify Auto submit
	*/
	$.urlParam=function(n){var e=new RegExp("[?&]"+n+"=([^]*)").exec(window.location.href);return null==e?null:e[1]||0};
	var $enotify = $('iframe[src*="/revize/plugins/notify/notify.jsp"]');
	if( $enotify.length > 0 ){
		var emailStr = $.urlParam("email");
		if( emailStr != null ){
			$enotify.attr("src", $enotify.attr("src") + "&email=" + emailStr);
		}
	}

	// RZ Class
	if(typeof RZ !== "undefined"){
	 if(RZ.login){
	  $body.addClass("user-logged-in");
	 } else{
		 $body.addClass("user-not-logged-in");
	 }
	}

	// Search Toggle
	$('#search-toggle').on('click keypress',function(e){
		$('#search').stop().slideToggle(200);
		$(this).toggleClass('fa-search fa-close');
	});

	$('#search-toggle-mobile').on('click keypress',function(e){
		$('#search').stop().slideToggle(200);
		$(this).toggleClass('fa-search fa-close');
	});

	// Navigation Toggle
	$("#nav-toggle").on("click keypress", function(){
		$("#nav").stop().slideToggle();
		$(this).toggleClass("active");
	});
	
	// Keyboard Navigation: Nav, flyout
	var isClick = false;
	$("#nav li a, #flyout  li a, a, button, .toggle, .toggle2").on('focusin', function(e) {
		console.log(isClick);
		if( isClick === false ) {
			$(".focused").removeClass("focused");
			$(e.currentTarget).parents("#nav li, #flyout li").addClass("focused");
			$(".opened:not(.focused) ul:visible,.opened2:not(.focused) ul:visible").slideUp().parent().removeClass("opened opened2");
		} else {
			$(".focused").removeClass("focused");
			isClick = false;
		}
	});

	// prevent focused class changes on click - This way arrows wont pop when clicking nav links
	$("#nav a,#flyout a").on('mousedown',function(){
		isClick = true;
	});

	// Menu Arrows
	// $("#nav > li:has(ul)").addClass('first-parent').children("a,span").append('<i class="fa fa-angle-down down-arrow">');

	// Menu Toggles
	$("#nav >li").has("ul").addClass('dropdown')
	$("#nav >li>ul,#flyout >li>ul").addClass('first-level');
	$("#nav  li ul ul").addClass('second-level');
	$("#nav >li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle" tabindex="0">');
	$("#nav li li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle2" tabindex="0">');
	$("#flyout >li:has(ul)").find("a:first").append('<i class="fa fa-angle-down toggle" tabindex="0">');

	function addNavClass() {
		if ($window.width() < 992) {
			$("body").addClass('mobile');
			$("body").removeClass('desktop');

		} else{
			$("body").addClass('mobile');
			$("body").removeClass('desktop');
		}
	}
	addNavClass();
	$window.resize(addNavClass);

	$(".toggle").on("click keypress",function(e) {
			e.preventDefault();
	  var $parent = $(this).parent();
	  var $parentLi = $parent.parent();
	  $parentLi.toggleClass('opened');
	  if($parent.addClass('active').next('.first-level').is(":visible")){
		$parent.next('.first-level').slideUp();
	  } else {
		$(".first-level").slideUp("slow");
		$parent.removeClass('active').next('.first-level').slideToggle();
	  }
	});

	$(".toggle2").on("click keypress",function(e) {
			e.preventDefault();
	  var $parent = $(this).parent();
	  var $parentLi = $parent.parent();
	  $parentLi.toggleClass('opened2');
	  if($parent.next('.second-level').is(":visible")){
		$parent.next('.second-level').slideUp();
	  } else {
		$(".second-level").slideUp("slow");
		$parent.next('.second-level').slideToggle();
	  }
	});

	//colapse nav if left
	$(".desktop *").focus(function(e){
		var $opened = $(".opened");
		var $opened2 = $(".opened2");
		if( $opened.length > 0 || $opened2.length > 0 ) {
			if( $(".opened :focus").length < 1 ){
				$opened.children("ul").slideUp();
				$opened.removeClass("opened");
				$(".opened2").removeClass("opened2");
			}
			if( $(".opened2 :focus").length < 1 ){
				$opened2.children("ul").slideUp();
				$opened2.removeClass("opened2");
			}
		}
	});
	// Flyout
	var flyout = $('#flyout'),
		flyoutwrap = $('#flyout-wrap');

	if (flyout.text().length){
		flyoutwrap.prepend('<div id="flyout-toggle" class="hidden-lg hidden-md"><i class="fa fa-bars"></i> Sub Menu</div>');
	}

	$("#flyout-toggle").on("click", function(){
		flyout.stop().slideToggle();
		$(this).toggleClass("active");
	});

	$("#flyout ul").addClass('flyout-children');

	var flyoutChildren = $('.flyout-children');
	
	// start calendar resize handler
	function resizeIframe(height) {
		var iFrameID = document.getElementById('calendar');
		if(iFrameID) {
				// here you can set the height, I delete it first, then I set it again
				iFrameID.height = "";
				iFrameID.height = height;
		}
		console.log("height to: " + height);
	}
	var eventMethod = window.addEventListener
	? "addEventListener"
	: "attachEvent";
	var eventHandler = window[eventMethod];
	var messageEvent = eventMethod === "attachEvent"
		? "onmessage"
		: "message";
	eventHandler(messageEvent, function (e) {

		if( e.data && e.data[0] === "setCalHeight" )
		{
			if(typeof resizeIframe === 'function'){
				resizeIframe(e.data[1]);
			}

		}

	});
	// end calendar resize handler

	// revizeWeather
	if( typeof $.fn.revizeWeather !== "undefined" ){
		$.fn.revizeWeather({
			zip: '78945',
			city_name: '',
			unit: 'f',
			success: function(weather) {
				var date = new Date();
				date = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
				var html = '<i class="'+weather.icon+'"></i>';
				html += '<span class="forecast">'+weather.temp+'&deg; </span>';

				$("#weather").html(html);
			},
			error: function(error) {
				// better to just hide the secion if there is an error
				$('.weather').hide();
				console.log(error);
			}
		});
	}

	// Twitter Feed
	if(typeof $.fn.tweet !== "undefined"){
		$("#twitter-feed").tweet({
			modpath: '_assets_/plugins/twitter/',
			username: "RevizeSoftware",
			join_text: "auto",
			avatar_size: 0,
			count: 3,
			auto_join_text_default: "",
			auto_join_text_ed: "",
			auto_join_text_ing: "",
			auto_join_text_reply: "",
			auto_join_text_url: "<i class='fa fa-twitter'></i>",
			loading_text: "Loading Tweet..."
		});
	}

	// bxSlider
	if(typeof $.fn.bxSlider !== "undefined"){
		$('.bxslider').bxSlider({
			mode:'fade',
			auto:($('.bxslider').children().length < 2) ? false : true,
			pager: false
		});

		
		if($('#homepage').length) {
			// Add cover for each slide
			$('.bxslider li>div').append('<div id="welcome-bg-cover" style="background:url(./_assets_/images/welcome-bg-cover.png) center no-repeat;background-size:cover;"></div>')
		}
	}

	// Owl Slider
	if(typeof $.fn.owlCarousel !== "undefined"){
		let quickLinkCount = $('.quick-link').length;
		const quickLinkItem = function(num) {
			return (quickLinkCount >= num ? num : quickLinkCount);
		}
		$("#quick-links-wrapper").owlCarousel({
			loop: quickLinkCount > 1 ? true : false,
			responsiveClass: true,
			nav: true,
			navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
			margin: 0,
			responsive: {
				0: {
					items: quickLinkItem(1),
					margin: 15
				},
				500: {
					items: quickLinkItem(2),
					margin: 15
				},
				800: {
					items: quickLinkItem(3),
					margin: 15
				},
				1100: {
					items: quickLinkItem(4),
				},
				1400: {
					items: quickLinkItem(5),
					loop: false,
					nav: false
				}
			}
		});

		let newsLinkCount = $('.news-link').length;
		const newsLinkItem = function(num) {
			return (newsLinkCount >= num ? num : newsLinkCount);
		}
		$("#news-links").owlCarousel({
			loop: newsLinkCount > 1 ? true : false,
			responsiveClass: true,
			nav: true,
			navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
			margin: 70,
			center: true,
			startPosition: 1,
			onInitialize: function() {
				$('#news-links > .owl-height').height($('#news-links > .owl-height').outerHeight() + 60);
				$('#news-links').find('.news-link').each(function () {
					$(this).css('margin-bottom', '60px');
				});
			},
			responsive: {
				0: {
					items: newsLinkItem(1),
				},
				768: {
					items: newsLinkItem(2),
				},
				1281: {
					items: newsLinkItem(3),
					loop: false,
					nav: false,
					margin: 103
				}
			}
		});

		
	}

	$window.ready(function(){

		// Social Feed
		if ( typeof $.fn.socialfeed !== "undefined"){
			$('#social-feed').socialfeed({
				// Facebook
				facebook:{
					accounts: ['@spanishforklibrary'],
					limit: 3,
					access_token: 'EAAMkcCLFBs8BAEnpzLa3fg98gku0FhSwmvKZAujQ5m6RLRlHnIUnPaAexISWwIMA4VEoHuFUEWufVXIsasnQFRaDys2613NJUqt5sE5FqAr1sYrgnLZBPgeDmP8cZAkv7sFZBQOxUdrz2B7udHItF8tNMWiZC5iJfqkmWWK06BQZDZD'
				},

				// Instagram
				instagram:{
				accounts: ['&251086740'],
				limit: 3,
				access_token: '251086740.1677ed0.e1c9d6d2c0e747518b4d5dccec71a1bd'
				},

				// General settings
				length:80,
				show_media:true,
				media_min_width: 300,
				template: "_assets_/templates/template.html",
				callback: function() {
					if ($('.tweet_list').length) {
						$('.tweet_list > li').addClass('social-feed-element').each(function() {
							$(this).prependTo($('#social-feed'));
						});

						var owl = $("#social-feed")
						var fixOwl = function(){
							var $stage = $('.owl-stage'),
								stageW = $stage.width(),
								$el = $('.owl-item'),
								elW = 0;
							$el.each(function() {
								elW += $(this).width()+ +($(this).css("margin-right").slice(0, -2))
							});
								if ( elW > stageW ) {
									$stage.width( elW );
							};
							$('#social-feed .social-img-container img').css('display', 'block');
							$('#social-feed').prepend('<div id="overlay-before"></div><div id="overlay-after"></div>');
						}

						var randomOwl = function(){
							owl.children().sort(function(){
									return Math.round(Math.random()) - 0.5;
							}).each(function(){
									$(this).appendTo(owl);
							});
						};

						owl.owlCarousel({
							loop: false,
							onInitialize : randomOwl,
							onInitialized: fixOwl,
							nav: true,
							autoWidth: true,
							onTranslated: function() {
								if ($('#social-feed .owl-item:first').hasClass('active')) {
									$('#overlay-before').css('opacity', '0');
									$('#social-feed .owl-prev').css('opacity', '0');
									$('#social-feed').css('padding-left', '30px');
								} else {
									$('#overlay-before').css('opacity', '1');
									$('#social-feed .owl-prev').css('opacity', '1');
									$('#social-feed').css('padding-left', '0');
								}
								if ($('#social-feed .owl-item:last').hasClass('active')) {
									$('#overlay-after').css('opacity', '0');
									$('#social-feed .owl-next').css('opacity', '0');
									$('#social-feed').css('padding-right', '30px');
								} else {
									$('#overlay-after').css('opacity', '1');
									$('#social-feed .owl-next').css('opacity', '1');
									$('#social-feed').css('padding-right', '0');
								}
							},
							navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
							margin: 30,
							responsive: {
								0: {
									items: 1
								},
								991: {
									items: 2
								}
							}
						});
					}
					$('.social-feed-element').matchHeight({
						//defaults
						byRow: true,
						property: 'height', // height or min-height
						target: null,
						remove: false
					});
				}
			});
		}

		// matchHeight
		if(typeof $.fn.matchHeight !== "undefined"){
			$('.news-link').matchHeight({
				//defaults
				byRow: true,
				property: 'height', // height or min-height
				target: null,
				remove: false
			});
			$('.quick-link').matchHeight({
				//defaults
				byRow: true,
				property: 'height', // height or min-height
				target: null,
				remove: false
			});
		}

		// Animations http://www.oxygenna.com/tutorials/scroll-animations-using-waypoints-js-animate-css
		function onScrollInit( items, trigger ) {
			items.each( function() {
				var osElement = $(this),
					osAnimationClass = osElement.data('os-animation'),
					osAnimationDelay = osElement.data('os-animation-delay');

				osElement.css({
					'-moz-animation-delay':     osAnimationDelay,
					'animation-delay':          osAnimationDelay,
					'-webkit-animation-delay':  osAnimationDelay
				});

				var osTrigger = ( trigger ) ? trigger : osElement;

				if(typeof $.fn.waypoint !== "undefined"){
					osTrigger.waypoint(function() {
						osElement.addClass('animated').addClass(osAnimationClass);
					},{
						triggerOnce: true,
						offset: '100%'
					});
				}
			});
		}
		onScrollInit($('.os-animation'));

		//#Smooth Scrolling
		$('a[href*=#]:not([href=#],[href*="#collapse"])').on('click keypress', function() {
			if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					if (target.selector === "#main") {
						setTimeout(function() {
							// Setting 'tabindex' to -1 takes an element out of normal 
							// tab flow but allows it to be focused via javascript
							$(target.selector).attr('tabindex', -1).on('blur focusout', function () {

								// when focus leaves this element, 
								// remove the tabindex attribute
								$(this).removeAttr('tabindex');

							}).focus(); // focus on the content container
						}, 1000);
					}
					return false;
				}
			}
		});

		/*global jQuery */
		/*!
		* FlexVerticalCenter.js 1.0
		*
		* Copyright 2011, Paul Sprangers http://paulsprangers.com
		* Released under the WTFPL license
		* http://sam.zoy.org/wtfpl/
		*
		* Date: Fri Oct 28 19:12:00 2011 +0100
		*/
		$.fn.flexVerticalCenter = function( options ) {
			var settings = $.extend({
				cssAttribute:   'margin-top', // the attribute to apply the calculated value to
				verticalOffset: 0,            // the number of pixels to offset the vertical alignment by
				parentSelector: null,         // a selector representing the parent to vertically center this element within
				debounceTimeout: 25,          // a default debounce timeout in milliseconds
				deferTilWindowLoad: false     // if true, nothing will take effect until the $(window).load event
			}, options || {});

			return this.each(function(){
				var $this   = $(this); // store the object
				var debounce;

				// recalculate the distance to the top of the element to keep it centered
				var resizer = function () {

					var parentHeight = (settings.parentSelector && $this.parents(settings.parentSelector).length) ?
						$this.parents(settings.parentSelector).first().height() : $this.parent().height();

					$this.css(
						settings.cssAttribute, ( ( ( parentHeight - $this.height() ) / 2 ) + parseInt(settings.verticalOffset) )
					);
				};

				// Call on resize. Opera debounces their resize by default.
				$(window).resize(function () {
					clearTimeout(debounce);
					debounce = setTimeout(resizer, settings.debounceTimeout);
				});

				if (!settings.deferTilWindowLoad) {
					// call it once, immediately.
					resizer();
				}

				// Call again to set after window (frames, images, etc) loads.
				$(window).load(function () {
					resizer();
				});

			});

		};
		$('.v-align').flexVerticalCenter();
	}); // Ready

})(jQuery);

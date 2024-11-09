    	/*var onReCaptchaLoad = function() {
		var reCaptcha;
		var recaptchas = document.querySelectorAll('div[data-sitekey]');
			for (i = 0; i < recaptchas.length; i++) {
				reCaptcha = grecaptcha.render(recaptchas[i].id, {
				  'sitekey' : recaptchas[i].dataset.sitekey,
				});
			}
		};*/
		function recaptchaReload(id){
			console.log(id);
			var _recaptcha = document.getElementById(id).getElementsByClassName('g-recaptcha')[0];
			var _recaptcha_id = _recaptcha.getAttribute('id');
			var _sitekey = _recaptcha.getAttribute('data-sitekey');
			grecaptcha.render( _recaptcha, { sitekey : _sitekey } );
		}

$(document).ready(function () {
    
   var scriptsLoaded = false;

   // Предварительно загружаем бекграунды
   function preloadImages() {
      for (var i = 0; i < arguments.length; i++) {
         new Image().src = arguments[i];
      }
   }
   preloadImages(
      "assets/images/main-bg.jpg",
      "assets/images/we-do-1.jpg",
      "assets/images/we-do-2.jpg",
      "assets/images/wo-do-3.jpg",
      "assets/images/we-do-4.jpg",
      "assets/images/bg-5.jpg",
      "assets/images/bg-6.jpg",
      "assets/images/bg-7.jpg",
      "assets/images/bg-8.jpg",
      "assets/images/bg-9.jpg",
      "assets/images/bg-10.jpg",
      "assets/images/bg-11.jpg",
      "assets/images/bg-12.jpg",
      "assets/images/bg-13.jpg",
      "assets/images/fon-case.jpg"
   );

   function initScripts() {  

      scriptsLoaded = true;
      console.log('scripts are loaded for page ' +window.location.pathname + '!');
        
        $(window).bind('resize', function(){
            if ($(window).width() > 768) {
                $('.js_tiles_slised').filter('.slick-initialized').slick('unslick');
            } else {
                $('.js_tiles_slised').each(function(){

                    $('.js_tiles_slised').not('.slick-initialized').slick({
                        speed: 600,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        swipe: true,
                        dots: false,
                        arrows:true,
                        infinite: true,
                        adaptiveHeight: true,
                    });    
                });
            }
        }).trigger('resize');
        
        $('.js_scroll').mCustomScrollbar({
            axis:"x",
            advanced:{autoExpandHorizontalScroll:true},
        	theme:"rounded",
        	setWidth: "auto",
        	scrollbarPosition:'outside'
        });
            
        /* tabs табы */
        $('.js_tabs').each(function() {
        	var $tabs = $(this);
        	$tabs.find('.js_tabscontent:not(:first)').hide();
        	$tabs.find('.js_tabstitle').first().addClass('active');
        	$tabs.find('.promotion_tabs_mobile_title').first().addClass('active');
        	
        	$tabs.on('click', '.js_tabstitle:not(.active)', function() {
        		$(this)
        		.addClass('active').siblings().removeClass('active')
        		.closest($tabs).find('.js_tabscontent').hide().eq($(this).index()).show().addClass('active')
        		.closest($tabs).find('.promotion_tabs_mobile_title').removeClass('active').eq($(this).index()).addClass('active');
        	});
        	
        	$tabs.on('click', '.promotion_tabs_mobile_title:not(.active)', function() {
        	    $(this)
        		.addClass('active').siblings().removeClass('active')
        		.closest($tabs).find('.js_tabscontent').hide().removeClass('active');
        		$(this).closest($tabs).find('.promotion_list__item').removeClass('active').eq($(this).index()).addClass('active');
        		$(this).next().show().addClass('active');
        	});
        }); 
        
        /* filter фильтрация */
        $('.js_simple_filter').each(function(){
            var 
                $filter = $(this),
                $button = $filter.find('li > span'),
                $element = $filter.find('.works_block__item'),
                $sum_width = 0,
                $container = $filter.find('.container').width();
                
            $button.on('click',function(){
                var $sort = String($(this).data('type'));
                $button.removeClass('active');
                $(this).addClass('active');
                if ($sort != 0) {
                    $('.js_scroll').mCustomScrollbar("destroy");
                    $element.hide();
                    $element.each(function(){
                        var 
                            $sections = String($(this).data('section')),
                            $arr = ($sections).split('||');
                            
                        if( $.inArray($sort, $arr) !== -1) {
                            $(this).show();
                            $sum_width += $(this).outerWidth();
                        }
                    });
                    
                    if(($sum_width + 200) > $container){
                       $('.js_scroll').mCustomScrollbar({
                    	    axis:"x",
                    	    advanced:{autoExpandHorizontalScroll:true},
                    		theme:"rounded",
                    		setWidth: "auto",
                    		scrollbarPosition:'outside'
                    	}); 
                    };
                
                } else {
                    $('.js_scroll').mCustomScrollbar({
                	    axis:"x",
                	    advanced:{autoExpandHorizontalScroll:true},
                		theme:"rounded",
                		setWidth: "auto",
                		scrollbarPosition:'outside'
                	});
                    $element.show();
                }
                
                $sum_width = 0;
            });
        });


      // маска для инпута телефонов
      $(".phone").mask("+7 (999) 999-9999");

      // уменьшение стрелки в кейсах
      $(window).scroll(function(){
         var scroll = $(window).scrollTop();
         if ($('body').hasClass('case')) {
            if(scroll > 250)
               $('.case-back').addClass('small')
            else  
               $('.case-back').removeClass('small')     
         }
      })
      
      // Карта яндекс

      if ($('#ymap').length > 0 && $('#ymap').html() != '') {
         function showYMap(coord, el) {
            ymaps.ready(init);
            var myMap,
               myPlacemark;
            coord = coord.split(', ');

            function init() {
               myMap = new ymaps.Map(el, {
                  center: coord,
                  zoom: 14,
                  controls: ['zoomControl', 'fullscreenControl', 'rulerControl']
               });

               myPlacemark = new ymaps.Placemark(coord, {
                  balloonContent: 'Интернет - агентство Электрон', iconCaption: 'Интернет - агентство Электрон, БЦ "Нова Парк", 5 этаж, офис 502-503'
               });
               myMap.geoObjects.add(myPlacemark);
               myMap.behaviors.disable("scrollZoom");
            }
         }
         showYMap('56.868186, 53.273722', 'ymap');
      }

      /* создаем меню фильтров в кейсах */
      function constructFilters(){
         let years = [];
         let industries = [];
         let sections = [];
         let lists = ['',''];

         if ($('.b-preview-menu').length>0){
            $('.dragable-slider-item').each(function(){

               let year = $(this).data('year');
               let industry = $(this).data('industry');
               let section = $(this).data('section');

               if(years.indexOf(year) < 0){
                  years.push(year);
               }
               if (industries.indexOf(industry) < 0) {
                  industries.push(industry);
               }
               if (sections.indexOf(section) < 0) {
                  sections.push(section);
               }

            });
            
            years.sort();
            years.forEach(function (index) {
               lists[0] += '<li><a href="#" data-show-year="' + index + '">' + index +'</li>';
            });
            industries.forEach(function (index) {
               lists[1] += '<li><a href="#" data-show-industry="' + index + '">' + index + '</li>';
            });
            years.forEach(function (index) {
               sections[2] += '<li><a href="#" data-show-section="' + index + '">' + index + '</li>';
            });

            // if ($('.r-submenu-list [index=year] ul').children('li').length == 0) $('.r-submenu-list [index=year] ul').append(lists[0]);
            if ($('.r-submenu-list [index=branch] ul').children('li').length == 0) $('.r-submenu-list [index=branch] ul').append(lists[1]);
            if ($('.r-submenu-list [index=year] ul').children('li').length == 0) $('.r-submenu-list [index=year] ul').append(lists[2]);

         }
      }
      constructFilters();

      $('.b-preview-submenu a').click(function(e){
         e.preventDefault();
         $(this).parent('li').addClass('is-active');
         $(this).parent('li').siblings().removeClass('is-active');
         
         if ($(this).attr('data-show-industry')){
            let val = $(this).data('show-industry');
            $('.dragable-slider .dragable-slider-item').each(function(){
               $(this).data('industry') == val ? $(this).show().addClass('visible') : $(this).hide().removeClass('visible');
            })

         }
         else if ($(this).attr('data-show-year')) {
            let val = $(this).data('show-year');
            $('.dragable-slider .dragable-slider-item').each(function () {
               $(this).data('year') == val ? $(this).show().addClass('visible') : $(this).hide().removeClass('visible');
            })
         }
         else if ($(this).attr('data-show-section')) {
            let val = $(this).data('show-section');
            $('.dragable-slider .dragable-slider-item').each(function () {
               $(this).data('section') == val ? $(this).show().addClass('visible') : $(this).hide().removeClass('visible');
            })
         }
         $('.dragable-slider').css('translateX','25%')
      })

      var cityList = $('.city__list'),
         citySelect = $('.city__select'),
         cityItem = $('.city__item'),
         contactsList = $('.contacts__list');

      citySelect.click(function () {
         cityList.slideToggle(300);
         $(this).toggleClass('opened');
      });
      cityItem.click(function () {
         var city = $(this).attr('id')
         $(this).siblings().removeClass('active');
         $(this).addClass('active');
         cityList.fadeOut(300);
         citySelect.text($(this).text());

         contactsList.removeClass('active')
            .filter('.contacts__list--' + city)
            .addClass('active');
      });
      
      // Вакансии
      $('.vacancies__title').on('click', function (event) {
         event.preventDefault();
         var parent = $(this).parents('.vacancies');
         parent.find($('.vacancies__title')).not($(this)).removeClass('active');
         $(this).toggleClass('active');
         parent.find($('.vacancies__content').not($(this).siblings('.vacancies__content'))).slideUp(400);
         $(this).siblings('.vacancies__content').slideToggle(400);
      });
      $('.prices__title').on('click', function (event) {
         event.preventDefault();
         var parent = $(this).parents('.prices');
         parent.find($('.prices__title')).not($(this)).removeClass('active');
         $(this).toggleClass('active');
         parent.find($('.vacancies__content').not($(this).siblings('.vacancies__content'))).slideUp(400);
         $(this).siblings('.vacancies__content').slideToggle(400);
      });

      if (jQuery(this).width() <= 768) {
         // Добавляем в родителей подменю в каталог и в футер - стрелочки в моб версии
         $(".header-menu__item.parent > a").one("click", false);
      }

      $('.changing-container').css({ 'min-height': $(window).height() - $('header').outerHeight() - $('footer').outerHeight() - 60 });

      $('.fancybox-images').fancybox({
         baseClass: "fancy-image",
         hash: false,
         clickContent: false,
         afterLoad: function (instance, current) {
            var ww = $(window).width(),
               wh = $(window).height(),
               imgWidth = ww * 0.67;
            imgHeight = wh * 0.67;
            if (current.width >= imgWidth || current.height >= imgHeight) {
               current.width = current.width * 0.67;
               current.height = current.height * 0.67;
            }
         },
         afterShow: function (instance, current) {
            $('.fancybox-image').off();
            $('.fancybox-image').on('click', function (event) {
               instance.next();
            });
         }
      });
      $('.fancybox').fancybox();
      $('.callback-link, .feedback, .city-link').fancybox({
         baseClass: 'callback-fancy'
      });

      $('.main-slider').not('.slick-initialized').slick({
         speed: 600,
         slidesToShow: 1,
         slidesToScroll: 1,
         swipe: false,
         dots: true,
         infinite: false,
         adaptiveHeight: true,
         responsive: [{
            breakpoint: 480,
            settings: {
               dots: false,
               swipe: true
            }
         }]
      });
      
      $('.stage-slider').not('.slick-initialized').slick({
         speed: 600,
         slidesToShow: 1,
         slidesToScroll: 1,
         swipe: false,
         dots: true,
         infinite: false,
         adaptiveHeight: true,
         responsive: [{
            breakpoint: 480,
            settings: {
               dots: false,
               swipe: true
            }
         }]
      });



      // Меню кейсы
      function caseMenu() {
         var mainLi = $('.b-preview-menu li'),

            sublistLi = $('.r-submenu-list li');
         mainLi.on('click', function (event) {
            event.preventDefault();
            var mainLiTheme = $(this).attr('index');

            if (mainLiTheme) {
               mainLi.not($(this)).addClass('li-Hidden');
               $(this).parents('.b-preview-menu').addClass('is-submenu-active');
               sublistLi.removeClass('m-show');
               $('.e-back').addClass('m-show');
               sublistLi.each(function (index, el) {
                  if ($(this).is("[index=" + mainLiTheme + "]")) {
                     $(this).addClass('m-show');
                  }
               });

            } else {
               $(this).parents('.b-preview-menu').removeClass('is-submenu-active');
               sublistLi.removeClass('m-show');
            }
            mainLi.not($(this)).removeClass('is-active').addClass('m-submenu');
            $(this).addClass('is-active');

            $('.e-back').on('click', function () {
               mainLi.not('.first-case-btn').removeClass('is-active');
               mainLi.removeClass('li-Hidden');
               $('.first-case-btn').addClass('is-active');
               $(this).siblings('.b-preview-menu').removeClass('is-submenu-active');
               sublistLi.removeClass('m-show');
            });
            /* Act on the event */
         });

      }
      caseMenu();

      // СЛАЙДЕР ОТЗЫВОВ
      $('.reviews-slider').not('.slick-initialized').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: false,
         dots: true,
         asNavFor: '.reviews-slider-thumbs'
      });
      $('.reviews-slider-thumbs').not('.slick-initialized').slick({
         slidesToShow: 5,
         slidesToScroll: 1,
         arrows: false,
         asNavFor: '.reviews-slider',
         centerMode: true,
         centerPadding: 0,
         focusOnSelect: true,
         responsive: [
            {
               breakpoint: 768,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
               }
            },
            {
               breakpoint: 480,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               }
            },

         ]
      });

      // Слайдер примеры работ
      $('.example-slider').not('.slick-initialized').slick({
         infinite: false,
         slidesToShow: 4,
         slidesToScroll: 4,
         dots: true,
         arrows: false,
         responsive: [
            {
               breakpoint: 992,
               settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
               }
            },
            {
               breakpoint: 768,
               settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
               }
            },
            {
               breakpoint: 480,
               settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
               }
            },

         ]
      });

      $('.number-slider').not('.slick-initialized').on('init', function (event, slick, direction) {
         if (slick.$slides.length < 2) {
            slick.$dots.hide();
         }
      }).slick({
         rows: 2,
         infinite: false,
         slidesToScroll: 1,
         arrows: false,
         dots: true,
         slidesPerRow: 3,
         responsive: [
            {
               breakpoint: 992,
               settings: {
                  slidesPerRow: 2,
                  rows: 2,
               }
            },

         ]


      });

      $(window).resize(function () {
         if ($(this).width() >= 768) {
            $('.specialization .row.slick-initialized').slick('unslick');
         } else {
            $('.specialization .row').not('.slick-initialized').slick({
               slidesToShow: 1,
               slidesToScroll: 1,
               infinite: false,
            });
         }
         if ($(this).width() >= 992) {
            $('.why-us.slick-initialized').slick('unslick');
         } else {
            $('.why-us').not('.slick-initialized').slick({
               slidesToShow: 2,
               slidesToScroll: 2,
               infinite: false,
               responsive: [
                  {
                     breakpoint: 768,
                     settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                     }
                  },
               ]
            });
         }
      }).resize();      

      function slyInit(selector) {
         if ($(selector).find('.drag-slider-wrap').not('.drag-slider-wrap.inicialized').length > 0) {
            var $selector = $(selector);
            var $frame = $selector.find('.drag-slider-wrap').not('.drag-slider-wrap.inicialized');
            window.frr = $frame;
            var attr = $frame.attr('style');
            var sly = new Sly($frame, {
               horizontal: 1,
               itemNav: 'forceCentered',
               activateMiddle: 1,
               smart: 1,
               activateOn: 'click',
               mouseDragging: 1,
               touchDragging: 1,
               releaseSwing: 1,
               // startAt: 10,
               scrollBar: $selector.find('.scrollbar'),
               scrollBy: 1,
               pagesBar: $selector.find('.pages'),
               activatePageOn: 'click',
               speed: 600,
               moveBy: 600,
               elasticBounds: 1,
               dragHandle: 1,
               dynamicHandle: 1,
               clickBar: 1,
               // Buttons
               prev: $selector.find('.drag-prev'),
               next: $selector.find('.drag-next'),
            }).init();
            $selector.find('.drag-slider-wrap').addClass('inicialized');
         }
      }
      slyInit('#dragable-slider-section-1');
      slyInit('#dragable-slider-section-2');
      slyInit('#dragable-slider-section-3');
   }

   if (scriptsLoaded == false){
      initScripts();
   }

// ПЛАВНЫЙ ПЕРЕХОД ПО СТРАНИЦАМ
// Barba.Pjax.Dom.containerClass = 'changing-container';
// Barba.Pjax.Dom.wrapperId = 'changing-wrapper';
// var bodyClasses, bodyStyles, mainClasses;
// // Update body classes by replacing the barba.js internal function
// // See: https://github.com/luruke/barba.js/issues/49#issuecomment-237966009
// var originalFn = Barba.Pjax.Dom.parseResponse;

// Barba.Pjax.Dom.parseResponse = function (response) {
//    // Because jQuery will strip <body> when parsing a HTML DOM, change
//    // <body> to <notbody>, then we can grab the classes assigned to it
//    // See: http://stackoverflow.com/a/14423412/4081305
//    response = response.replace(/(<\/?)body( .+?)?>/gi, '$1notbody$2>', response);
//    // Get the classes on the <notbody> element
//    bodyClasses = $(response).filter('notbody').attr('class');
//    bodyStyles = $(response).filter('notbody').attr('style');

//    // Call the original barba.js function
//    $('body').attr('style', bodyStyles);
//    $('body').attr('class', bodyClasses);
//    return originalFn.apply(Barba.Pjax.Dom, arguments);
   
// };

// Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container, rawHTML) {
//    initScripts();
   
// });
// var FadeTransition = Barba.BaseTransition.extend({
//    start: function () {
//       /** This function is automatically called as soon the Transition starts
//        * this.newContainerLoading is a Promise for the loading of the new container
//        * (Barba.js also comes with an handy Promise polyfill!)*/
//       // As soon the loading is finished and the old page is faded out, let's fade the new page
//       Promise
//          .all([this.newContainerLoading, this.fadeOut()])
//          .then(this.fadeIn.bind(this));
//    },
//    fadeOut: function () {
//       /** this.oldContainer is the HTMLElement of the old Container*/
//       $('.mp--on').removeClass('mp--on');
//       return $(this.oldContainer).promise();
//    },
//    fadeIn: function () {
//       /* this.newContainer is the HTMLElement of the new Container
//        * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
//        * Please note, newContainer is available just after newContainerLoading is resolved!*/
//       var _this = this;
//       var $el = $(this.newContainer),
//          paddingTop = Math.round($('#changing-wrapper').css('padding-top').replace(/[^\d;]/g, '')),
//          topH = $('#changing-wrapper').offset().top + paddingTop;
//       // $(this.oldContainer).children('.hero').animate({opacity: 0,}, 1000, 'swing');
//       $(this.oldContainer).css({ 'position': 'relative', 'top': 0 }).animate({ left: '100%', opacity: 0, visibility: 'visible' }, 1000, 'swing');
//       $el.css({
//          'position': 'fixed',
//          left: '-100%',
//          visibility: 'visible',
//          'top': topH,
//          opacity: 0
//       });
      
//       // init();
//       $el.animate({ opacity: 1, left: '0' }, 1000, 'swing', function () {
          
//          $(this).css({ 'position': 'static' });
   
//          /** Do not forget to call .done() as soon your transition is finished!
//           * .done() will automatically remove from the DOM the old Container */
//          console.log('PageLoaded');
//          grecaptcha.reset();
//          //CaptchaCallback();
//          if ( $('#form_service').length ) {
//      try{
//        recaptchaReload('form_service');
//      }catch{'already renderer'}
     
//      //grecaptcha.render('form_service', {'sitekey' : 'my_sitekey'});
     
//    }
//    /*
//    if ( $('#form_service').length ) {
//      try{
//        recaptchaReload('form_service');
//      }catch{'already renderer'}
//    }
//    */
//    if ( $('#contact-form').length ) {
//      try{
//        recaptchaReload('contact-form');
//      }catch{'already renderer'}
//    }
//    if ( $('#callbackForm').length ) {
//      try{
//        recaptchaReload('callbackForm');
//      }catch{'already renderer'}
//    }
//    if ( $('#feedbackForm').length ) {
//      try{
//        recaptchaReload('feedbackForm');
//      }catch{'already renderer'}
//    }
//    if ( $('#casesform').length ) {
//      try{
//        recaptchaReload('casesform');
//      }catch{'already renderer'}
//    }
   
//    if ( $('#chairform').length ) {
//      try{
//        recaptchaReload('chairform');
//      }catch{'already renderer'}
//    }
   
//     document.documentElement.scrollTop = 0;
   
//          _this.done();
         
//       });
//    }
// });

	var onReCaptchaLoad = function() {
		var reCaptcha;
		var recaptchas = document.querySelectorAll('div[data-sitekey]');
			for (i = 0; i < recaptchas.length; i++) {
				reCaptcha = grecaptcha.render(recaptchas[i].id, {
				  'sitekey' : recaptchas[i].dataset.sitekey,
				});
			}
		};
		function recaptchaReload(id){
			console.log(id);
			var _recaptcha = document.getElementById(id).getElementsByClassName('g-recaptcha')[0];
			var _recaptcha_id = _recaptcha.getAttribute('id');
			var _sitekey = _recaptcha.getAttribute('data-sitekey');
			grecaptcha.render( _recaptcha, { sitekey : _sitekey } );
		}
    
}); // document ready


$(document).ready(function () {
		
   $.mobilePanel({ 'navbar': '.header-menu' });
   if (jQuery(this).width() <= 768) {
      // Добавляем в родителей подменю в каталог и в футер - стрелочки в моб версии
      $('.header-menu__item.parent > a').on('click', function (e) {
         $('li.parent').not($(this).parent()).removeClass('on');
         $(this).parent().toggleClass('on');
      });
   } setTimeout(function () {
      jQuery('.b-loader').fadeOut('slow', function () { });
   }, 1000);
});

$(document).on('af_complete', function (event, response) {
   var path = window.location.pathname;
   var form = response.form;
   var id = form.attr('id');
   var target;
    
   if (response.success) {

      // показываем успешную отправку для обратного звонка
      if (id == 'feedbackForm' || id == 'callbackForm') {
         form.after('<h2>Сообщение успешно отправлено');
         form.hide();
      }

      // задаем цель в зависимости от страницы
      switch (path) {
         case '/':
            if (id == 'feedbackForm')
               target = 'mp_svaz_form';
            else
               target = 'mp_callmeback_form';
            break;
         case '/lp':
            target = 'mp_lending_form';
            break;
         case '/corporative':
            target = 'mp_corp_form';
            break;
         case '/internet':
            target = 'mp_internetmag_form';
            break;
         case '/complex-solutions':
            target = 'mp_slojnie_form';
            break;
         case '/bitriks24':
            target = 'mp_bitrix_form';
            break;
         case '/integracziya-vashego-sajta-na-bitrikse-s-1s':
            target = 'mp_integracia_form';
            break;
         case '/info-support':
            target = 'mp_info_form';
            break;
         case '/tech-support':
            target = 'mp_tech_form';
            break;
         case '/dif-exercise':
            target = 'mp_oshibki_form';
            break;
         case '/seo':
            target = 'mp_seo_form';
            break;
         case '/smm':
            target = 'mp_smm_form';
            break;
         case '/context':
            target = 'mp_context_form';
            break;
         case '/analitika':
            target = 'mp_analitika_form';
            break;
         case '/vacancies/':
            target = 'mp_talanti_form';
            break;
         case '/contacts':
            target = 'mp_napisat_form';
            break;
         case 'lid1':
             target = 'mp_lid1_form';
             console.log(target);
             break;
         default:
            target = 'mp_default';
            break;
      }
      // отдельные цели для сквозных форм
      if (id == 'feedbackForm') { target = 'mp_svaz_form';}
      else if (id == 'callbackForm') { target = 'mp_callmeback_form'; }

      // стреляем 
      ym(33491733, 'reachGoal', target);
   }
});

 $('.fancybox').fancybox();
      $('.callback-link, .feedback, .city-link').fancybox({
         baseClass: 'callback-fancy'
      });

$('.mainSlider').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 1
})

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

if ($('.second-slider-wrap').find('.drag-slider-wrap').not('.drag-slider-wrap.inicialized').length > 0) {
    var $selector = $('.second-slider-wrap');
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


$(window).bind('resize', function() {
    if ($(window).width() >= 768) {
        $('.js_tiles_slised').filter('.slick-initialized').slick('unslick');
    } else {
        $('.js_tiles_slised').each(function() {

            $('.js_tiles_slised').not('.slick-initialized').slick({
                speed: 600,
                slidesToShow: 1,
                slidesToScroll: 1,
                swipe: true,
                dots: false,
                arrows: true,
                infinite: true,
                adaptiveHeight: true,
            });
        });

        $('.js_scroll').mCustomScrollbar({
            axis: "x",
            advanced: { autoExpandHorizontalScroll: true },
            theme: "rounded",
            setWidth: "auto",
            scrollbarPosition: 'outside'
        });
    }
}).trigger('resize');

$(document).on('click', '.mp__button-main', function() {
    $('.header-menu, .mp__overlay').toggleClass('mp--on');
});
$(document).on('click', '.mp__overlay', function() {
    $('.header-menu, .mp__overlay').toggleClass('mp--on');
});
$(document).on('click', '.header-menu.mp--on .header-menu__item.parent .header-menu__link', function() {
    $(this).next('.header-menu-sublist').toggleClass('open');
});
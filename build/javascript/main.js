$( document ).ready(function() {
  // show/hide menu when on mobile
  $('[data-js-mobile-menu-trigger]').on('click', function(event) {
    event.preventDefault();
    $('.mobile-menu-container').slideToggle();
    $(this).toggleClass('mobile-menu-trigger--opened');
    $('.header').toggleClass('overflow');
    $('body').toggleClass('no-scroll');
  });

  // make nav-bar sticky
  $(window).scroll(function() {
    if ($(window).width() > 699 && $(window).scrollTop() > 109) {
      $('.header-bottom').addClass('navbar-fixed');
    }
    if ($(window).width() > 699 && $(window).scrollTop() < 110) {
      $('.header-bottom').removeClass('navbar-fixed');
    }
  });

  // Hide Header on on scroll down when on mobile
  if ($(window).width() < 701) {
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('.header').outerHeight();

    $(window).scroll(function(event) {
      didScroll = true;
    });

    setInterval(function() {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
      return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight && !$('[data-js-mobile-menu-trigger]').hasClass('mobile-menu-trigger--opened')){
        // Scroll Down
        $('.header').addClass('nav-up');
      } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
          $('.header').removeClass('nav-up');
        }
      }
      lastScrollTop = st;
    }
  }

  // Hero carousel
  $('.hero-carousel').slick({
    autoplay: true,
    dots: true,
    mobileFirst: true,
    lazyLoad: 'progressive',
    arrows: false,
    responsive: [{
      breakpoint: 700,
      settings: {
        arrows: true
      }
    }]
  });

  // FAQ Accordions controll
  $('.accordion').children('.accordion__content').hide();
  $('.accordion').first().children('.accordion__content').css('display', 'flex');
  // $('.accordion').first().addClass('accordion--active');

  $('[data-js-accordion-trigger]').on('click', function() {
    if ($(this).parent('.accordion').hasClass('accordion--active')) {
      $(this).siblings('.accordion__content').slideUp();
      $(this).parent('.accordion').removeClass('accordion--active');
    } else {
      $('[data-js-accordion-trigger]').siblings('.accordion__content').slideUp();
      $(this).siblings('.accordion__content').slideDown();
      $('[data-js-accordion-trigger]').parent('.accordion').removeClass('accordion--active');
      $(this).parent('.accordion').addClass('accordion--active');
    }
  });

  // Mobile footer accordions
  $('[data-js-footer-accordion-trigger]').on('click', function() {
    $(this).toggleClass('footer-accordion__title-container--opened');
    $(this).siblings('.footer-accordion__list-container').slideToggle();
  });
});

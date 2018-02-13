/* global $this: true */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "animationsSlider" }] */

if ($.cookie('themeCSSpath')) {
  $('link#theme-stylesheet').attr('href', $.cookie('themeCSSpath'))
}
if ($.cookie('themeLayout')) {
  $('body').addClass($.cookie('themeLayout'))
}

$('a.open-modal').click(function () {
  $(this).modal({
    fadeDuration: 250,
    modalClass: 'jq-modal'  
  })
  return false
})

$(function() {
  sliderHomepage()
  sliders()
  fullScreenContainer()
  productDetailGallery(4000)
  menuSliding()
  productDetailSizes()
  contactForm()
})

document.addEventListener('DOMContentLoaded', function() {
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(function($el) {
      $el.addEventListener('click', function() {
        var target = $el.dataset.target
        var $target = document.getElementById(target)
        $el.classList.toggle('is-active')
        $target.classList.toggle('is-active')
      })
    })
  }
})

// Ajax contact
function contactForm() {
  var form = $('.contact-form')
  form.submit(function() {
    $this = $(this)
    $.post(
      $(this).attr('action'),
      $this.serialize(),
      function() {
        $this[0].reset() // clear form

        $('#contact-message')
          .html(
            '<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>Thank you for getting in touch. We will get back to you soon!</div>'
          )
          .fadeIn()
      },
      'json'
    )
    return false
  })
}

/* slider homepage */
function sliderHomepage() {
  if ($('#slider').length) {
    // var owl = $('#slider')

    $('#slider').owlCarousel({
      autoPlay: 3000,
      items: 4,
      itemsDesktopSmall: [900, 3],
      itemsTablet: [600, 3],
      itemsMobile: [500, 2]
    })
  }
}

/* sliders */
function sliders() {
  if ($('.owl-carousel').length) {
    $('.customers').owlCarousel({
      margin: 25,
      autoWidth: true,
      responsive: {
        0: {
          items: 1
        },
        570: {
          items: 3
        },
        768: {
          items: 4
        }
      }
    })

    $('.testimonials').owlCarousel({
      items: 1,
      ceneter: true,
      nav: true,
      autoplay: true,
      autoplayHoverPause: true
    })
  }
}

/* menu sliding */
function menuSliding() {
  $('.dropdown').on('show.bs.dropdown', function() {
    if ($(window).width() > 750) {
      $(this)
        .find('.dropdown-menu')
        .first()
        .stop(true, true)
        .slideDown()
    } else {
      $(this)
        .find('.dropdown-menu')
        .first()
        .stop(true, true)
        .show()
    }
  })

  $('.dropdown').on('hide.bs.dropdown', function() {
    if ($(window).width() > 750) {
      $(this)
        .find('.dropdown-menu')
        .first()
        .stop(true, true)
        .slideUp()
    } else {
      $(this)
        .find('.dropdown-menu')
        .first()
        .stop(true, true)
        .hide()
    }
  })
}

function animationsSlider() {
  var delayTimeSlider = 400

  $('.owl-item:not(.active) [data-animate-always]').each(function() {
    $(this).removeClass('animated')
    $(this).removeClass($(this).data('animate-always'))
    $(this)
      .stop(true, true, true)
      .css({ opacity: 0 })
  })

  $('.owl-item.active [data-animate-always]').each(function() {
    delayTimeSlider += 500

    $(this)
      .delay(delayTimeSlider)
      .queue(function() {
        $(this).addClass('animated')
        $(this).addClass($(this).data('animate-always'))

        console.log($(this).data('animate-always'))
      })
  })
}

/* picture zoom */
function pictureZoom() {
  $('.product .image, .post .image, .photostream div').each(function() {
    var imgHeight = $(this)
      .find('img')
      .height()
    $(this).height(imgHeight)
  })
}

/* full screen intro */
function fullScreenContainer() {
  var screenWidth = $(window).width() + 'px'
  var screenHeight = '500px'

  if ($(window).height() > 500) {
    screenHeight = $(window).height() + 'px'
  }

  $('#intro, #intro .item').css({
    width: screenWidth,
    height: screenHeight
  })
}

/* product detail gallery */
function productDetailGallery(confDetailSwitch) {
  $('.thumb:first').addClass('active')
  var timer = setInterval(autoSwitch, confDetailSwitch)

  $('.thumb').click(function(e) {
    switchImage($(this))
    clearInterval(timer)
    timer = setInterval(autoSwitch, confDetailSwitch)
    e.preventDefault()
  })

  $('#mainImage').hover(
    function() {
      clearInterval(timer)
    },
    function() {
      timer = setInterval(autoSwitch, confDetailSwitch)
    }
  )

  function autoSwitch() {
    var nextThumb = $('.thumb.active')
      .closest('div')
      .next('div')
      .find('.thumb')
    if (nextThumb.length === 0) {
      nextThumb = $('.thumb:first')
    }
    switchImage(nextThumb)
  }

  function switchImage(thumb) {
    $('.thumb').removeClass('active')
    var bigUrl = thumb.attr('href')
    thumb.addClass('active')
    $('#mainImage img').attr('src', bigUrl)
  }
}

/* product detail sizes */
function productDetailSizes() {
  $('.sizes a').click(function(e) {
    e.preventDefault()
    $('.sizes a').removeClass('active')
    $('.size-input').prop('checked', false)
    $(this).addClass('active')
    $(this)
      .next('input')
      .prop('checked', true)
  })
}

$.fn.alignElementsSameHeight = function() {
  $('.same-height-row').each(function() {
    var maxHeight = 0
    var children = $(this).find('.same-height')
    children.height('auto')

    if ($(window).width() > 768) {
      children.each(function() {
        if ($(this).innerHeight() > maxHeight) {
          maxHeight = $(this).innerHeight()
        }
      })
      children.innerHeight(maxHeight)
    }

    maxHeight = 0
    children = $(this).find('.same-height-always')
    children.height('auto')
    children.each(function() {
      if ($(this).height() > maxHeight) {
        maxHeight = $(this).innerHeight()
      }
    })
    children.innerHeight(maxHeight)
  })
}

var windowWidth
$(function() {
  windowWidth = $(window).width()

  $(this).alignElementsSameHeight()
  pictureZoom()
})

$(window).resize(function() {
  var newWindowWidth = $(window).width()

  if (windowWidth !== newWindowWidth) {
    setTimeout(function() {
      $(this).alignElementsSameHeight()
      fullScreenContainer()
      pictureZoom()
    }, 205)
    windowWidth = newWindowWidth
  }
})

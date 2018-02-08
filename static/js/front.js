/* global $this: true */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "animationsSlider" }] */

$('a.open-modal').click(function () {
    $(this).modal({
        fadeDuration: 250,
        modalClass: 'jq-modal'
    })
    return false
})

$(function () {
    sliders()
    toggleContent()
})

document.addEventListener('DOMContentLoaded', function () {
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
    if ($navbarBurgers.length > 0) {
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {
                var target = $el.dataset.target
                var $target = document.getElementById(target)
                $el.classList.toggle('is-active')
                $target.classList.toggle('is-active')
            })
        })
    }
})


function toggleContent() {
    $(".panel-heading").click(function () {
        $(this).parent().toggleClass('active').find('.panel-content').slideToggle('fast')
        $(".panel-heading").not(this).parent().removeClass('active').find('.panel-content').slideUp('fast')
    })
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
            dots: true,
            autoplay: true,
            responsiveClass:true,
            autoplayHoverPause: true
        })
    }
}

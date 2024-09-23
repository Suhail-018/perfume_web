
(function ($) {
  ("use strict");

  // canvas menu activation
  $(".canvas_open").on("click", function () {
    $(".offcanvas_menu_wrapper,.off_canvars_overlay").addClass("active");
  });

  $(".canvas_close,.off_canvars_overlay").on("click", function () {
    $(".offcanvas_menu_wrapper,.off_canvars_overlay").removeClass("active");
  });

  //   off canvas menu
  var $offcanvasNav = $(".offcanvas_main_menu"),
    $offcanvasNavSubMenu = $offcanvasNav.find(".sub-menu");
  $offcanvasNavSubMenu
    .parent()
    .prepend(
      '<span class="menu-expand"><i class="fa fa-angle-down"></i></span>'
    );

  $offcanvasNavSubMenu.slideUp();

  $offcanvasNav.on("click", "li a, li .menu-expand", function (e) {
    var $this = $(this);
    if (
      $this
        .parent()
        .attr("class")
        .match(/\b(menu-item-has-children| has-children | has-sub-menu)\b/) &&
      ($this.attr("href") === "#" || $this.hasClass("menu-expand"))
    ) {
      e.preventDefault();
      if ($this.siblings("ul:visible").length) {
        $this.siblings("ul").slideUp("slow");
      } else {
        $this.closest("li").siblings("li").find("ul:visible").slideUp("slow");
        $this.siblings("ul").slideDown("slow");
      }
    }

    if (
      $this.is("a") ||
      $this.is("span") ||
      $this.attr("class").match(/\b(menu-expand)\b/)
    ) {
      $this.parent().toggleClass("menu-open");
    } else if (
      $this.is("li") &&
      $this.attr("class").match(/\b('menu-item-has-children')\b/)
    ) {
      $this.toggleClass("menu-open");
    }
  });

  //   search box slidetoggle activation
  $(".search_box > a").on("click", function () {
    $(this).toggleClass("active");
    $(".search_widget").slideToggle("medium");
  });

  // slide toggle activation of mini cart
  $(".mini_cart_wrapper > a").on("click", function () {
    if ($(window).width() < 991) {
      $(".mini_cart").slideToggle("medium");
    }
  });

  // sticky header

  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $(".sticky-header").removeClass("sticky");
    } else {
      $(".sticky-header").addClass("sticky");
    }
  });

  function dataBackgroundImage() {
    $("[data-bgimg]").each(function () {
      var bgImgUrl = $(this).data("bgimg");
      $(this).css({
        "background-image": "url(" + bgImgUrl + ")",
      });
    });
  }

  $(window).on("load", function () {
    dataBackgroundImage();
  });

  // slider activation
  $(".slider_area").owlCarousel({
    animateOut: "fadeOut",
    autoplay: true,
    loop: true,
    nav: true,
    autoplay: false,
    autoplayTimeout: 5000,
    items: 1,
    dots: false,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
  });

  // product column of 4 activation
  $(".product_column4")
    .on("changed.owl.carousel initialized.owl.carousel", function (event) {
      $(event.target)
        .find(".owl-item")
        .removeClass("last")
        .eq(event.item.index + event.page.size - 1)
        .addClass("last");
    })
    .owlCarousel({
      autoplay: true,
      loop: true,
      nav: true,
      autoplay: false,
      autoplayTimeout: 5000,
      items: 4,
      dots: false,
      navText: [
        '<i class="fa fa-arrow-left"></i>',
        '<i class="fa fa-arrow-right"></i>',
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 4,
        },
      },
    });

  // tooltip activation

  $(".action_links ul li a,.add_to_cart a,.footer_social_link ul li a").tooltip(
    {
      animated: "fade",
      placement: "top",
      container: "body",
    }
  );

  // activation of one column of deal product
  $(".product_column1")
    .on("changed.owl.carousel initialized.owl.carousel", function (event) {
      $(event.target)
        .find(".owl-item")
        .removeClass("last")
        .eq(event.item.index + event.page.size - 1)
        .addClass("last");
    })
    .owlCarousel({
      autoplay: true,
      loop: true,
      nav: true,
      autoplay: false,
      autoplayTimeout: 5000,
      items: 4,
      dots: false,
      navText: [
        '<i class="fa fa-arrow-left"></i>',
        '<i class="fa fa-arrow-right"></i>',
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        992: {
          items: 1,
        },
      },
    });

  // countdown activation
  $("[data-countdown").each(function () {
    var $this = $(this),
      finalDate = $(this).data("countdown");
    $this.countdown(finalDate, function (event) {
      $this.html(
        event.strftime(
          '<div class="countdown_area"><div class="single_countdown"><div class="countdown_number">%D</div><div class="countdown_title">days</div></div><div class="single_countdown"><div class="countdown_number">%H</div><div class="countdown_title">Hours</div></div><div class="single_countdown"><div class="countdown_number">%M</div><div class="countdown_title">mins</div></div><div class="single_countdown"><div class="countdown_number">%S</div><div class="countdown_title">secs</div></div></div>'
        )
      );
    });
  });

  // activation of one column of Best seller product
  $(".sidebar_product_column1")
    .on("changed.owl.carousel initialized.owl.carousel", function (event) {
      $(event.target)
        .find(".owl-item")
        .removeClass("last")
        .eq(event.item.index + event.page.size - 1)
        .addClass("last");
    })
    .owlCarousel({
      autoplay: true,
      loop: true,
      nav: true,
      autoplay: false,
      autoplayTimeout: 5000,
      items: 4,
      dots: false,
      navText: [
        '<i class="fa fa-arrow-left"></i>',
        '<i class="fa fa-arrow-right"></i>',
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
          margin: 30,
        },
        992: {
          items: 1,
        },
      },
    });

  // Testimonial activation
  $(".testimonial_sidebar_carousel").owlCarousel({
    autoplay: true,
    loop: true,
    nav: true,
    autoplay: false,
    autoplayTimeout: 5000,
    items: 1,
    dots: false,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
  });

  // activation of one column of Best seller product
  $(".product_column3")
    .on("changed.owl.carousel initialized.owl.carousel", function (event) {
      $(event.target)
        .find(".owl-item")
        .removeClass("last")
        .eq(event.item.index + event.page.size - 1)
        .addClass("last");
    })
    .owlCarousel({
      autoplay: true,
      loop: true,
      nav: true,
      autoplay: false,
      autoplayTimeout: 5000,
      items: 4,
      dots: false,
      navText: [
        '<i class="fa fa-arrow-left"></i>',
        '<i class="fa fa-arrow-right"></i>',
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        567: {
          items: 2,
        },
        768: {
          items: 3,
        },
        992: {
          items: 3,
        },
      },
    });

  // activation of blog section
  $(".blog_column3").owlCarousel({
    autoplay: true,
    loop: true,
    nav: true,
    autoplay: false,
    autoplayTimeout: 5000,
    items: 4,
    dots: false,
    navText: [
      '<i class="fa fa-arrow-left"></i>',
      '<i class="fa fa-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });

  // Small product column 1 activation
  $(".small_product_column1")
    .on("changed.owl.carousel initialized.owl.carousel", function (event) {
      $(event.target)
        .find(".owl-item")
        .removeClass("last")
        .eq(event.item.index + event.page.size - 1)
        .addClass("last");
    })
    .owlCarousel({
      autoplay: true,
      loop: true,
      nav: false,
      autoplay: false,
      autoplayTimeout: 5000,
      items: 4,
      dots: false,
      navText: [
        '<i class="fa fa-arrow-left"></i>',
        '<i class="fa fa-arrow-right"></i>',
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        568: {
          items: 2,
          margin: 15,
        },
        768: {
          items: 1,
        },
      },
    });

  // activation of small nav active
  $(".product_navactive").owlCarousel({
    autoplay: false,
    loop: true,
    nav: true,
    items: 4,
    dots: false,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      250: {
        items: 2,
      },
      480: {
        items: 3,
      },
      768: {
        items: 4,
      },
    },
  });

  $(".modal").on("shown.bs.modal", function (e) {
    $(".product_navactive").resize();
  });
  $(".product_navactive a").on("click", function (e) {
    e.preventDefault();

    var $href = $(this).attr("href");

    $(".product_navactive a").removeClass("active");
    $(this).addClass("active");

    $(".product-details-large .tab-pane").removeClass("active show");
    $(".product-details-large " + $href).addClass("active show");
  });

  $(".select_option").niceSelect();
  // $(".add_to_cart > a").on("click", function(e) {
  //   e.preventDefault();  // Prevent the default link action
  
  //   // Set a static URL for add-to-cart action
  //   var href = 'http://127.0.0.1:8000/addtocart';  // Adjust this to your actual add-to-cart URL
  
  //   // Get the image source from the product thumbnail
  //   var imgsrc = $(this).closest('.single_product').find('.product_thumb img').first().attr('src');
  
  //   // Get the product name
  //   var name = $(this).closest('.single_product').find('.product_name a').text();
  
  //   // Get the current price
  //   var price = $(this).closest('.single_product').find('.price_box .current_price').text();
  
  //   // Check if the user is authenticated (assuming you have a global flag or check in place)
  //   if (user_is_authenticated) {  // Assuming `user_is_authenticated` is a global flag
  //       // Perform the POST request to the add-to-cart URL
  //       $.post(href, {
  //           name: name,
  //           price: price,
  //           imgsrc: imgsrc
  //       }, function(response, status) {
  //           alert('Product added to cart: ' + response.message + '\nStatus: ' + status);
  //       }).fail(function(xhr, status, error) {
  //           alert('Error: ' + error);
  //       });
  //   }
  //    else {
  //       alert('Please log in to add items to the cart.');
  //   }
  // });


  // new one 
  // Get the CSRF token from the cookie
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Check if this cookie string begins with the name we want
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');  // Get the CSRF token from the cookie
// const csrftoken = Cookies.get('csrftoken');
$(".add_to_cart > a").on("click",  function(e) {
  e.preventDefault();  // Prevent the default link action

  var href = "http://127.0.0.1:8000/addtocart";  // Adjust this to your actual add-to-cart URL
  // var href = "{% url 'shop:add_to_cart' %}";
  var imgsrc = $(this).closest('.single_product').find('.product_thumb img').first().attr('src');
  var name = $(this).closest('.single_product').find('.product_name a').text();
  var price = $(this).closest('.single_product').find('.price_box .current_price').text();


  const request = new Request(
    "http://127.0.0.1:8000/addtocart",
    {
        method: 'POST',
          body: JSON.stringify({
              name: name,
              price: price,
              imgsrc: imgsrc
                }),

        headers: {'X-CSRFToken': csrftoken},
        mode: 'same-origin' // Do not send CSRF token to another domain.
    }
);
fetch(request).then(res=>res.json())
.then(data=>{
  // document.getElementsByClassName("item_count").innerHTML = data
  let elements = document.getElementsByClassName("item_count");
    
  // Loop through each element with the class "item_count"
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = data;
  }
  console.log(data);
  alert(data)
})
.catch(error=>{
  console.log(error)
})

// Assuming the server responds with JSON
// .then(function(data) {
//     console.log('Success:', data);
//    })
//     .catch(function(error) {
//       console.error('There was a problem with your fetch operation:', error);
//       });



  // if (user_is_authenticated) {  // Assuming `user_is_authenticated` is a global flag
      // Perform the POST request to the add-to-cart URL
      // $.ajax({
      //     url: href,
      //     type: 'POST',
      //     data: {
      //         name: name,
      //         price: price,
      //         imgsrc: imgsrc
      //     },
      //     headers: {
      //         'X-CSRFToken': csrftoken  // Add CSRF token to the request headers
      //     },
      //     success: function(response, status) {
      //         alert('Product added to cart: ' + response.message);
      //     },
      //     error: function(xhr, status, error) {
      //         if (xhr.status === 401) {
      //             alert('Please log in to add items to the cart.');
      //             window.location.href = '/login/';  // Redirect to login page
      //         } else {
      //             alert('Error: ' + error);
      //         }
      //     }
      // }); //here ends ajax
  // } else {
  //     alert('Please log in to add items to the cart.');
  // }
  // const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

//     $.post(href, {
//                 name: name,
//                 price: price,
//                 imgsrc: imgsrc,
//                 csrfmiddlewaretoken: '{% csrf_token %}'
//                 headers: {'X-CSRFToken': csrftoken}
//             }, function(response, status) {
//                 alert('Product added to cart: ' + response.message + '\nStatus: ' + status);
//             }).fail(function(xhr, status, error) {
//                 alert('Error: ' + error);
//             });
});

  
  
})(jQuery);
// document.addEventListener("DOMContentLoaded", function() {
//   // Get all img elements in the document
//   const images = document.querySelectorAll('img');

//   images.forEach(function(img) {
//       let src = img.getAttribute('src');
      
//       // Check if the src does not already contain '{% static %}'
//       if (src && !src.includes("{% static '")) {
//           // Replace the src with the static tag
//           img.setAttribute('src', `{% static '${src}' %}`);
//       }
//   });
// });


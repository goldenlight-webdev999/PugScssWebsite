/* Description: Custom JS file */

window.addEventListener('load', () => {
  document.querySelector('body').classList.remove("page-loading");
  document.querySelector('body').classList.add("page-loaded");
  document.querySelector('body').setAttribute("data-bs-target", "#primarySiteNav");
  document.querySelector('body').setAttribute("data-bs-spy", "scroll");
});

/* Navigation*/
// Collapse the navbar by adding the top-nav-collapse class
window.onscroll = function () {
  scrollFunction();
  scrollFunctionBTT(); // back to top button
};

window.onload = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.documentElement.scrollTop > 30) {
    document.getElementById("primarySiteNav").classList.add("top-nav-collapse");
  } else if (document.documentElement.scrollTop < 30) {
    document.getElementById("primarySiteNav").classList.remove("top-nav-collapse");
  }
}

// Navbar on mobile
let elements = document.querySelectorAll("#primarySiteNav .nav-link:not(.dropdown-toggle)");

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", () => {
    document.querySelector(".offcanvas-collapse").classList.toggle("open");
  });
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
  document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

// Hover on desktop
function toggleDropdown(e) {
  const _d = e.target.closest(".dropdown");
  let _m = document.querySelector(".dropdown-menu", _d);

  setTimeout(
    function () {
      const shouldOpen = _d.matches(":hover");
      _m.classList.toggle("show", shouldOpen);
      _d.classList.toggle("show", shouldOpen);

      _d.setAttribute("aria-expanded", shouldOpen);
    },
    e.type === "mouseleave" ? 300 : 0
  );
}

// On hover
const dropdownCheck = document.querySelector('.dropdown');

if (dropdownCheck !== null) {
  document.querySelector(".dropdown").addEventListener("mouseleave", toggleDropdown);
  document.querySelector(".dropdown").addEventListener("mouseover", toggleDropdown);

  // On click
  document.querySelector(".dropdown").addEventListener("click", (e) => {
    const _d = e.target.closest(".dropdown");
    let _m = document.querySelector(".dropdown-menu", _d);
    if (_d.classList.contains("show")) {
      _m.classList.remove("show");
      _d.classList.remove("show");
    } else {
      _m.classList.add("show");
      _d.classList.add("show");
    }
  });
}

/* Back To Top Button */
// Get the button
let myButton = document.getElementById("moveToTopBtn");

myButton.addEventListener("click", (e) => {
  document.body.scrollTop = 0; // for Safari
  document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
});

// When the user scrolls down 20px from the top of the document, show the button
function scrollFunctionBTT() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

// Team Carousel
$(document).ready(function () {
  $('.teams-carousel').slick({
    slidesToShow: 8,
    arrows: false,
    infinite: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerMode: true,
          centerPadding: '70px',
          slidesToShow: 5
        }
      },
      {
        breakpoint: 992,
        settings: {
          centerMode: true,
          centerPadding: '60px',
          slidesToShow: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: '50px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 486,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      }
    ]
  });
});

// Players Carousel
$(document).ready(function () {
  $('.players-carousel').slick({
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: false,
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  });
});

// Gallery Carousel
$(document).ready(function () {
  $('.gallery-carousel').slick({
    slidesToShow: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true
        }
      }
    ]
  });
});

// Gallery Fancy box
$(document).ready(function () {
  $('[data-fancybox]').fancybox({
    //infobar : false,
    caption: function (instance, item) {
      var caption = $(this).data('caption') || '';
      // var type = $(this).data('typex') || '';
      var date = $(this).data('date') || '';
      return ('Game: ' + caption + '<br />')
        //  + ('Type: ' + type + '<br />')
        + ('Date: ' + date + '<br />');
    }
  });
});

// Add Read More
function showReadMoreButton(element) {
  if (element) {
    if (element.offsetHeight < element.scrollHeight) {
      // Show Read more button		
      element.nextSibling.style.display = "inline";
    } else if (element.offsetHeight == element.scrollHeight) {
      // Hide Read more button
      element.nextSibling.style.display = "none";
    } else {
      // reduce content
      element.style.display = "-webkit-box";
      // show More
      element.nextSibling.style.display = "inline";
      // Hide less
      element.nextSibling.nextSibling.style.display = "none";
    }
  }
}

showReadMoreButton(document.querySelector(".tab-pane.active.show .readMore"));

// When resizing window
window.addEventListener('resize', function (event) {
  showReadMoreButton(document.querySelector(".tab-pane.active.show .readMore"));
});

// When click tabs
var tabBtns = document.querySelectorAll(".formats-pannel .nav-link");
for (let i = 0; i < tabBtns.length; i++) {
  tabBtns[i].addEventListener("click", (e) => {
    var panelId = tabBtns[i].getAttribute("data-bs-target");
    setTimeout(function () {
      showReadMoreButton(document.querySelector(`${panelId} .readMore`));
    }, 200);
  });
}

// When click more button
var moreBtns = document.querySelectorAll(".tab-pane .more");
for (let i = 0; i < moreBtns.length; i++) {
  moreBtns[i].addEventListener("click", (e) => {
    showReadMoreButton(document.querySelector(".tab-pane.active.show .readMore"));
    moreBtns[i].previousSibling.style.display = "inline"; // content
    moreBtns[i].style.display = "none"; // more
    moreBtns[i].nextSibling.style.display = "inline"; // less
  });
}

// When click less button
var lessBtns = document.querySelectorAll(".tab-pane .less");
for (let i = 0; i < lessBtns.length; i++) {
  lessBtns[i].addEventListener("click", (e) => {
    showReadMoreButton(document.querySelector(".tab-pane.active.show .readMore"));
    lessBtns[i].previousSibling.previousSibling.style.display = "-webkit-box"; // content
    lessBtns[i].previousSibling.style.display = "inline"; // more
    lessBtns[i].style.display = "none"; // less    
  });
}
// When switch new tab
$('[data-bs-toggle="pill"]').on('shown.bs.tab', function (e) {
  showReadMoreButton(document.querySelector(".tab-pane.active.show .readMore"));
});

// Squad (Players)
// click arrow
var arrows = document.querySelectorAll(".card-wraper-inner .arrow");
for (let i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", (e) => {
    var wrapperElement = arrows[i].parentNode.parentNode;
    wrapperElement.classList.toggle("expand");
  });
}

// IG Widget
(function (d, s, id) {
  var js; if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id; js.src = "https://embedsocial.com/cdn/ht.js";
  d.getElementsByTagName("head")[0].appendChild(js);
}(document, "script", "EmbedSocialHashtagScript"));
console.log("Hello world");
console.log("BY MARIVÍ & CLARA");

/*ANIMACIONES AOS*/
AOS.init();

/* TRANSLATE */
/*TYPED.JS*/
var typed = new Typed('#element', {
    strings: ['¡Un estudio creativo para todos tus colores!', 'Ya sea que estés buscando construir una marca o actualizar una existente,','¡Chromatic aporta pasión, creatividad y una sensación de alegría','a cada proyecto que emprendemos!'],
    typeSpeed: 50,
    loop: true,
});

/* TOAST */
document.addEventListener('DOMContentLoaded', () => {
    const toastElList = document.querySelectorAll('.toast');
    const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));

    toastList.forEach(toast => toast.show());
});

/* AL DARLE CLICK A UN BOTON DEL MENU, SE QUITA LA CLASE */
$(document).ready(function() {
    $('.navbar-collapse a:not(.dropdown-toggle)').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });
});

/*AL LLEGAR AL FOOTER, NAV DESAPARECE*/
$(document).ready(function () {
    const $nav = $(".navbar");
    const $footer = $("footer");

    if ($nav.length && $footer.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    /* console.log("hola!"); */
                    $nav.addClass("nav-none");
                } else {
                    /* console.log("adios!"); */
                    $nav.removeClass("nav-none");
                }
            });
        }, { threshold: 0.1 });

        observer.observe($footer[0]); 

    } else {
        console.error("No se encontraron los elementos navbar o footer.");
    }
});

/* lo cambiamos a jquery */
/* document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".navbar");
    const footer = document.querySelector("footer");

    if (nav && footer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    /* console.log("hola!"); */
                    /* nav.classList.add("nav-none");
                } else {
                    /* console.log("adios!"); */
                    /* nav.classList.remove("nav-none");
                }
            });
        }, { threshold: 0.1 });

        observer.observe(footer);

    } else {
        console.error("No se encontraron los elementos navbar o footer.");
    }
}); */

//AL HACER SCROLL FUERA DE HEADER, APARECE LOGO SUPERIOR DERECHA//
// HACER QUE EN VEZ DE SELECCIONAR EL HEADER Y EL FOOTER, QUE SOLO SE MUESTRE EN EL MAIN + AÑADIR ETIQUETA MAIN
document.addEventListener("DOMContentLoaded", function () {

    $(window).scroll(function(){
        console.log("Scroll!");
    const logo = document.getElementById("logo");
    const header = document.querySelector("header");


    if (logo && header) {
        const observer = new IntersectionObserver((entries) => {
            console.log(entries);
            
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("hola!");
                    
                    // Oculta el logo cuando el footer es visible
                    // logo.style.display = "none";
                    logo.classList.add("logo-none");

                } else {
                    console.log("adios!");
                    
                    logo.classList.remove("logo-none");
                }
            });
        }, { threshold: 0.1 });

        observer.observe(header);
        
    } else {
        console.error("No se encontraron los elementos logo o header.");
    }
    });
});

// GALERIA
document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.querySelector(".gallery-grid");
    const links = galleryGrid.querySelectorAll("a");
    const imgs = galleryGrid.querySelectorAll("img");
    const lightboxModal = document.getElementById("lightbox-modal");
    const bsModal = new bootstrap.Modal(lightboxModal);
    const modalBody = lightboxModal.querySelector(".lightbox-content");

    function createCaption(caption) {
        return `<div class="carousel-caption d-none d-md-block">
        <h4 class="m-0">${caption}</h4>
      </div>`;
    }

    function createIndicators(img) {
        let markup = "",
            i,
            len;

        const countSlides = links.length;
        const parentCol = img.closest(".col");
        const curIndex = [...parentCol.parentElement.children].indexOf(parentCol);

        for (i = 0, len = countSlides; i < len; i++) {
            markup += `
        <button type="button" data-bs-target="#lightboxCarousel"
          data-bs-slide-to="${i}"
          ${i === curIndex ? 'class="active" aria-current="true"' : ""}
          aria-label="Slide ${i + 1}">
        </button>`;
        }

        return markup;
    }

    function createSlides(img) {
        let markup = "";
        const currentImgSrc = img.closest(".gallery-item").getAttribute("href");

        for (const img of imgs) {
            const imgSrc = img.closest(".gallery-item").getAttribute("href");
            const imgAlt = img.getAttribute("alt");

            markup += `
        <div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}">
          <img class="d-block img-fluid w-100" src=${imgSrc} alt="${imgAlt}">
          ${imgAlt ? createCaption(imgAlt) : ""}
        </div>`;
        }

        return markup;
    }

    function createCarousel(img) {
        const markup = `
      <!-- Lightbox Carousel -->
      <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="true">
        <!-- Indicators/dots -->
        <div class="carousel-indicators">
          ${createIndicators(img)}
        </div>
        <!-- Wrapper for Slides -->
        <div class="carousel-inner justify-content-center mx-auto">
          ${createSlides(img)}
        </div>
        <!-- Controls/icons -->
        <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      `;

        modalBody.innerHTML = markup;
    }

    for (const link of links) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const currentImg = link.querySelector("img");
            const lightboxCarousel = document.getElementById("lightboxCarousel");

            if (lightboxCarousel) {
                const parentCol = link.closest(".col");
                const index = [...parentCol.parentElement.children].indexOf(parentCol);

                const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
                bsCarousel.to(index);
            } else {
                createCarousel(currentImg);
            }

            bsModal.show();
        });
    }

    // --- Support Fullscreen
    const fsEnlarge = document.querySelector(".btn-fullscreen-enlarge");
    const fsExit = document.querySelector(".btn-fullscreen-exit");

    function enterFS() {
        lightboxModal
            .requestFullscreen()
            .then({})
            .catch((err) => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        fsEnlarge.classList.toggle("d-none");
        fsExit.classList.toggle("d-none");
    }

    function exitFS() {
        document.exitFullscreen();
        fsExit.classList.toggle("d-none");
        fsEnlarge.classList.toggle("d-none");
    }

    fsEnlarge.addEventListener("click", (e) => {
        e.preventDefault();
        enterFS();
    });

    fsExit.addEventListener("click", (e) => {
        e.preventDefault();
        exitFS();
    });
});
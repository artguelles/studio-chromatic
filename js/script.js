console.log("Hello world");
console.log("BY MARIVÍ & CLARA");



/*ANIMACIONES AOS*/
AOS.init();

/*TYPED.JS*/
var typed = new Typed('#element', {
    strings: ['A creative studio for your every color!', 'Whether you’re looking to build a brand or refresh an existing one,','Chromatic brings passion, creativity, and a sense of joy','to every project we undertake!'],
    typeSpeed: 50,
    loop: true,
});

/* TOASTS */
/* const toastElList = document.querySelectorAll('.toast')
const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl, option)) */

document.addEventListener('DOMContentLoaded', () => {
    const toastElList = document.querySelectorAll('.toast');
    const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));

    // Show all toasts on page load (you can control this manually if desired)
    toastList.forEach(toast => toast.show());
});

/*AL HACER SCROLL, APARECE LOGO SUPERIOR DERECHA*/


/*AL LLEGAR AL FOOTER, NAV DESAPARECE JUNTO AL LOGO*/

/*GALERIA*/
document.addEventListener("DOMContentLoaded", function () {

    $(window).scroll(function(){
        console.log("Scroll!");
            // Selecciona el logo y el footer
    const logo = document.getElementById("logo");
    const footer = document.querySelector("footer");

    if (logo && footer) { // Asegúrate de que los elementos existen
        // Crea un Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            console.log(entries);
            
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("hola!");
                    
                    // Oculta el logo cuando el footer es visible
                    logo.style.display = "none";
                } else {
                    console.log("adios!");
                    
                    logo.style.display = "block";
                    // Muestra el logo cuando el footer no es visible
                }
            });
        }, { threshold: 0.1 });

        // Observa el footer
        observer.observe(footer);
    } else {
        console.error("No se encontraron los elementos logo o footer.");
    }
    });
});

.logo-fixed {
    display: flex !important; 
    justify-content: flex-end;
    padding-right: 2em;
}

.logo-none {
    display: none !important;
}

// GALERIA
document.addEventListener("DOMContentLoaded", () => {
    // --- Create LightBox
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


/*VENTANA MODAL FORMULARIO*/


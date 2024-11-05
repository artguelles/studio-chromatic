console.log("Hello world");
console.log("BY MARIVÍ & CLARA");

/*ANIMACIONES AOS*/
AOS.init();

/*TYPED.JS*/
var typed = new Typed('#element', {
    strings: ['<i>First</i> sentence.', '&amp; a second sentence.','Use your own!'],
    typeSpeed: 50,
    loop: true,
});



/*AL HACER SCROLL, APARECE LOGO SUPERIOR DERECHA*/


/*AL LLEGAR AL FOOTER, NAV DESAPARECE JUNTO AL LOGO*/

document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el logo y el footer
    const logo = document.getElementById("logo");
    const footer = document.querySelector("footer");

    if (logo && footer) { // Asegúrate de que los elementos existen
        // Crea un Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Oculta el logo cuando el footer es visible
                    logo.style.display = "none";
                } else {
                    // Muestra el logo cuando el footer no es visible
                    logo.style.display = "block";
                }
            });
        }, { threshold: 0.1 });

        // Observa el footer
        observer.observe(footer);
    } else {
        console.error("No se encontraron los elementos logo o footer.");
    }
});

// GALERIA


/*VENTANA MODAL FORMULARIO*/


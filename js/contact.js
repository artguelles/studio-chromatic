console.log("BY MARIVÍ & CLARA");

/*ANIMACIONES AOS*/
AOS.init();

/* TOAST */

document.addEventListener('DOMContentLoaded', () => {
    const toastElList = document.querySelectorAll('.toast');
    const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));

    // Show all toasts on page load (you can control this manually if desired)
    toastList.forEach(toast => toast.show());
});
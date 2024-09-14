const updateFooter = () => {
    const footerText = document.getElementById('footer-text');
    
    // Obtener la fecha actual
    const currentDate = new Date();
    
    // Obtener el día, mes y año
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    const year = currentDate.getFullYear();

    // Formatear la fecha como DD/MM/YYYY
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    // Actualizar el contenido del footer
    footerText.innerHTML = ` ${formattedDate} Thiago Villasanti | Todos los derechos reservados &copy; ${year} | coderhouse`;
};

// Llamar a la función para actualizar el footer
updateFooter();

// Opcional: Actualizar el footer cada día, si el usuario deja la página abierta
setInterval(updateFooter, 86400000); // 86400000 ms = 1 día




const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    effect:"fade",
    autoplay:{
        delay:3000,
    },

    // If we need pagination
    pagination: {   
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
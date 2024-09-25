const updateFooter = () => {
    const footerText = document.getElementById('footer-text');
    

    const currentDate = new Date();
    
    
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();


    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    
    footerText.innerHTML = ` ${formattedDate} Thiago Villasanti | Todos los derechos reservados &copy; ${year} | coderhouse`;
};


updateFooter();


setInterval(updateFooter, 86400000); 




const swiper = new Swiper(".swiper", 
    {
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


const tabs = document.querySelectorAll('.tab');

const tabContents = document.querySelectorAll('.tab-content');


tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const target = this.dataset.target;

       
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        
        setTimeout(() => {
            document.getElementById(target).classList.add('active');
        }, 200);
    });
});

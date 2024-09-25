document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const formData = {
        name: name,
        email: email,
        message: message
    };

    const jsonData = JSON.stringify(formData, null, 2);
    localStorage.setItem('contactFormData', jsonData);

    Swal.fire({
        title: '¡Éxito!',
        text: 'Tu mensaje ha sido enviado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });

    document.getElementById('contactForm').reset();
});

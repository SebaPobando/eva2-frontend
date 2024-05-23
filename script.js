document.addEventListener('DOMContentLoaded', function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const faqAccordion = document.getElementById('faqAccordion');
            data.forEach(faq => {
                const faqItem = document.createElement('div');
                faqItem.classList.add('accordion-item');

                const faqHeader = document.createElement('h2');
                faqHeader.classList.add('accordion-header');
                faqHeader.id = `heading${faq.id}`;

                const faqButton = document.createElement('button');
                faqButton.classList.add('accordion-button', 'collapsed');
                faqButton.type = 'button';
                faqButton.setAttribute('data-bs-toggle', 'collapse');
                faqButton.setAttribute('data-bs-target', `#collapse${faq.id}`);
                faqButton.setAttribute('aria-expanded', 'false');
                faqButton.setAttribute('aria-controls', `collapse${faq.id}`);
                faqButton.textContent = faq.question;

                const faqCollapse = document.createElement('div');
                faqCollapse.id = `collapse${faq.id}`;
                faqCollapse.classList.add('accordion-collapse', 'collapse');
                faqCollapse.setAttribute('aria-labelledby', `heading${faq.id}`);
                faqCollapse.setAttribute('data-bs-parent', '#faqAccordion');

                const faqBody = document.createElement('div');
                faqBody.classList.add('accordion-body');
                faqBody.textContent = faq.answer;

                faqHeader.appendChild(faqButton);
                faqCollapse.appendChild(faqBody);
                faqItem.appendChild(faqHeader);
                faqItem.appendChild(faqCollapse);
                faqAccordion.appendChild(faqItem);
            });
        })
        .catch(error => console.error('Error al cargar las preguntas frecuentes:', error));
});

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const direccion = document.getElementById('direccion').value;
    const mensaje = document.getElementById('mensaje').value;
    const terminos = document.getElementById('terminos').checked;
    const feedback = document.getElementById('formFeedback');

    if (nombre && email && mensaje && terminos) {
        feedback.innerHTML = '<div class="alert alert-success" role="alert">Mensaje enviado exitosamente.</div>';
    } else {
        feedback.innerHTML = '<div class="alert alert-danger" role="alert">Debe completar todos los campos y aceptar los términos y condiciones.</div>';
    }
});

document.getElementById('themeToggle').addEventListener('click', function () {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const navbar = document.querySelector('header.navbar');
    navbar.classList.toggle('navbar-light');
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.toggle('dark-mode');
    });
    const faqItems = document.querySelectorAll('.accordion-item');
    faqItems.forEach(item => {
        item.classList.toggle('dark-mode');
    });
    this.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

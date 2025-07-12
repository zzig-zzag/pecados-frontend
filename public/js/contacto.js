// main.js
(function() {
    const form      = document.getElementById('form-contacto');
    const inputs    = form.querySelectorAll('.contact-form__input');
    const introSec  = document.getElementById('contact-intro');
    const formSec   = document.getElementById('contact-form');
    const successSec= document.getElementById('contact-success');
  
    // Al perder foco, marcamos el campo como "touched" y disparamos validación
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        input.classList.add('touched');
      });
    });
  
    // Al enviar formulario
    form.addEventListener('submit', e => {
      e.preventDefault();
      // Si es válido, ocultamos intro y form, mostramos éxito
      if (form.checkValidity()) {
        introSec.classList.add('hidden');
        formSec.classList.add('hidden');
        successSec.hidden = false;
        // Aquí puedes enviar por fetch o continuar con el backend...
      } else {
        // Marcar todos como touched para mostrar errores
        inputs.forEach(i => i.classList.add('touched'));
        // Mostrar primeros errores nativos (opcional)
        form.reportValidity();
      }
    });
  })();

  

  // Validación a la carta para email y teléfono
(function(){
    const form    = document.getElementById('form-contacto');
    const inputs  = form.querySelectorAll('.contact-form__input');
    const errors  = form.querySelectorAll('.contact-form__error');
  
    // Función genérica de validación
    function validateField(input) {
      const name = input.name;
      const errSpan = form.querySelector(`.contact-form__error[data-error-for="${name}"]`);
  
      // Email: usar checkValidity(); Teléfono: permitir vacío o regex + checkValidity
      let valid = true;
      if (name === 'email') {
        valid = input.checkValidity();
      } else if (name === 'phone') {
        const val = input.value.trim();
        if (val === '') {
          valid = true; // opcional
        } else {
          valid = /^\+?\d+$/.test(val);
        }
      }
  
      // Aplica clases y muestra/oculta mensaje
      input.classList.toggle('invalid', !valid);
      input.classList.toggle('valid', valid);
      errSpan.classList.toggle('visible', !valid);
    }
  
    // Blur: al salir del campo, validamos
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
    });
  
    // Submit: validamos todos; si alguno inválido, no enviamos
    form.addEventListener('submit', e => {
      e.preventDefault();
      let allValid = true;
      inputs.forEach(input => {
        validateField(input);
        if (input.classList.contains('invalid')) allValid = false;
      });
      if (allValid) {
        form.submit(); // o tu lógica de envío por AJAX
      }
    });
  })();
  
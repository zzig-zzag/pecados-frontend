// main.js
(function() {
  // Referencias DOM
  const header = document.querySelector('.navbar');
  const menu   = document.getElementById('mobile-menu');
  const burger = document.getElementById('burger-btn');
  const cart   = document.getElementById('cart-btn');
  const root   = document.documentElement;

  // Función que mide la altura real del header y vuelca el valor en la variable CSS
  function updateNavHeight() {
    if (!header) return;
    const navHeight = header.getBoundingClientRect().height + 'px';
    root.style.setProperty('--nav-height', navHeight);
  }

  // 1) Llamada inmediata para cubrir el caso de que DOMContentLoaded / load ya hayan ocurrido
  updateNavHeight();
  // 2) Asegurar que midamos tras cargar imágenes, fuentes y demás
  window.addEventListener('load', updateNavHeight);
  // 3) Volver a medir al cambiar el tamaño de ventana
  window.addEventListener('resize', updateNavHeight);

  // 4) Toggle menú al pulsar burger (siempre flotante gracias a CSS top: var(--nav-height))
  burger.addEventListener('click', e => {
    e.stopPropagation();
    menu.classList.toggle('show');
  });

  // 5) Cerrar el menú al clicar fuera de él
  document.addEventListener('click', e => {
    if (menu.classList.contains('show') &&
        !menu.contains(e.target) &&
        !burger.contains(e.target)) {
      menu.classList.remove('show');
    }
  });

  // 6) Redirección del carrito
  cart.addEventListener('click', () => {
    window.location.href = '/carrito.html';
  });
})();

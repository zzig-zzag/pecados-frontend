// cartBadge.js
(function() {
    // Obtiene el array de items del carrito desde localStorage
    function getCartItems() {
      try {
        return JSON.parse(localStorage.getItem('cart')) || [];
      } catch {
        return [];
      }
    }
  
    // Actualiza la visibilidad del badge del carrito
    function updateCartBadge() {
      const badge = document.getElementById('cart-badge');
      if (!badge) return;
  
      // Sumar cantidades de todos los items
      const totalCount = getCartItems()
        .reduce((sum, { quantity = 0 }) => sum + quantity, 0);
  
      if (totalCount > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  
    // Exponer para llamarlo tras agregar/eliminar items
    window.updateCartBadge = updateCartBadge;
  
    // Hook inicial al cargar la página
    document.addEventListener('DOMContentLoaded', updateCartBadge);
  
    // También actualizar si se modifica localStorage en otra pestaña
    window.addEventListener('storage', e => {
      if (e.key === 'cart') updateCartBadge();
    });
  })();
  
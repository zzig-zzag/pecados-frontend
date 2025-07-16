// cart.js
document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('cart-items-list');
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // Capitalizar
  const cap = s => s ? s[0].toUpperCase()+s.slice(1) : '';

  function renderCart() {
    listEl.innerHTML = '';
    if (!cart.length) {
      listEl.innerHTML = `<li class="cart-empty">Tu carrito está vacío.</li>`;
      return;
    }
    cart.forEach((item, idx) => {
      const name      = item.name;
      const sizeLabel = cap(item.size);
      const qty       = item.quantity;
      const subtotal  = (item.price * qty).toFixed(2);

      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `

        <div class="cart-item__details">
          <p class="cart-item__name">${name}</p>
          ${sizeLabel? `<p class="cart-item__meta">Tamaño: ${sizeLabel}</p>`: ''}
          <p class="cart-item__meta">Cantidad: ${qty}</p>
        </div>
        <p class="cart-item__subtotal">€${subtotal}</p>
        <button class="cart-item__remove" data-index="${idx}">Eliminar</button>
      `;
      listEl.appendChild(li);
    });

    document.querySelectorAll('.cart-item__remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = +btn.dataset.index;
        cart.splice(i,1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();
});

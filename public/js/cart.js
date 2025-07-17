// cart.js
document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('cart-items-list');
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const instEl = document.getElementById('cart-instructions');
  const summarySection = document.getElementById('cart-summary');
  const actionsSection = document.getElementById('cart-actions');
  const subtotalEl     = document.getElementById('cart-subtotal');
  const totalEl        = document.getElementById('cart-total');
  const checkoutBtn    = document.getElementById('checkout-btn');
  
  // Capitalizar
  const cap = s => s ? s[0].toUpperCase()+s.slice(1) : '';

  function renderCart() {
    listEl.innerHTML = '';
    if (!cart.length) {
      summarySection.classList.add('hidden');
      actionsSection.classList.add('hidden');
      instEl.classList.add('hidden');
    
      const template = document.getElementById('empty-cart-template');
      listEl.innerHTML = '';
      listEl.appendChild(template.content.cloneNode(true));
      
      return;
    }
    summarySection.classList.remove('hidden');
    actionsSection.classList.remove('hidden');
    instEl.classList.remove('hidden');

    

    // Calculamos subtotal  
      const subtotal = cart
      .reduce((sum, item) => sum + (item.price * item.quantity), 0)
      .toFixed(2);
      subtotalEl.textContent = `€${subtotal}`;
      totalEl.textContent    = `€${subtotal}`;  // IVA e.g.
          
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
  updateCartBadge();

});
updateCartBadge();





checkoutBtn && checkoutBtn.addEventListener('click', () => {
  // Ejemplo: enviar al backend para crear sesión Stripe
  fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      items: cart,
      notes: document.getElementById('order-notes')?.value || ''
    })
  })
  .then(res => res.json())
  .then(session => {
    window.location.href = session.url;
  })
  .catch(err => console.error(err));
});


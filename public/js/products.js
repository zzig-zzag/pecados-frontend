// products.js
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const cfg = window.PRODUCT_CONFIG || {};

    // ————————— PICKUP NOTICE —————————
    const now    = new Date(),
          hour   = now.getHours(),
          textEl = document.getElementById('pickup-text');
    if (textEl) {
      textEl.textContent = hour < 12
        ? '❗ Recuerda: los pedidos para el mismo día se cierran a las 12:00.'
        : '❗ Los pedidos realizados después de la 12:00 podrán recogerse solo desde mañana.';
    }

    // ————— SELECTOR DE TAMAÑO —————
    const sizeChips        = document.querySelectorAll('.chip--size'),
          addBtn           = document.getElementById('add-to-cart'),
          viewBtn          = document.getElementById('view-cart');
    let selectedChip     = document.querySelector('.chip--size.active') || sizeChips[0],
        selectedSize     = selectedChip?.dataset.size || '',
        selectedCfg      = cfg.sizes?.[selectedSize] || {},
        selectedPrice    = selectedCfg.price    || 0,
        selectedPriceId  = selectedCfg.priceId  || '',
        selectedProductId= selectedCfg.productId|| '';

    // Inicializar atributos en el botón
    function syncButtonAttrs() {
      if (!addBtn) return;
      addBtn.dataset.priceId   = selectedPriceId;
      addBtn.dataset.productId = selectedProductId;
    }
    syncButtonAttrs();

    sizeChips.forEach(chip => {
      chip.addEventListener('click', e => {
        e.preventDefault();
        sizeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedSize      = chip.dataset.size;
        selectedCfg       = cfg.sizes?.[selectedSize] || {};
        selectedPrice     = selectedCfg.price     || 0;
        selectedPriceId   = selectedCfg.priceId   || '';
        selectedProductId = selectedCfg.productId || '';
        syncButtonAttrs();
        updateTotal();
      });
    });

    // ————— STEPPER CANTIDAD —————
    const decBtn = document.getElementById('dec-btn'),
          incBtn = document.getElementById('inc-btn'),
          qtyVal = document.getElementById('qty-value');
    let quantity = parseInt(qtyVal?.textContent, 10) || 1;

    function setQuantity(n) {
      quantity = Math.max(1, n);
      qtyVal.textContent = quantity;
      updateTotal();
    }
    decBtn && decBtn.addEventListener('click', () => setQuantity(quantity - 1));
    incBtn && incBtn.addEventListener('click', () => setQuantity(quantity + 1));

 
   
    // ————— SELECTOR DE HORA —————
    const timeContainer = document.querySelector('.chips--time'),
          timeChips      = document.querySelectorAll('.chip--time');
    timeChips.forEach(chip => {
      chip.addEventListener('click', e => {
        e.preventDefault();
        timeChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
    });

    // ——— DRAG‑TO‑SCROLL ———
    if (timeContainer) {
      let isDown = false, startX = 0, scrollX = 0;
      const startDrag = e => {
        isDown  = true;
        startX  = (e.touches ? e.touches[0].pageX : e.pageX) - timeContainer.offsetLeft;
        scrollX = timeContainer.scrollLeft;
        timeContainer.classList.add('dragging');
      };
      const stopDrag = () => {
        isDown = false;
        timeContainer.classList.remove('dragging');
      };
      const doDrag = e => {
        if (!isDown) return;
        e.preventDefault();
        const x = (e.touches ? e.touches[0].pageX : e.pageX) - timeContainer.offsetLeft;
        timeContainer.scrollLeft = scrollX - (x - startX);
      };
      timeContainer.addEventListener('mousedown',  startDrag);
      timeContainer.addEventListener('touchstart', startDrag);
      timeContainer.addEventListener('mousemove',  doDrag);
      timeContainer.addEventListener('touchmove',  doDrag);
      timeContainer.addEventListener('mouseup',    stopDrag);
      timeContainer.addEventListener('mouseleave', stopDrag);
      timeContainer.addEventListener('touchend',   stopDrag);
    }
    // ————— TOTAL Y CARRITO —————
    const totalEl = document.getElementById('order-total');
    function updateTotal() {
      if (totalEl) {
        totalEl.textContent = `€${(selectedPrice * quantity).toFixed(2)}`;
      }
    }
    updateTotal();

    // ————— AÑADIR AL CARRITO —————
    addBtn && addBtn.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart')||'[]');
      cart.push({
        productId: selectedProductId,
        priceId:   selectedPriceId,
        price:     selectedPrice,
        quantity:  quantity,
        size:      selectedSize,
        name:      cfg.baseName,
        image:     cfg.baseImage
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      viewBtn && viewBtn.classList.remove('hidden');
      alert('Artículo añadido al carrito');
    });

    // ————— VER CARRITO —————
    viewBtn && viewBtn.addEventListener('click', () => {
      window.location.href = '/carrito.html';
    });

    // — Mostrar “Ver carrito” si hay items
    if (viewBtn && JSON.parse(localStorage.getItem('cart')||'[]').length) {
      viewBtn.classList.remove('hidden');
    }
  });
})();

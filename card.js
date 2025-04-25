



document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');

  if (cart.length === 0) {
    cartList.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;

  cart.forEach((product, index) => {
    total += product.price * product.quantity;

    const item = document.createElement('div');
    item.className = 'cart-item d-flex justify-content-between align-items-start';

    item.innerHTML = `
    <div class="row w-100">
      <div class="col-2 d-flex">
        <img src="${product.images[0]}" class="cart-img me-3" alt="${product.name}">
        <div>
          <h5>${product.name}</h5>
          <p>${(product.price * product.quantity).toFixed(2)} EGP</p>
          <div class="quantity-controls d-flex align-items-center">
            <button class="btn btn-outline-secondary btn-sm decrease-btn" data-index="${index}">−</button>
            <span class="mx-2">${product.quantity}</span>
            <button class="btn btn-outline-secondary btn-sm increase-btn" data-index="${index}">+</button>
          </div>
        </div>
      </div>
      <div class="col-3 d-flex justify-content-end align-items-start">
        <button class="btn btn-link text-danger remove-btn p-0" data-index="${index}" title="Remove">
          <i class="bi bi-trash fs-5"></i>
        </button>
      </div>
    </div>
  `;
  
    cartList.appendChild(item);
  });

  cartTotal.textContent = `${total.toFixed(2)} EGP`;

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  });

  document.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      cart[index].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  });

  document.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    });
  });
});




//////////////////////////////////
///////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('chat-button').addEventListener('click', function() {
    document.getElementById('chat-container').style.display = 'block';
  });

  document.getElementById('close-chat').addEventListener('click', function() {
    document.getElementById('chat-container').style.display = 'none';
  });

  document.getElementById('chat-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      let inputField = document.getElementById('chat-input');
      let message = inputField.value.trim();

      if (message !== '') {
        let chatBody = document.getElementById('chat-body');
        chatBody.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
        inputField.value = '';

        setTimeout(() => {
          chatBody.innerHTML += `<p><strong>Bot:</strong> We’ll reply as soon as we can 😊</p>`;
          chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
      }
    }
  });
});

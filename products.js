
///nave toggle


  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".menu-toggle");
    const navSocial = document.querySelector(".nav-social");
    const navLinks = document.querySelector(".nav-links");

    toggleButton.addEventListener("click", function () {
      navSocial.classList.toggle("show");
      navLinks.classList.toggle("show");
    });
  });



















// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', function () {
  fetch('product.json')  // جلب البيانات من فايل خارجي
    .then(res => res.json())
    .then(products => displayProducts(products));

  const productListContainer = document.getElementById('product-list');

  // دالة لإضافة المنتج للسلة
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    renderCart();
  }
 
  // دالة لعرض المنتجات في الصفحة
  function displayProducts(products) {
    products.forEach(product => {
      const col = document.createElement('div');
      col.className = "col-10 col-sm-6 col-md-4 col-lg-3 g-2";

      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      const imageSlider = document.createElement('div');
      imageSlider.classList.add('image-slider');

      const prevBtn = document.createElement('button');
      prevBtn.className = 'slider-arrow left-arrow';
      prevBtn.innerHTML = '&#8249;';

      const nextBtn = document.createElement('button');
      nextBtn.className = 'slider-arrow right-arrow';
      nextBtn.innerHTML = '&#8250;';

      const images = [];

      product.images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('slider-image');
        if (index === 0) img.classList.add('active');
        imageSlider.appendChild(img);
        images.push(img);
      });

      let currentIndex = 0;

      function showImage(index) {
        images.forEach((img, i) => {
          img.classList.toggle('active', i === index);
        });
      }

      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
      });

      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      });

      imageSlider.appendChild(prevBtn);
      imageSlider.appendChild(nextBtn);

      const productTitle = document.createElement('h5');
      productTitle.classList.add('mt-2');
      productTitle.textContent = product.name;

      const productPrice = document.createElement('p');
      productPrice.classList.add('text-muted');
      productPrice.textContent = `$${product.price.toFixed(2)}`;
 productPrice.className='product-price'
      const productDescription = document.createElement('p');
      productDescription.classList.add('small');
      productDescription.textContent = product.description;

      const addToCartBtn = document.createElement('button');
      addToCartBtn.innerHTML = `<i class="bi bi-cart-plus me-1"></i> Add to Cart`;
      addToCartBtn.className = 'btn btn-primary w-100 add-to-cart';
      addToCartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        addToCart(product);
        renderCart();
      });

      const viewBtn = document.createElement('button');
      viewBtn.className = 'btn btn-outline-secondary w-100 mt-2';
      viewBtn.textContent = 'View Details';
      viewBtn.addEventListener('click', function () {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'productdetails.html';
      });

      productCard.appendChild(imageSlider);
      productCard.appendChild(productTitle);
      productCard.appendChild(productPrice);
      productCard.appendChild(productDescription);
      productCard.appendChild(addToCartBtn);
      productCard.appendChild(viewBtn);

      col.appendChild(productCard);
      productListContainer.appendChild(col);
    });
  }

  // دالة لعرض السلة
  function renderCart() {
    const cartContainer = document.getElementById('cart-items-container');
    const subtotalElement = document.getElementById('cart-subtotal');
    const itemCountElement = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cartContainer.innerHTML = '';
    itemCountElement.textContent = `(${cart.length} item${cart.length !== 1 ? 's' : ''})`;

    cart.forEach((product, index) => {
      subtotal += product.price * product.quantity;

      const item = document.createElement('div');
      item.className = 'cart-item d-flex justify-content-between align-items-start mb-3';

      item.innerHTML = `
        <div class="d-flex">
          <img src="${product.images[0]}" class="me-2" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;" />
          <div>
            <strong>${product.name}</strong>
            <p class="mb-1">${(product.price * product.quantity).toFixed(2)}EGP</p>
            <div class="quantity-controls d-flex align-items-center">
              <button class="btn btn-sm btn-outline-secondary me-1 decrease-btn" data-index="${index}">−</button>
              <span>${product.quantity}</span>
              <button class="btn btn-sm btn-outline-secondary ms-1 increase-btn" data-index="${index}">+</button>
            </div>
          </div>
        </div>
        <div class="text-end">
          <p class="mb-0">${(product.price * product.quantity).toFixed(2)}EGP</p>
          <button class="btn btn-link text-danger p-0 remove-btn" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      `;

      cartContainer.appendChild(item);
    });

    subtotalElement.textContent = `${subtotal.toFixed(2)}EGP`;

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.currentTarget.dataset.index;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll('.increase-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.currentTarget.dataset.index;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart[index].quantity += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    document.querySelectorAll('.decrease-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.currentTarget.dataset.index;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  window.onload = function () {
    document.getElementById('open-cart-btn').addEventListener('click', () => {
      document.getElementById('cart-sidebar').classList.add('open');
      renderCart();
    });

    document.getElementById('close-cart-btn').addEventListener('click', () => {
      document.getElementById('cart-sidebar').classList.remove('open');
    });

    document.getElementById('view-cart-btn').addEventListener('click', function () {
      window.location.href = 'cart.html';
    });

    document.getElementById('checkout-btn').addEventListener('click', function () {
      window.location.href = 'checkout.html';
    });
    // اغلاق الكارت عند الضغط خارج السايد بار
document.addEventListener('click', function (e) {
  const sidebar = document.getElementById('cart-sidebar');
  const openCartBtn = document.getElementById('open-cart-btn');
  if (
    sidebar.classList.contains('open') &&
    !sidebar.contains(e.target) && 
    e.target !== openCartBtn &&
    !openCartBtn.contains(e.target)
  ) {
    sidebar.classList.remove('open');
  }
});

  };
});

///////////////////////////////////
///////////////////////////////
///////////////////////////////chatboot//////////
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


  

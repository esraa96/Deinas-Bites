document.addEventListener('DOMContentLoaded', function () {
    const product = JSON.parse(localStorage.getItem('selectedProduct'));

    if (!product) {
      // لو مفيش منتج مختار، رجّع المستخدم للصفحة الرئيسية
      window.location.href = 'index.html';
      return;
    }

    // عرض التفاصيل في الصفحة
    document.getElementById('title').textContent = product.name;
    document.getElementById('price').textContent = `${product.price.toFixed(2)} EGP`;
    document.getElementById('description').textContent = product.description;
    document.getElementById('breadcrumb-name').textContent = product.name;

    const mainImage = document.getElementById('main-image');
    const thumbnailsContainer = document.getElementById('image-thumbnails');

    mainImage.src = product.images[0];

    // عرض الصور المصغرة
    thumbnailsContainer.innerHTML = '';
    product.images.forEach((src, index) => {
      const thumb = document.createElement('img');
      thumb.src = src;
      thumb.className = 'img-thumbnail me-2';
      thumb.style.width = '60px';
      thumb.style.cursor = 'pointer';
      thumb.addEventListener('click', () => {
        mainImage.src = src;
      });
      thumbnailsContainer.appendChild(thumb);
    });

    // دالة إضافة للسلة
    window.addToCart = function () {
      const quantity = parseInt(document.getElementById('quantity').value);
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingProductIndex = cart.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        product.quantity = quantity;
        cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} added to cart!`);
    };
  });

  // دالة لتشغيل الأكورديون
  function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const plusMinus = header.querySelector('.plus-minus');
    const isOpen = content.style.display === 'block';

    document.querySelectorAll('.accordion-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.plus-minus').forEach(el => el.textContent = '+');

    if (!isOpen) {
      content.style.display = 'block';
      plusMinus.textContent = '−';
    }
  }




  /////////chatt
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
  
function getDataFromDB() {
    var prodcuts = [
        {
        "id": 101,
        "name": "Jam & Poppy Seed Bites",
        "description": "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
        "price": 600.0,
        "category_id": 1,
        "images": [
          "./img/pro3.webp",
          "./img/jammm.avif",
          "./img/f61af8_00ad04f187404a2f9507ad3a772bc35f~mv2_d_4600_4600_s_4_2.avif"
        ]
      },
      {
        "id": 103,
        "name": "Vanilla Cupcakes",
        "description": "Soft and fluffy vanilla cupcakes topped with creamy vanilla frosting.",
        "price": 150.0,
        "category_id": 3,
        "images": [
          "./img/f61af8_2cf5a2ff20e54e029f48ca64373b2dab~mv2.avif",
          "./img/f61af8_9e3cbb2440934ceea2e6ef037da64d40~mv2.avif",
          "./img/f61af8_00ad04f187404a2f9507ad3a772bc35f~mv2_d_4600_4600_s_4_2.avif"
        ]
      },
      {
        "id": 104,
        "name": "Lemon Muffins",
        "description": "Light and tangy lemon muffins, perfect for breakfast or a quick snack.",
        "price": 180.0,
        "category_id": 1,
        "images": [
          "./img/f61af8_09a4b9d707684b96a9f60bfcefdaac6a~mv2.avif",
          "./img/f61af8_8c8f73f4261e4502bb789bca0d946abd~mv2.avif",
          "./img/2bisc.jpg"
        ]
      },
     
      {
        "id": 102,
        "name": "Chocolate Chip Cookies",
        "description": "Delicious chocolate chip cookies made with high-quality chocolate chunks. Perfect for dessert or a snack.",
        "price": 250.0,
        "category_id": 2,
        "images": [
          "./img/f61af8_160773e7f2594ca48721f42c1723d2f0~mv2.avif",
          "./img/f61af8_42eb031701d04527a103d2f4e49e1b5d~mv2.avif",
          "./img/f61af8_3b71ca5f113844858b7eef32ba87ee7b~mv2_d_4442_4074_s_4_2.jpg"
        ]
      }
    ];
    return prodcuts; 
}

var prodcuts = getDataFromDB();

function draw(product) {
  const col = document.createElement('div');
  col.className = ' col-12 col-sm-6 col-md-4 col-lg-3 g-1';

  const card = document.createElement('div');
  card.classList.add('plant-card');

  // إنشاء عنصر الصورة
  const img = document.createElement('img');
  img.src = product.images[0];
  img.classList.add('plant-card-img');

  // إنشاء عنصر اسم المنتج
  const title = document.createElement('h5');
  title.innerText = product.name;

  // إنشاء عنصر وصف المنتج
  const desc = document.createElement('p');
  desc.classList.add('small');
  desc.innerText = product.description;
 
  // إنشاء عنصر سعر المنتج
  const price = document.createElement('p');
  price.innerText = `$${product.price.toFixed(2)}`;
 price.className='price'
  // إنشاء زر "إضافة إلى السلة"
  const btn = document.createElement('button');
  btn.className = 'btn btn-primary w-100';
  btn.innerText = 'Add To Cart';
  btn.addEventListener('click', function(e) {
    e.stopPropagation(); // منع حدث النقر على البطاقة نفسها
    addToCart(product);   // إضافة المنتج للسلة
  });
 // جعل النقر على البطاقة ينقل لصفحة التفاصيل
 card.addEventListener('click', function() {
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  window.location.href = 'productdetails.html';
});

// تجميع عناصر البطاقة
card.append(img, title, desc, price, btn);
col.appendChild(card);

// إلحاق البطاقة بحاوية المنتجات
document.getElementById('plantsSectionContainer').appendChild(col);
}


function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; 
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;  
    } else {
      product.quantity = 1; 
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart)); 
    alert(`${product.name} has been successfully added to your cart!`);
    renderCart();  
  }


for (var i = 0; i < prodcuts.length; i++) {
    draw(prodcuts[i]);
}


// دالة لعرض السلة
function renderCart() {
  const cartContainer = document.getElementById('cart-items-container');
  const subtotalElement = document.getElementById('cart-subtotal');
  const itemCountElement = document.getElementById('cart-count');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;

  cartContainer.innerHTML = ''; // مسح المحتوى القديم
  itemCountElement.textContent = `(${cart.length} item${cart.length !== 1 ? 's' : ''})`;

  cart.forEach((product, index) => {
    subtotal += product.price * product.quantity;

    const item = document.createElement('div');
    item.className = 'cart-item d-flex justify-content-between align-items-start col-10 col-sm-6 col-md-4 col-lg-3 g-1';

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

  // Event Listeners لحذف العناصر
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart(); // تحديث السايدبار بعد الحذف
    });
  });

  // Event Listeners لزيادة الكمية
  document.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart[index].quantity += 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart(); // تحديث السايدبار بعد الزيادة
    });
  });

  // Event Listeners لتقليل الكمية
  document.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        // إذا كانت الكمية أقل من 1 يتم حذف المنتج
        cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart(); // تحديث السايدبار بعد التقليل
    });
  });
}

window.onload = function () {
  // زر عرض السلة
  const openCartBtn = document.getElementById('open-cart-btn');
  if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
      document.getElementById('cart-sidebar').classList.add('open');
      renderCart();
    });
  }

  // زر إغلاق السلة
  document.getElementById('close-cart-btn').addEventListener('click', () => {
    document.getElementById('cart-sidebar').classList.remove('open');
  });

  // زر لحذف جميع المنتجات من السلة
  document.getElementById('view-cart-btn').addEventListener('click', function () {
    window.location.href = 'cart.html';
  });

  // زر الذهاب لصفحة الدفع
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

/////////////////nav-social



///toggleinfo
// إضافة أو إزالة الكلاس active عند النقر على التوجل

  document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".menu-toggle");
    const navSocial = document.querySelector(".nav-social");
    const navLinks = document.querySelector(".nav-links");

    toggleButton.addEventListener("click", function () {
      navSocial.classList.toggle("show");
      navLinks.classList.toggle("show");
    });
  });



//////////list//////
function toggleAccordion(header) {
  let content = header.nextElementSibling;
  let icon = header.querySelector(".plus-minus");
  
  let isVisible = content.style.display === "block";
  
  document.querySelectorAll(".accordion-content").forEach(item => item.style.display = "none");
  document.querySelectorAll(".plus-minus").forEach(icon => icon.innerText = "+");

  if (!isVisible) {
      content.style.display = "block";
      icon.innerText = "_";
  }
}
///chatboot ///
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
///////////////////cart


  

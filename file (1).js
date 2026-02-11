// --- Checkout-Seite (Simulation) ---
if (window.location.pathname.includes("checkout.html")) {
  const orderItems = document.getElementById("order-items");
  const orderTotal = document.getElementById("order-total");
  const confirmation = document.getElementById("order-confirmation");
  const checkoutForm = document.getElementById("checkout-form");

  // Lade Warenkorb aus localStorage
  const storedCart = JSON.parse(localStorage.getItem("dsa-cart")) || [];
  
  // Zeige Produkte an
  let total = 0;
  storedCart.forEach(item => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} – €${item.price.toFixed(2)}`;
    orderItems.appendChild(li);
  });
  orderTotal.textContent = total.toFixed(2);

  // Formular absenden
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    
    document.getElementById("cust-name").textContent = name;
    document.getElementById("cust-email").textContent = email;

    confirmation.classList.remove("hidden");
    checkoutForm.classList.add("hidden");
    document.querySelector(".order-summary").classList.add("hidden");

    // "Bestellung" speichern & Warenkorb leeren
    localStorage.removeItem("dsa-cart");
  });
}

// --- Speicher Warenkorb lokal (Verbesserung der Produktseite) ---
if (document.querySelector(".add-to-cart")) {
  let cart = JSON.parse(localStorage.getItem("dsa-cart")) || [];

  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  updateCart();

  document.querySelectorAll(".add-to-cart").forEach((btn) =>
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);

      cart.push({ name, price });
      localStorage.setItem("dsa-cart", JSON.stringify(cart));
      updateCart();
    })
  );

  function updateCart() {
    if (cartCount) cartCount.textContent = cart.length;
    if (cartItems && cartTotal) {
      cartItems.innerHTML = "";
      cart.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} – €${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
      });
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      cartTotal.textContent = total.toFixed(2);
    }
  }

  // Link zum Checkout
  const checkoutLink = document.createElement("a");
  checkoutLink.href = "checkout.html";
  checkoutLink.textContent = "Weiter zum Checkout";
  checkoutLink.classList.add("btn");
  document.querySelector(".cart-summary")?.appendChild(checkoutLink);
}

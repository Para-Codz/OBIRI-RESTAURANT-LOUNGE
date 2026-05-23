/* =========================================================
   OBIRI RESTAURANT & LOUNGE — Main JavaScript
   Handles: menu rendering, cart, WhatsApp ordering,
   reservations, reviews, gallery lightbox, nav
   ========================================================= */

// ============================================================
// CONFIG — Official OBIRI WhatsApp number
// ============================================================
const OBIRI_WHATSAPP = "2349033173219";    // For wa.me links (no plus, no spaces)
const OBIRI_PHONE_DISPLAY = "+234 903 317 3219";

// Universal helper: opens WhatsApp with the prefilled message in a new tab
function sendToWhatsApp(message) {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${OBIRI_WHATSAPP}?text=${encoded}`;
  // Open in a new tab/window — this works on both mobile and desktop.
  // On mobile, the WhatsApp app intercepts wa.me links and opens the chat directly.
  window.open(url, "_blank");
}

// Format Naira currency
function formatNaira(amount) {
  return "₦" + amount.toLocaleString("en-NG");
}

// ============================================================
// MENU DATA
// ============================================================
const MENU_ITEMS = [
  // ----- LOCAL DISHES -----
  {
    id: "local-afang",
    name: "Gourmet Afang Soup",
    category: "local",
    price: 14500,
    description: "Rich dark green soup made with water leaves and wild afang leaves, slow-simmered with stockfish, goat meat, periwinkles and dry fish. Served with your choice of swallow.",
    image: "https://images.pexels.com/photos/29253254/pexels-photo-29253254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    spicyLevel: 2,
    prepTime: "20 mins",
    tags: ["Best Seller", "Signature"],
    isPopular: true
  },
  {
    id: "local-nkwobi",
    name: "Spicy Nkwobi Platter",
    category: "local",
    price: 11000,
    description: "Traditional Igbo delicacy of cow foot cooked in spicy palm oil paste, garnished with utazi leaves, onion rings, and ehuru. Perfectly pairs with cold palm wine.",
    image: "/image/nkwobi.png",
    spicyLevel: 3,
    prepTime: "15 mins",
    tags: ["Spicy", "Traditional"],
    isPopular: true
  },
  {
    id: "local-abacha",
    name: "OBIRI Royal Abacha",
    category: "local",
    price: 9500,
    description: "Authentic African salad with cassava flakes, oil bean (ugba), garden eggs, red onions, kanda, and dry fish in a spiced potash-palm oil dressing.",
    image: "https://images.pexels.com/photos/8166269/pexels-photo-8166269.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    spicyLevel: 1,
    prepTime: "10 mins",
    tags: ["Light & Fresh", "Local Special"]
  },
  {
    id: "local-seafood-okra",
    name: "Premium Seafood Okra",
    category: "local",
    price: 16500,
    description: "Rich okra soup loaded with jumbo prawns, crabs, calamari, snail, and catfish, seasoned with local spices and served piping hot.",
    image: "https://images.pexels.com/photos/19435798/pexels-photo-19435798.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    spicyLevel: 2,
    prepTime: "20 mins",
    tags: ["Luxury Seafood"],
    isPopular: true
  },
  {
    id: "local-jollof",
    name: "OBIRI Smoky Jollof Rice",
    category: "local",
    price: 12500,
    description: "Long grain rice cooked party-style in a rich tomato base, smoked with firewood essence. Served with fried plantain, coleslaw, and grilled chicken or beef.",
    image: "https://images.pexels.com/photos/18805640/pexels-photo-18805640.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    spicyLevel: 2,
    prepTime: "15 mins",
    tags: ["Party Style", "Smoky"],
    isPopular: true
  },

  // ----- SPECIALS -----
  {
    id: "special-bushmeat",
    name: "Peppered Bush Meat",
    category: "specials",
    price: 18500,
    description: "Tender bush meat slow-cooked in scotch bonnet and local herb paste, garnished with spring onions. Served with roasted plantain or french fries.",
    image: "https://images.pexels.com/photos/34624131/pexels-photo-34624131.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    spicyLevel: 3,
    prepTime: "15 mins",
    tags: ["Chef's Pick", "High Protein"],
    isPopular: true
  },
  {
    id: "special-grilledfish",
    name: "Spicy Whole Grilled Croaker",
    category: "specials",
    price: 24000,
    description: "Fresh whole Croaker fish marinated for 6 hours in our secret OBIRI spice rub, grilled over open flames, served with spicy yam chips, plantain and coleslaw.",
    image: "https://images.pexels.com/photos/35627599/pexels-photo-35627599.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    spicyLevel: 2,
    prepTime: "25 mins",
    tags: ["Crowd Favorite", "Fresh Catch"],
    isPopular: true
  },
  {
    id: "special-chicken-wings",
    name: "OBIRI Peppered Chicken Wings",
    category: "specials",
    price: 13500,
    description: "Crispy fried chicken wings tossed in our signature suya-spiced pepper sauce. Served sizzling hot with cooling cucumber salad and house dip.",
    image: "https://images.pexels.com/photos/28635451/pexels-photo-28635451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    spicyLevel: 3,
    prepTime: "20 mins",
    tags: ["Bar Favorite", "Suya Spiced"],
    isPopular: true
  },
  {
    id: "special-platter",
    name: "OBIRI Grand Lounge Platter",
    category: "specials",
    price: 48000,
    description: "Ultimate sharing platter: peppered ribs, spicy bush meat, crispy chicken wings, grilled gizzard, fried plantain, yam fries, and assorted pepper dips.",
    image: "https://images.pexels.com/photos/7493589/pexels-photo-7493589.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    spicyLevel: 2,
    prepTime: "30 mins",
    tags: ["Feeds 2-3", "Platter"],
    isPopular: true
  },

  // ----- DRINKS -----
  {
    id: "drink-palmwine",
    name: "OBIRI Fresh Palm Wine Calabash",
    category: "drinks",
    price: 7500,
    description: "Sweet, frothy, freshly tapped natural palm wine. Served in our signature OBIRI-branded calabash gourd with traditional bamboo cups.",
    image: "/image/obiri-calabash.png",
    prepTime: "5 mins",
    tags: ["Signature", "100% Organic"],
    isPopular: true
  },
  {
    id: "drink-obiri-sunrise",
    name: "OBIRI Sunrise Cocktail",
    category: "drinks",
    price: 8500,
    description: "Signature blend of premium white rum, passion fruit purée, fresh lime juice, and a splash of wild hibiscus extract for a vibrant layered sunset look.",
    image: "https://images.pexels.com/photos/33013697/pexels-photo-33013697.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    prepTime: "5 mins",
    tags: ["Signature Cocktail"],
    isPopular: true
  },
  {
    id: "drink-ph-mule",
    name: "Port Harcourt Mule",
    category: "drinks",
    price: 9000,
    description: "Local spin on the Moscow Mule: double shot premium vodka, freshly pressed ginger juice, lemongrass syrup, and sparkling club soda.",
    image: "https://images.pexels.com/photos/2531184/pexels-photo-2531184.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    prepTime: "5 mins",
    tags: ["Spiced", "Premium Spirit"]
  },
  {
    id: "drink-zobo",
    name: "Chilled Zobo Mocktail",
    category: "drinks",
    price: 4500,
    description: "Refreshing hibiscus drink infused with pineapple, ginger, cloves and cucumber. Served ice-cold. Non-alcoholic, naturally sweetened.",
    image: "https://images.pexels.com/photos/2531185/pexels-photo-2531185.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    prepTime: "5 mins",
    tags: ["Non-Alcoholic", "Natural"]
  }
];

// ============================================================
// EVENTS DATA
// ============================================================
const LIVE_EVENTS = {
  fri: {
    id: "fri",
    title: "Highlife & Jazz Fusion Night",
    date: "Every Friday Night",
    time: "7:30 PM - Late",
    description: "Electrifying blend of old-school Nigerian Highlife, smooth jazz, and modern Afrobeats. Performed by the renowned OBIRI Resonance Band with special guest vocalists.",
    image: "https://images.pexels.com/photos/9002000/pexels-photo-9002000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    artist: "The OBIRI Resonance Band",
    genre: "Highlife, Jazz & Afrobeats",
    isSpecial: true
  },
  sat: {
    id: "sat",
    title: "Vibe & Lounge Saturdays",
    date: "Every Saturday Night",
    time: "8:00 PM - Late",
    description: "Turn up the energy with live saxophonist, acoustic soloists, and guest DJs spinning the hottest urban and tropical tracks. Dance, drink, socialize.",
    image: "https://images.pexels.com/photos/8198205/pexels-photo-8198205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    artist: "DJ Spin & Sax-man Jerry",
    genre: "Acoustic Soul, Sax House & Afropop",
    isSpecial: false
  },
  sun: {
    id: "sun",
    title: "Sunday Sunset Sessions",
    date: "Every Sunday Evening",
    time: "5:00 PM - 10:00 PM",
    description: "Unwind with chilled acoustic vibes, soul music, and palm wine specials. Relaxed conversational volume and warm lighting.",
    image: "https://images.pexels.com/photos/14036245/pexels-photo-14036245.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    artist: "Chike & The Strings",
    genre: "Acoustic, R&B & Neo-Soul",
    isSpecial: false
  }
};

// ============================================================
// REVIEWS DATA
// ============================================================
const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    author: "Kelechi O.",
    rating: 5,
    text: "Amazing atmosphere! The live band on Friday was top-notch. We had the grilled croaker fish and the seasoning was out of this world. Highly recommend OBIRI for dates and group hangouts!",
    date: "2 weeks ago",
    category: "Live Band",
    verified: true
  },
  {
    id: "rev-2",
    author: "Amara N.",
    rating: 4,
    text: "The palm wine here is the freshest I've had in Port Harcourt. Loved that they serve it in their custom OBIRI calabash! Food takes a bit on busy nights, but the music and vibe make it worth the wait.",
    date: "1 week ago",
    category: "Drinks",
    verified: true
  },
  {
    id: "rev-3",
    author: "Tunde A.",
    rating: 5,
    text: "Elegant dark-lounge design. Bush meat and Afang soup were delicious. The outdoor thatch hut seating with the tree in the middle is unique. The premium spot in New GRA to relax.",
    date: "3 days ago",
    category: "Food",
    verified: true
  },
  {
    id: "rev-4",
    author: "Ebenezer W.",
    rating: 4,
    text: "Loved the outdoor seating zone. Perfect cooling breeze. The cocktails are handcrafted and actually strong. Pool table area is also a great touch. 5 stars for the mixologist!",
    date: "4 days ago",
    category: "Vibe",
    verified: true
  }
];

// ============================================================
// GALLERY DATA
// ============================================================
const GALLERY_ITEMS = [
  { id: 1, category: "Vibe", title: "Outdoor Thatch Garden Lounge", url: "/image/obiri-outdoor-hut.png" },
  { id: 2, category: "Vibe", title: "Pool Table Lounge Area", url: "/image/obiri-poool.png" },
  { id: 3, category: "Drinks", title: "OBIRI Branded Calabash Palm Wine", url: "/image/obiri-calabash.png" },
  { id: 4, category: "Food", title: "Whole Grilled Croaker Special", url: "https://images.pexels.com/photos/35627599/pexels-photo-35627599.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: 5, category: "Drinks", title: "Signature Lounge Cocktails", url: "https://images.pexels.com/photos/33013697/pexels-photo-33013697.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: 6, category: "Events", title: "Live Band Friday Spotlight", url: "https://images.pexels.com/photos/9002000/pexels-photo-9002000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: 7, category: "Food", title: "Authentic Spicy Nkwobi", url: "/image/nkwobi.png" },
  { id: 8, category: "Vibe", title: "Illuminated Gold Bar Counter", url: "https://images.pexels.com/photos/26626726/pexels-photo-26626726.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: 9, category: "Food", title: "Sizzling Peppered Bush Meat", url: "https://images.pexels.com/photos/34624131/pexels-photo-34624131.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" },
  { id: 10, category: "Events", title: "Saturday Saxophone Sessions", url: "https://images.pexels.com/photos/8198205/pexels-photo-8198205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200" }
];

// ============================================================
// INSTAGRAM POSTS
// ============================================================
const IG_POSTS = [
  { likes: "1.2k", comments: 84, image: "/image/obiri-outdoor-hut.png", caption: "Our signature outdoor thatched garden lounge — the perfect tropical escape in New GRA. 🌿🌴" },
  { likes: "952", comments: 42, image: "/image/obiri-calabash.png", caption: "Fresh palm wine in our signature OBIRI calabash gourd with branded bamboo cups. 🥥✨" },
  { likes: "1.8k", comments: 110, image: "/image/obiri-poool.png", caption: "Pool, drinks, good vibes only. Bring your crew! 🎱💛" },
  { likes: "724", comments: 31, image: "https://images.pexels.com/photos/9002000/pexels-photo-9002000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200", caption: "Friday night live band coming alive! Reserve your front row table. 🎷🎶" }
];

// ============================================================
// GLOBAL STATE
// ============================================================
let cart = [];                 // Array of {item, quantity}
let serviceMode = "dine-in";   // dine-in | drive-thru | delivery
let selectedZone = "indoor";
let selectedEventDay = "fri";
let eventFormType = "song";    // song | birthday
let currentReviews = [];       // user reviews + initial reviews
let filteredGallery = GALLERY_ITEMS;
let lbIndex = 0;

// ============================================================
// DOM INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initHero();
  initFastService();
  initMenu();
  initEvents();
  initReservation();
  initReviews();
  initGallery();
  initInstagram();
  initContact();
  initCart();
  initFooter();
});

// ============================================================
// NAV / HEADER
// ============================================================
function initNav() {
  const header = document.getElementById("mainHeader");
  const mobileMenu = document.getElementById("mobileMenu");
  const openBtn = document.getElementById("mobileMenuToggle");
  const closeBtn = document.getElementById("closeMobileMenu");

  // Scroll effect on header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");

    // Highlight active nav link
    const sections = ["home", "about", "menu", "events", "reviews", "gallery", "contact"];
    const scrollY = window.scrollY + 120;
    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll(".nav-link, .mobile-link").forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
        break;
      }
    }
  });

  // Mobile menu open / close
  openBtn?.addEventListener("click", () => mobileMenu.classList.add("open"));
  closeBtn?.addEventListener("click", () => mobileMenu.classList.remove("open"));

  // Close on link click
  document.querySelectorAll(".mobile-link, .mobile-menu-footer a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

// ============================================================
// HERO — auto-rotating slideshow
// ============================================================
function initHero() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length === 0) return;
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 5500);
}

// ============================================================
// FAST SERVICE — live kitchen status simulator
// ============================================================
function initFastService() {
  const speedEl = document.getElementById("kitchenSpeed");
  const statusEl = document.getElementById("kitchenStatus");
  const barEl = document.getElementById("kitchenBar");
  if (!speedEl) return;

  setInterval(() => {
    const isFast = Math.random() > 0.4;
    const avg = isFast ? 12 + Math.floor(Math.random() * 4) : 16 + Math.floor(Math.random() * 4);
    speedEl.innerHTML = `${avg} <span>mins avg</span>`;
    statusEl.textContent = isFast ? "⚡ Optimal Speed" : "🟢 Smooth Flow";
    barEl.style.width = ((avg / 25) * 100) + "%";
  }, 8000);
}

// ============================================================
// MENU — render, filter, search, add to cart
// ============================================================
function initMenu() {
  const grid = document.getElementById("menuGrid");
  const tabs = document.querySelectorAll(".menu-tab");
  const searchInput = document.getElementById("menuSearch");
  let currentCategory = "all";
  let currentSearch = "";

  function render() {
    const filtered = MENU_ITEMS.filter(item => {
      const matchCat = currentCategory === "all" || item.category === currentCategory;
      const q = currentSearch.toLowerCase();
      const matchSearch = !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tags || []).some(t => t.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="menu-empty">No items found matching your filters. Try selecting another category.</div>`;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="menu-card">
        ${item.isPopular ? '<span class="menu-popular-badge">✨ Popular</span>' : ''}
        <div class="menu-card-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
          <span class="menu-prep-time">${item.prepTime}</span>
        </div>
        <div class="menu-card-body">
          <div>
            <div class="menu-card-head">
              <h3>${item.name}</h3>
              <span class="menu-price">${formatNaira(item.price)}</span>
            </div>
            ${item.tags ? `<div class="menu-tags">${item.tags.map(t => `<span class="menu-tag">${t}</span>`).join("")}</div>` : ""}
            <p class="menu-desc">${item.description}</p>
          </div>
          <div>
            ${item.spicyLevel !== undefined ? `
              <div class="menu-spice">
                <span class="menu-spice-label">Spice:</span>
                ${[0,1,2].map(i => `<span class="spice-flame ${i < item.spicyLevel ? 'active' : ''}">🔥</span>`).join("")}
              </div>
            ` : ""}
            <div class="menu-buttons">
              <button class="menu-btn menu-btn-add" data-add="${item.id}">+ Add to Cart</button>
              <button class="menu-btn menu-btn-buy" data-buy="${item.id}">Buy Now ↗</button>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    // Bind buttons
    grid.querySelectorAll("[data-add]").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = MENU_ITEMS.find(i => i.id === btn.dataset.add);
        addToCart(item);
      });
    });
    grid.querySelectorAll("[data-buy]").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = MENU_ITEMS.find(i => i.id === btn.dataset.buy);
        instantWhatsAppOrder(item);
      });
    });
  }

  // Tab clicks
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentCategory = tab.dataset.cat;
      render();
    });
  });

  // Search input
  searchInput?.addEventListener("input", e => {
    currentSearch = e.target.value;
    render();
  });

  render();
}

// ============================================================
// INSTANT WHATSAPP ORDER (single item)
// ============================================================
function instantWhatsAppOrder(item) {
  const message =
`Hello OBIRI Restaurant & Lounge! 👋

I would like to place a quick order:

🍽️ *${item.name}*
   • Quantity: 1
   • Price: ${formatNaira(item.price)}

📍 Service: Please confirm

Total: *${formatNaira(item.price)}*

Please confirm my order and let me know payment details. Thank you!`;

  sendToWhatsApp(message);
  showToast(`Opening WhatsApp to order "${item.name}"...`, "success");
}

// ============================================================
// CART SYSTEM
// ============================================================
function initCart() {
  const cartBackdrop = document.getElementById("cartBackdrop");
  const cartDrawer = document.getElementById("cartDrawer");
  const openBtn = document.getElementById("openCartBtn");
  const closeBtn = document.getElementById("closeCart");
  const floatOrder = document.getElementById("floatOrder");

  function openCart() {
    cartBackdrop.classList.add("open");
    cartDrawer.classList.add("open");
    renderCart();
  }
  function closeCart() {
    cartBackdrop.classList.remove("open");
    cartDrawer.classList.remove("open");
  }

  openBtn?.addEventListener("click", openCart);
  closeBtn?.addEventListener("click", closeCart);
  cartBackdrop?.addEventListener("click", closeCart);

  // Floating button — scrolls to menu; if cart has items, open cart instead
  floatOrder?.addEventListener("click", e => {
    if (cart.length > 0) {
      e.preventDefault();
      openCart();
    }
  });

  // Expose open globally
  window._openCart = openCart;
  window._closeCart = closeCart;

  renderCart();
}

function addToCart(item) {
  const existing = cart.find(c => c.item.id === item.id);
  if (existing) existing.quantity++;
  else cart.push({ item, quantity: 1 });
  updateCartBadges();
  renderCart();
  window._openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.item.id !== id);
  updateCartBadges();
  renderCart();
}

function updateQuantity(id, qty) {
  if (qty <= 0) return removeFromCart(id);
  const entry = cart.find(c => c.item.id === id);
  if (entry) entry.quantity = qty;
  updateCartBadges();
  renderCart();
}

function clearCart() {
  cart = [];
  updateCartBadges();
  renderCart();
}

function updateCartBadges() {
  const total = cart.reduce((sum, c) => sum + c.quantity, 0);
  const badge = document.getElementById("cartCountBadge");
  const floatCount = document.getElementById("floatCount");
  if (total > 0) {
    badge.textContent = total;
    badge.style.display = "flex";
    floatCount.textContent = total;
    floatCount.style.display = "inline-flex";
  } else {
    badge.style.display = "none";
    floatCount.style.display = "none";
  }
}

function renderCart() {
  const body = document.getElementById("cartBody");
  const foot = document.getElementById("cartFoot");
  const subtotalEl = document.getElementById("cartSubtotal");
  const grandTotalEl = document.getElementById("cartGrandTotal");
  const deliveryRow = document.getElementById("deliveryRow");

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-icon-big">🛒</div>
        <h4>Your cart is empty</h4>
        <p>Browse our local delicacies and drinks to add items to your order.</p>
      </div>
    `;
    foot.style.display = "none";
    return;
  }

  // Cart items HTML
  const itemsHtml = cart.map(c => `
    <div class="cart-item">
      <img src="${c.item.image}" alt="${c.item.name}" />
      <div class="cart-item-body">
        <div>
          <div class="cart-item-head">
            <div class="cart-item-name">${c.item.name}</div>
            <button class="cart-item-remove" data-remove="${c.item.id}" aria-label="Remove">🗑</button>
          </div>
          <div class="cart-item-price">${formatNaira(c.item.price)}</div>
        </div>
        <div class="cart-item-foot">
          <div class="qty-control">
            <button data-qty-dec="${c.item.id}">−</button>
            <span class="qty-num">${c.quantity}</span>
            <button data-qty-inc="${c.item.id}">+</button>
          </div>
          <div class="cart-item-total">${formatNaira(c.item.price * c.quantity)}</div>
        </div>
      </div>
    </div>
  `).join("");

  // Checkout form HTML
  const checkoutHtml = `
    <div class="checkout-section">
      <h3>Checkout Details</h3>

      <div class="form-group">
        <label>Your Name</label>
        <input type="text" id="cartName" placeholder="Enter your full name" required />
      </div>

      <div class="form-group">
        <label>Phone Number</label>
        <input type="tel" id="cartPhone" placeholder="e.g. 0803 123 4567" required />
      </div>

      <div class="form-group">
        <label>Service Mode</label>
        <div class="service-mode" id="serviceMode">
          <button type="button" class="service-btn ${serviceMode==='dine-in'?'active':''}" data-mode="dine-in">Dine In</button>
          <button type="button" class="service-btn ${serviceMode==='drive-thru'?'active':''}" data-mode="drive-thru">Drive Thru</button>
          <button type="button" class="service-btn ${serviceMode==='delivery'?'active':''}" data-mode="delivery">Delivery</button>
        </div>
      </div>

      <div class="form-group" id="addressGroup" style="display:${serviceMode==='delivery'?'flex':'none'};">
        <label>Delivery Address (GRA & surroundings)</label>
        <textarea id="cartAddress" rows="2" placeholder="Street name, building, apartment number"></textarea>
      </div>

      <div class="form-group">
        <label>Special Instructions (Optional)</label>
        <textarea id="cartNotes" rows="2" placeholder="e.g. Extra spicy, no onions, ice level..."></textarea>
      </div>

      <div class="cart-info-card">
        🛡️ Our Fast Service Promise applies. Meals are prepared fresh upon confirmation.
      </div>

      <button class="btn btn-whatsapp btn-block btn-lg" id="checkoutBtn">📤 Submit Order via WhatsApp</button>
    </div>
  `;

  body.innerHTML = itemsHtml + checkoutHtml;

  // Update footer totals
  const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const deliveryFee = serviceMode === "delivery" ? 2500 : 0;
  const grandTotal = subtotal + deliveryFee;
  subtotalEl.textContent = formatNaira(subtotal);
  grandTotalEl.textContent = formatNaira(grandTotal);
  deliveryRow.style.display = serviceMode === "delivery" ? "flex" : "none";
  foot.style.display = "flex";

  // Bind cart item buttons
  body.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.remove));
  });
  body.querySelectorAll("[data-qty-inc]").forEach(btn => {
    btn.addEventListener("click", () => {
      const entry = cart.find(c => c.item.id === btn.dataset.qtyInc);
      updateQuantity(entry.item.id, entry.quantity + 1);
    });
  });
  body.querySelectorAll("[data-qty-dec]").forEach(btn => {
    btn.addEventListener("click", () => {
      const entry = cart.find(c => c.item.id === btn.dataset.qtyDec);
      updateQuantity(entry.item.id, entry.quantity - 1);
    });
  });

  // Service mode buttons
  body.querySelectorAll(".service-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      serviceMode = btn.dataset.mode;
      renderCart();
    });
  });

  // Checkout button
  document.getElementById("checkoutBtn").addEventListener("click", handleCartCheckout);
}

// ============================================================
// CART CHECKOUT — sends formatted WhatsApp order
// ============================================================
function handleCartCheckout() {
  const name = document.getElementById("cartName").value.trim();
  const phone = document.getElementById("cartPhone").value.trim();
  const address = document.getElementById("cartAddress")?.value.trim() || "";
  const notes = document.getElementById("cartNotes").value.trim();

  // Validation
  if (!name) {
    showToast("Please enter your name to complete the order.", "error");
    document.getElementById("cartName").focus();
    return;
  }
  if (!phone) {
    showToast("Please enter your phone number.", "error");
    document.getElementById("cartPhone").focus();
    return;
  }
  if (serviceMode === "delivery" && !address) {
    showToast("Please enter your delivery address.", "error");
    document.getElementById("cartAddress").focus();
    return;
  }
  if (cart.length === 0) {
    showToast("Your cart is empty.", "error");
    return;
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const deliveryFee = serviceMode === "delivery" ? 2500 : 0;
  const grandTotal = subtotal + deliveryFee;

  // Build itemized list
  const itemsList = cart.map((c, i) =>
    `${i + 1}. *${c.item.name}*
   • Qty: ${c.quantity}
   • Unit Price: ${formatNaira(c.item.price)}
   • Subtotal: ${formatNaira(c.item.price * c.quantity)}`
  ).join("\n\n");

  // Service mode display
  const modeDisplay = {
    "dine-in": "🍽️ DINE-IN",
    "drive-thru": "🚗 DRIVE-THRU PICKUP",
    "delivery": "🛵 HOME DELIVERY"
  }[serviceMode];

  // Compose the WhatsApp message
  let message =
`🌴 *OBIRI RESTAURANT & LOUNGE ORDER* 🌴
━━━━━━━━━━━━━━━━━━━━━━

👤 *Customer:* ${name}
📞 *Phone:* ${phone}
${modeDisplay}
${serviceMode === "delivery" ? `📍 *Address:* ${address}\n` : ""}
━━━━━━━━━━━━━━━━━━━━━━
🍽️ *ORDER ITEMS:*

${itemsList}

━━━━━━━━━━━━━━━━━━━━━━
💰 *PAYMENT SUMMARY*

Subtotal: ${formatNaira(subtotal)}`;

  if (serviceMode === "delivery") {
    message += `\nDelivery Fee: ${formatNaira(deliveryFee)}`;
  }

  message += `\n*GRAND TOTAL: ${formatNaira(grandTotal)}*
━━━━━━━━━━━━━━━━━━━━━━
${notes ? `📝 *Special Instructions:*\n${notes}\n\n` : ""}Please confirm my order and share payment details.

Thank you! 🙏`;

  // Open WhatsApp
  sendToWhatsApp(message);
  showToast("Order sent to WhatsApp! ✓", "success");

  // Clear cart and close drawer after a moment
  setTimeout(() => {
    clearCart();
    window._closeCart();
  }, 800);
}

// ============================================================
// EVENTS / LIVE BAND
// ============================================================
function initEvents() {
  const tabs = document.querySelectorAll(".event-day-tab");
  const card = document.getElementById("eventCard");

  function renderEvent() {
    const ev = LIVE_EVENTS[selectedEventDay];
    card.innerHTML = `
      <div class="event-card-img">
        ${ev.isSpecial ? '<span class="event-special-badge">⭐ Special Weekly Event</span>' : ''}
        <img src="${ev.image}" alt="${ev.title}" />
        <div class="event-time-bar">
          <span class="gold">📅 ${ev.date}</span>
          <div class="event-time-sep"></div>
          <span>🕒 ${ev.time}</span>
        </div>
      </div>
      <div class="event-card-body">
        <div>
          <div class="event-artist">🎙 Performing Live: ${ev.artist}</div>
          <h3 class="event-title">${ev.title}</h3>
          <p class="event-desc">${ev.description}</p>
        </div>
        <div class="event-genre">
          <span class="label">Musical Genre</span>
          <span class="val">${ev.genre}</span>
        </div>
      </div>
    `;
  }

  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      selectedEventDay = t.dataset.event;
      renderEvent();
    });
  });

  // Event form type switcher
  document.querySelectorAll(".ev-switch").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".ev-switch").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      eventFormType = btn.dataset.type;
      document.getElementById("songFields").style.display = eventFormType === "song" ? "block" : "none";
      document.getElementById("birthdayFields").style.display = eventFormType === "birthday" ? "block" : "none";
    });
  });

  // Event form submission
  document.getElementById("eventForm").addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    if (!data.name?.trim()) { showToast("Please enter your name.", "error"); return; }

    const ev = LIVE_EVENTS[selectedEventDay];
    let message;
    if (eventFormType === "song") {
      if (!data.song?.trim()) { showToast("Please enter a song title.", "error"); return; }
      message =
`🎵 *SONG REQUEST — OBIRI Lounge*

Hi! My name is *${data.name}*.

I'll be at the *${ev.title}* (${ev.date}) and I'd love to request:

🎶 *Song:* ${data.song}
🎤 *Artist:* ${data.artist || "(any version)"}

Can the band play it? Thanks in advance! 🙏`;
    } else {
      if (!data.eventDate) { showToast("Please pick an event date.", "error"); return; }
      message =
`🎉 *BIRTHDAY / HANGOUT BOOKING — OBIRI Lounge*

Hi! My name is *${data.name}*.

I'd like to book the lounge for a celebration:

📅 *Date:* ${data.eventDate}
👥 *Guests:* ${data.partySize} People
🎊 *Type:* Birthday / Hangout

Please share packages and confirm availability. Thanks!`;
    }

    sendToWhatsApp(message);
    showToast("Opening WhatsApp...", "success");
    form.reset();
  });

  renderEvent();
}

// ============================================================
// RESERVATION
// ============================================================
function initReservation() {
  // Zone selector
  document.querySelectorAll(".zone-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".zone-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedZone = btn.dataset.zone;
      document.getElementById("zoneInput").value = selectedZone;
    });
  });

  // Form submission
  document.getElementById("reservationForm").addEventListener("submit", e => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));

    if (!data.name?.trim()) { showToast("Please enter your name.", "error"); return; }
    if (!data.phone?.trim()) { showToast("Please enter your phone number.", "error"); return; }
    if (!data.date) { showToast("Please pick a booking date.", "error"); return; }
    if (!data.time) { showToast("Please pick a time.", "error"); return; }

    // Generate booking ref
    const ref = "OBR-" + Math.floor(100000 + Math.random() * 900000);

    const zoneNames = {
      "indoor": "Cozy Indoor Lounge",
      "outdoor": "Outdoor Garden",
      "vip": "VIP Lounge Area",
      "live-band-front": "Live Band Front Row"
    };

    // Show confirmation modal
    const modal = document.getElementById("resModal");
    const details = document.getElementById("resDetails");
    details.innerHTML = `
      <div class="row ref-row">
        <span class="label">Ref Code</span>
        <span class="val gold">${ref}</span>
      </div>
      <div class="row"><span class="label">Name</span><span class="val">${data.name}</span></div>
      <div class="row"><span class="label">Phone</span><span class="val">${data.phone}</span></div>
      <div class="row"><span class="label">Date &amp; Time</span><span class="val">${data.date} @ ${data.time}</span></div>
      <div class="row"><span class="label">Guests</span><span class="val">${data.guests} ${data.guests == 1 ? "Person" : "People"}</span></div>
      <div class="row"><span class="label">Seating</span><span class="val gold">${zoneNames[selectedZone]}</span></div>
      ${data.occasion ? `<div class="row"><span class="label">Occasion</span><span class="val">${data.occasion}</span></div>` : ""}
    `;
    modal.style.display = "flex";

    // Build WhatsApp confirmation message
    const message =
`🌴 *OBIRI TABLE RESERVATION* 🌴
━━━━━━━━━━━━━━━━━━━━━━

📋 *Booking Reference:* ${ref}

👤 *Name:* ${data.name}
📞 *Phone:* ${data.phone}
📅 *Date:* ${data.date}
🕒 *Time:* ${data.time}
👥 *Guests:* ${data.guests} ${data.guests == 1 ? "Person" : "People"}
🪑 *Seating:* ${zoneNames[selectedZone]}
${data.occasion ? `✨ *Occasion:* ${data.occasion}\n` : ""}${data.notes?.trim() ? `\n📝 *Special Requests:*\n${data.notes}\n` : ""}
━━━━━━━━━━━━━━━━━━━━━━
Please confirm my reservation.

Thank you! 🙏`;

    // Button: send to WhatsApp
    const waBtn = document.getElementById("resWaBtn");
    waBtn.onclick = () => {
      sendToWhatsApp(message);
      modal.style.display = "none";
      form.reset();
      showToast("Reservation sent to WhatsApp! ✓", "success");
    };

    document.getElementById("resCloseBtn").onclick = () => {
      modal.style.display = "none";
      form.reset();
    };
  });
}

// ============================================================
// REVIEWS — render, write, save to localStorage
// ============================================================
function initReviews() {
  // Load saved reviews
  let saved = [];
  try {
    const raw = localStorage.getItem("obiri_reviews");
    if (raw) saved = JSON.parse(raw);
  } catch (e) { saved = []; }
  currentReviews = [...saved, ...INITIAL_REVIEWS];

  renderReviews();

  // Star picker
  const stars = document.querySelectorAll("#starPicker .star");
  let pickedRating = 5;
  stars.forEach(star => {
    star.addEventListener("click", () => {
      pickedRating = parseInt(star.dataset.val);
      stars.forEach(s => {
        const v = parseInt(s.dataset.val);
        s.classList.toggle("active", v <= pickedRating);
      });
      document.getElementById("ratingInput").value = pickedRating;
    });
    star.addEventListener("mouseenter", () => {
      const v = parseInt(star.dataset.val);
      stars.forEach(s => s.classList.toggle("active", parseInt(s.dataset.val) <= v));
    });
  });
  document.getElementById("starPicker")?.addEventListener("mouseleave", () => {
    stars.forEach(s => s.classList.toggle("active", parseInt(s.dataset.val) <= pickedRating));
  });

  // Write Review toggle
  const formWrap = document.getElementById("reviewFormWrap");
  document.getElementById("writeReviewBtn").addEventListener("click", () => {
    const showing = formWrap.style.display !== "none";
    formWrap.style.display = showing ? "none" : "block";
    if (!showing) formWrap.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  // Cancel
  document.getElementById("cancelReview").addEventListener("click", () => {
    formWrap.style.display = "none";
  });

  // Submit review
  document.getElementById("reviewForm").addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.author?.trim() || !data.text?.trim()) {
      showToast("Please fill all fields.", "error");
      return;
    }

    const newRev = {
      id: "rev-user-" + Date.now(),
      author: data.author,
      rating: parseInt(data.rating),
      text: data.text,
      date: "Just now",
      category: data.category,
      verified: false
    };

    // Save user reviews only
    let saved = [];
    try { saved = JSON.parse(localStorage.getItem("obiri_reviews") || "[]"); } catch {}
    saved.unshift(newRev);
    localStorage.setItem("obiri_reviews", JSON.stringify(saved));

    currentReviews = [newRev, ...currentReviews];
    renderReviews();
    e.target.reset();
    pickedRating = 5;
    stars.forEach(s => s.classList.add("active"));
    formWrap.style.display = "none";
    showToast("Thank you! Your review has been submitted. ✓", "success");
  });
}

function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  grid.innerHTML = currentReviews.map(r => `
    <div class="review-card">
      <div class="rc-head">
        <div class="rc-user">
          <div class="rc-avatar">${r.author.charAt(0).toUpperCase()}</div>
          <div>
            <div class="rc-name">${r.author}</div>
            <div class="rc-date">${r.date}</div>
          </div>
        </div>
        ${r.category ? `<span class="rc-category">✨ ${r.category}</span>` : ""}
      </div>
      <div class="rc-stars">
        ${Array.from({length: 5}, (_, i) => i < r.rating ? "★" : '<span class="empty">★</span>').join("")}
      </div>
      <p class="rc-text">"${r.text}"</p>
      ${r.verified ? `
        <div class="rc-verified">
          <span class="check-emerald">💬 Verified Guest</span>
          <span class="gray">100% Real Feedback</span>
        </div>` : ""}
    </div>
  `).join("");
}

// ============================================================
// GALLERY + LIGHTBOX
// ============================================================
function initGallery() {
  const grid = document.getElementById("galleryGrid");
  const tabs = document.querySelectorAll(".gal-tab");
  let currentCat = "All";

  function renderGallery() {
    filteredGallery = currentCat === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(i => i.category === currentCat);

    grid.innerHTML = filteredGallery.map((item, i) => `
      <div class="gal-item" data-index="${i}">
        <img src="${item.url}" alt="${item.title}" loading="lazy" />
        <div class="gal-overlay">
          <span class="gal-cat">${item.category}</span>
          <div class="gal-info">
            <h4>${item.title}</h4>
            <span class="zoom">🔍 Zoom Preview</span>
          </div>
        </div>
      </div>
    `).join("");

    grid.querySelectorAll(".gal-item").forEach(it => {
      it.addEventListener("click", () => openLightbox(parseInt(it.dataset.index)));
    });
  }

  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      currentCat = t.dataset.cat;
      renderGallery();
    });
  });

  renderGallery();

  // Lightbox controls
  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", () => navigateLightbox(-1));
  document.getElementById("lbNext").addEventListener("click", () => navigateLightbox(1));
  document.getElementById("lightbox").addEventListener("click", e => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (document.getElementById("lightbox").style.display === "none") return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

function openLightbox(index) {
  lbIndex = index;
  updateLightbox();
  document.getElementById("lightbox").style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
  document.body.style.overflow = "";
}

function navigateLightbox(dir) {
  lbIndex = (lbIndex + dir + filteredGallery.length) % filteredGallery.length;
  updateLightbox();
}

function updateLightbox() {
  const item = filteredGallery[lbIndex];
  document.getElementById("lbImage").src = item.url;
  document.getElementById("lbImage").alt = item.title;
  document.getElementById("lbCat").textContent = item.category;
  document.getElementById("lbTitle").textContent = item.title;
  document.getElementById("lbCounter").textContent = `${lbIndex + 1} / ${filteredGallery.length}`;
}

// ============================================================
// INSTAGRAM GRID
// ============================================================
function initInstagram() {
  const grid = document.getElementById("igGrid");
  grid.innerHTML = IG_POSTS.map(p => `
    <a class="ig-item" href="https://www.instagram.com/obiri_restaurant_lounge" target="_blank" rel="noopener">
      <img src="${p.image}" alt="Instagram post" loading="lazy" />
      <div class="ig-overlay">
        <div class="ig-stats">
          <span>❤ ${p.likes}</span>
          <span>💬 ${p.comments}</span>
        </div>
        <p class="ig-caption">${p.caption}</p>
      </div>
    </a>
  `).join("");
}

// ============================================================
// CONTACT FORM — sends to WhatsApp
// ============================================================
function initContact() {
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name?.trim() || !data.message?.trim()) {
      showToast("Please fill Name and Message.", "error");
      return;
    }

    const message =
`Hello OBIRI Restaurant & Lounge! 👋

My name is *${data.name}*.${data.phone ? `\nMy phone: ${data.phone}` : ""}

I want to make an inquiry:

${data.message}

Thank you!`;

    sendToWhatsApp(message);
    showToast("Inquiry sent to WhatsApp! ✓", "success");
    form.reset();
  });
}

// ============================================================
// FOOTER YEAR
// ============================================================
function initFooter() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// TOAST NOTIFICATION
// ============================================================
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast " + type;
  toast.style.display = "block";
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 3500);
}

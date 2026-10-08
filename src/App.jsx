/**
 * ==========================================
 * 🐼 CAFE PANDA OFFICIAL PRODUCTION CODE 🐼
 * 💻 DESIGNED & DEVELOPED BY: MANISHA BONTHU
 * 🏢 LOCATION: AMALAPURAM, ANDHRA PRADESH
 * 📅 YEAR: 2026 | ALL RIGHTS RESERVED
 * ==========================================
 */

import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

// ─────────────────────────────────────────────────────────────────
//  FULL MENU DATABASE WITH INGREDIENT METADATA
// ─────────────────────────────────────────────────────────────────
const MENU_DATA = [
  // QUICK BITES
  { id: 'qb1', category: 'QUICK BITES', name: 'Funky Fries (Plain)', price: 60, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Crispy golden fries seasoned with sea salt, served piping hot.', ingredients: ['Potatoes', 'Sunflower Oil', 'Sea Salt', 'Mixed Herbs'], calories: '280 kcal', prepTime: '8 mins' },
  { id: 'qb2', category: 'QUICK BITES', name: 'Salted Fries', price: 80, isVeg: true, image: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=600&q=80', description: 'Classic thin-cut fries with a perfect salt coating.', ingredients: ['Potatoes', 'Salt', 'Refined Oil', 'Pepper'], calories: '300 kcal', prepTime: '8 mins' },
  { id: 'qb3', category: 'QUICK BITES', name: 'Peri Peri Fries', price: 99, isVeg: true, image: '/images/peri-peri-fries.png', description: 'Spicy peri-peri dusted fries with a fiery African chilli kick.', ingredients: ['Potatoes', 'Peri Peri Masala', 'Paprika', 'Garlic Powder', 'Oil'], calories: '340 kcal', prepTime: '10 mins' },
  { id: 'qb4', category: 'QUICK BITES', name: 'Garlic Pops (15 pcs)', price: 99, isVeg: true, image: '/images/garlic-pops.png', description: 'Bite-sized garlic-flavoured corn pops, perfectly crunchy.', ingredients: ['Corn', 'Garlic Butter', 'Parsley', 'Salt', 'Oil'], calories: '310 kcal', prepTime: '12 mins' },
  { id: 'qb5', category: 'QUICK BITES', name: 'Veg Nuggets (10 pcs)', price: 99, isVeg: true, image: '/images/veg-nuggets.png', description: 'Golden-crumbed vegetable nuggets with a soft veggie core.', ingredients: ['Mixed Vegetables', 'Breadcrumbs', 'Corn Starch', 'Spices', 'Oil'], calories: '320 kcal', prepTime: '12 mins' },
  { id: 'qb6', category: 'QUICK BITES', name: 'Corn Rolls (5 pcs)', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80', description: 'Crispy pastry rolls stuffed with spiced sweet corn filling.', ingredients: ['Sweet Corn', 'Spring Roll Sheet', 'Green Chilli', 'Cumin', 'Cheese'], calories: '290 kcal', prepTime: '14 mins' },
  { id: 'qb7', category: 'QUICK BITES', name: 'Onion Rings (5 pcs)', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80', description: 'Battered and fried thick onion rings with a crispy golden coat.', ingredients: ['Onions', 'All-Purpose Flour', 'Buttermilk', 'Paprika', 'Salt'], calories: '260 kcal', prepTime: '10 mins' },
  { id: 'qb8', category: 'QUICK BITES', name: 'Veg Lollipops (5 pcs)', price: 99, isVeg: true, image: '/images/veg-lollipops.png', description: 'Fun stick-mounted veggie lollipops coated in tangy sauce.', ingredients: ['Mixed Veggies', 'Cornflour', 'Soy Sauce', 'Ginger-Garlic', 'Chilli Sauce'], calories: '280 kcal', prepTime: '15 mins' },
  // NON-VEG SNACKATORY
  { id: 'nv1', category: 'NON-VEG SNACKATORY', name: 'Chicken Nuggets (6 pcs)', price: 99, isVeg: false, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80', description: 'Juicy chicken nuggets with a crunchy breadcrumb coating.', ingredients: ['Chicken Breast', 'Breadcrumbs', 'Egg', 'Garlic', 'Mixed Spices'], calories: '380 kcal', prepTime: '12 mins' },
  { id: 'nv2', category: 'NON-VEG SNACKATORY', name: 'Chicken Fingers (4 pcs)', price: 99, isVeg: false, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80', description: 'Tender strips of marinated chicken, crispy on the outside.', ingredients: ['Chicken Strips', 'Buttermilk', 'Seasoned Flour', 'Paprika', 'Oil'], calories: '360 kcal', prepTime: '14 mins' },
  { id: 'nv3', category: 'NON-VEG SNACKATORY', name: 'Chicken Popcorn (15 pcs)', price: 99, isVeg: false, image: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80', description: 'Bite-sized popcorn chicken with a light crispy batter.', ingredients: ['Chicken Thighs', 'Cornflour', 'Hot Sauce', 'Garlic Powder', 'Oil'], calories: '420 kcal', prepTime: '15 mins' },
  { id: 'nv4', category: 'NON-VEG SNACKATORY', name: 'Chicken Loaded French Fries', price: 199, isVeg: false, image: '/images/chicken-loaded-fries.png', description: 'Fries loaded with spiced chicken, melted cheese and jalapenos.', ingredients: ['Fries', 'Chicken Pieces', 'Cheddar Cheese', 'Jalapenos', 'Sour Cream', 'Spring Onion'], calories: '620 kcal', prepTime: '18 mins' },
  // MOMO MAMA
  { id: 'm1', category: 'MOMO MAMA (5 Pcs)', name: 'Classic Fried Momos', price: 110, isVeg: true, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&q=80', description: 'Pan-fried dumplings with a crispy base and juicy veggie filling.', ingredients: ['Maida', 'Cabbage', 'Carrot', 'Ginger', 'Garlic', 'Soy Sauce'], calories: '320 kcal', prepTime: '15 mins' },
  { id: 'm2', category: 'MOMO MAMA (5 Pcs)', name: 'Classic Veg Steamed Momos', price: 110, isVeg: true, image: 'https://images.unsplash.com/photo-1626714853040-a5a85ccd52a3?w=600&q=80', description: 'Soft steamed momos stuffed with fresh vegetables.', ingredients: ['Maida', 'Cabbage', 'Spring Onion', 'Carrot', 'Pepper', 'Sesame Oil'], calories: '280 kcal', prepTime: '18 mins' },
  { id: 'm3', category: 'MOMO MAMA (5 Pcs)', name: 'Schezwan Pan-Fried Momos', price: 120, isVeg: true, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&q=80', description: 'Momos tossed in fiery Schezwan sauce after pan-frying.', ingredients: ['Maida', 'Mixed Veggies', 'Schezwan Sauce', 'Sesame', 'Chilli Oil'], calories: '350 kcal', prepTime: '20 mins' },
  // VEG PIZZA
  { id: 'vp1', category: 'VEG PIZZA', name: 'Classic Margherita Pizza', price: 199, isVeg: true, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80', description: 'Timeless Margherita with hand-crushed tomato base and fresh mozzarella.', ingredients: ['Pizza Dough', 'Tomato Sauce', 'Fresh Mozzarella', 'Basil', 'Olive Oil'], calories: '520 kcal', prepTime: '20 mins' },
  { id: 'vp2', category: 'VEG PIZZA', name: 'Creamy Golden Corn Pizza', price: 209, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Sweet corn on a creamy white sauce base with mozzarella drizzle.', ingredients: ['Pizza Base', 'White Sauce', 'Sweet Corn', 'Mozzarella', 'Bell Pepper', 'Oregano'], calories: '560 kcal', prepTime: '22 mins' },
  { id: 'vp3', category: 'VEG PIZZA', name: 'Peppy Paneer Pizza', price: 209, isVeg: true, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80', description: 'Spiced paneer cubes on a tangy tomato base with cheddar melt.', ingredients: ['Pizza Base', 'Tomato Sauce', 'Paneer', 'Onion', 'Capsicum', 'Cheddar'], calories: '590 kcal', prepTime: '22 mins' },
  { id: 'vp4', category: 'VEG PIZZA', name: 'Peri Peri Paneer Pizza', price: 219, isVeg: true, image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&q=80', description: 'Paneer marinated in peri-peri sauce on a spicy tomato base.', ingredients: ['Pizza Base', 'Peri Peri Sauce', 'Paneer', 'Red Onion', 'Mozzarella', 'Parsley'], calories: '610 kcal', prepTime: '22 mins' },
  { id: 'vp5', category: 'VEG PIZZA', name: 'BBQ Corn Pizza', price: 219, isVeg: true, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&q=80', description: 'Smoky BBQ base with sweet corn, onions and double cheese.', ingredients: ['Pizza Base', 'BBQ Sauce', 'Sweet Corn', 'Onion', 'Mozzarella', 'Gouda', 'Smoked Paprika'], calories: '620 kcal', prepTime: '24 mins' },
  // BURGER MAFIA
  { id: 'b1', category: 'BURGER MAFIA', name: 'Veg Patty Burger', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Crispy veggie patty with fresh lettuce, tomato and burger sauce.', ingredients: ['Brioche Bun', 'Veg Patty', 'Lettuce', 'Tomato', 'Onion', 'Burger Sauce'], calories: '410 kcal', prepTime: '12 mins' },
  { id: 'b2', category: 'BURGER MAFIA', name: 'Cheesy Veg Patty Burger', price: 119, isVeg: true, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80', description: 'Veg burger loaded with melted American cheese slice.', ingredients: ['Brioche Bun', 'Veg Patty', 'American Cheese', 'Lettuce', 'Pickles', 'Mustard'], calories: '460 kcal', prepTime: '13 mins' },
  { id: 'b3', category: 'BURGER MAFIA', name: 'Mayo Loaded Veg Burger', price: 129, isVeg: true, image: 'https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99?w=600&q=80', description: 'Generous mayo drizzle with crispy veg patty and coleslaw.', ingredients: ['Sesame Bun', 'Veg Patty', 'Mayonnaise', 'Coleslaw', 'Jalapenos', 'Tomato'], calories: '490 kcal', prepTime: '13 mins' },
  { id: 'b6', category: 'BURGER MAFIA', name: 'Chicken Patty Burger', price: 119, isVeg: false, image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=80', description: 'Juicy grilled chicken patty with house sauce and fresh veggies.', ingredients: ['Brioche Bun', 'Chicken Patty', 'Lettuce', 'Tomato', 'Onion', 'Burger Sauce'], calories: '480 kcal', prepTime: '15 mins' },
  { id: 'b7', category: 'BURGER MAFIA', name: 'Cheesy Chicken Patty Burger', price: 139, isVeg: false, image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80', description: 'Crispy chicken patty with double cheese and signature sauce.', ingredients: ['Brioche Bun', 'Chicken Patty', 'Double Cheese', 'Pickles', 'Special Sauce', 'Cabbage'], calories: '530 kcal', prepTime: '16 mins' },
  // BOBA COLD COFFEE
  { id: 'bc1', category: 'BOBA COLD COFFEE', name: 'Boba Pearl Cold Coffee', price: 130, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Creamy cold coffee topped with chewy tapioca boba pearls.', ingredients: ['Cold Brew Coffee', 'Milk', 'Sugar Syrup', 'Tapioca Pearls', 'Ice', 'Cream'], calories: '290 kcal', prepTime: '8 mins' },
  { id: 'bc2', category: 'BOBA COLD COFFEE', name: 'Double Shot Boba C.C', price: 140, isVeg: true, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', description: 'Extra strong double espresso shot cold coffee with boba.', ingredients: ['Double Espresso', 'Milk', 'Brown Sugar Syrup', 'Boba Pearls', 'Ice'], calories: '310 kcal', prepTime: '10 mins' },
  { id: 'bc3', category: 'BOBA COLD COFFEE', name: 'Choco Boba C.C', price: 140, isVeg: true, image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&q=80', description: 'Chocolate-swirled cold coffee with chewy boba pearls.', ingredients: ['Espresso', 'Chocolate Sauce', 'Milk', 'Boba Pearls', 'Ice', 'Whipped Cream'], calories: '340 kcal', prepTime: '10 mins' },
  // MILKSHAKES & BOBA
  { id: 'ms1', category: 'MILKSHAKES & BOBA', name: 'Vanilla Snow Milkshake', price: 100, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Classic vanilla milkshake blended to a velvety smooth finish.', ingredients: ['Vanilla Ice Cream', 'Full-Fat Milk', 'Vanilla Extract', 'Sugar', 'Whipped Cream'], calories: '380 kcal', prepTime: '5 mins' },
  { id: 'ms2', category: 'MILKSHAKES & BOBA', name: 'Strawberry Shake', price: 110, isVeg: true, image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80', description: 'Fresh strawberry blended with ice cream for a fruity delight.', ingredients: ['Strawberries', 'Strawberry Ice Cream', 'Milk', 'Sugar Syrup', 'Whipped Cream'], calories: '360 kcal', prepTime: '5 mins' },
  { id: 'ms3', category: 'MILKSHAKES & BOBA', name: 'Oreo Vanilla Thickshake', price: 120, isVeg: true, image: 'https://images.unsplash.com/photo-1616688085827-1c62b4671cf9?w=600&q=80', description: 'Thick Oreo-crumbled shake with vanilla base and cookie crunch.', ingredients: ['Oreo Cookies', 'Vanilla Ice Cream', 'Milk', 'Cream', 'Chocolate Sauce'], calories: '480 kcal', prepTime: '7 mins' },
  // MOCKTAILS & MOJITOS
  { id: 'mo1', category: 'MOCKTAILS & MOJITOS', name: 'Blue Margarita Mocktail', price: 80, isVeg: true, image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=600&q=80', description: 'Vibrant blue curacao-inspired mocktail with a citrus salt rim.', ingredients: ['Blue Curacao Syrup', 'Lime Juice', 'Soda Water', 'Salt Rim', 'Ice', 'Orange Slice'], calories: '120 kcal', prepTime: '5 mins' },
  { id: 'mo2', category: 'MOCKTAILS & MOJITOS', name: 'Mint Blast Mojito', price: 80, isVeg: true, image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80', description: 'Refreshing classic mojito with crushed mint and lime fizz.', ingredients: ['Fresh Mint', 'Lime', 'Sugar', 'Soda Water', 'Ice', 'Lime Zest'], calories: '100 kcal', prepTime: '5 mins' },
  // DESSERTS & CHOCOLATES
  { id: 'd1', category: 'DESSERTS & CHOCOLATES', name: 'Hot Choco Brownie', price: 90, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Warm fudgy brownie with gooey chocolate centre, served hot.', ingredients: ['Dark Chocolate', 'Butter', 'Sugar', 'Eggs', 'Flour', 'Vanilla', 'Cocoa'], calories: '420 kcal', prepTime: '10 mins' },
  { id: 'd2', category: 'DESSERTS & CHOCOLATES', name: 'Choco Brownie with Ice Cream', price: 125, isVeg: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80', description: 'Fudgy brownie topped with a scoop of vanilla ice cream.', ingredients: ['Brownie', 'Vanilla Ice Cream', 'Chocolate Sauce', 'Nuts', 'Whipped Cream'], calories: '580 kcal', prepTime: '10 mins' },
  { id: 'd4', category: 'DESSERTS & CHOCOLATES', name: 'Classic Cream Kunafa', price: 299, isVeg: true, image: 'https://images.unsplash.com/photo-1656268164012-119304af0c69?w=600&q=80', description: 'Traditional Middle-Eastern Kunafa with cream filling and sugar syrup.', ingredients: ['Kataifi Pastry', 'Ashta Cream', 'Sugar Syrup', 'Rose Water', 'Pistachios', 'Ghee'], calories: '560 kcal', prepTime: '20 mins' },
  { id: 'd5', category: 'DESSERTS & CHOCOLATES', name: 'Dubai Kunafa Chocolate Bar', price: 170, isVeg: true, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=600&q=80', description: 'Viral Dubai-style chocolate bar with Kunafa and pistachio filling.', ingredients: ['Dark Chocolate', 'Kataifi', 'Pistachio Paste', 'Tahini', 'Butter'], calories: '490 kcal', prepTime: '15 mins' },
  { id: 'd6', category: 'DESSERTS & CHOCOLATES', name: 'Choco Crunch Magic Cookie', price: 60, isVeg: true, image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80', description: 'Crunchy chocolate chip cookie with a gooey soft centre.', ingredients: ['Butter', 'Brown Sugar', 'Flour', 'Chocolate Chips', 'Vanilla', 'Egg', 'Baking Soda'], calories: '280 kcal', prepTime: '8 mins' },
];

const DELIVERY_FEE = 50;
const MIN_ORDER = 190;
const INITIAL_LOAD = 10;
const LOAD_MORE_STEP = 10;
const OWNER_PASS = 'panda07';
const WA1 = '919493189333';
const WA2 = '918106470310';
const ORDER_STAGES = ['Order Accepted', 'Cooking', 'On Delivery', 'Delivered Successfully'];
const ALL_CATEGORIES = [...new Set(MENU_DATA.map(i => i.category))];
const CAT_EMOJI = {
  'QUICK BITES': '🍟', 'NON-VEG SNACKATORY': '🍗', 'MOMO MAMA (5 Pcs)': '🥟',
  'VEG PIZZA': '🍕', 'BURGER MAFIA': '🍔', 'BOBA COLD COFFEE': '☕',
  'MILKSHAKES & BOBA': '🥤', 'MOCKTAILS & MOJITOS': '🍹', 'DESSERTS & CHOCOLATES': '🍫',
};

// ─── Inline style helpers ───────────────────────────────────────
const S = {
  input: {
    width: '100%', padding: '11px 14px',
    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 10, color: '#e8e8e8', fontSize: 13, outline: 'none', fontFamily: 'Outfit, sans-serif',
  },
  label: { fontSize: 12, color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 6 },
  btn: {
    width: '100%', padding: '13px', borderRadius: 12, border: 'none',
    background: 'linear-gradient(135deg,#4ecca3,#38b2ac)',
    color: '#0f172a', fontWeight: 900, fontSize: 14, cursor: 'pointer', fontFamily: 'Outfit, sans-serif',
  },
  qtyBtn: {
    width: 28, height: 28, borderRadius: '50%', border: '1px solid rgba(78,204,163,0.35)',
    background: 'rgba(78,204,163,0.12)', color: '#4ecca3', fontSize: 16, fontWeight: 700,
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Outfit, sans-serif',
  },
};

// ═══════════════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════════════
export default function App() {
  const [activeCat, setActiveCat] = useState('ALL');
  const [searchQ, setSearchQ] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isCafeOpen, setIsCafeOpen] = useState(true);
  const [orderStage, setOrderStage] = useState('');
  const [recentOrders, setRecentOrders] = useState([]);

  // Checkout
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddr, setCustAddr] = useState('');
  const [distance, setDistance] = useState(2);
  const [payMode, setPayMode] = useState('COD');

  // Owner
  const [isOwnerMode, setIsOwnerMode] = useState(false);
  const [ownerPwd, setOwnerPwd] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [dynamicMenu, setDynamicMenu] = useState([...MENU_DATA]);
  const [ownerTab, setOwnerTab] = useState('status');
  const [newItemForm, setNewItemForm] = useState({ name: '', price: '', category: ALL_CATEGORIES[0] });
  const [priceEdit, setPriceEdit] = useState({ id: '', newPrice: '' });
  const [branches, setBranches] = useState([{ id: 1, name: 'Cafe Panda – Amalapuram', address: 'Main Road, Amalapuram, AP – 533201' }]);
  const [newBranch, setNewBranch] = useState({ name: '', address: '' });
  const [cafeAddress, setCafeAddress] = useState('Main Road, Amalapuram, Andhra Pradesh – 533201');
  const [newAddress, setNewAddress] = useState('');
  const [liveOrders, setLiveOrders] = useState([]);

  useEffect(() => {
    if (window.location.pathname === '/owner' || window.location.hash === '#owner') setIsOwnerMode(true);
    window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); setDeferredPrompt(e); });
    const s = localStorage.getItem('panda_orders'); if (s) setRecentOrders(JSON.parse(s));
    const lo = localStorage.getItem('panda_live_orders'); if (lo) setLiveOrders(JSON.parse(lo));
  }, []);

  // ── Filtered + paginated items ──
  const filtered = dynamicMenu.filter(it => {
    const mc = activeCat === 'ALL' || it.category === activeCat;
    const ms = it.name.toLowerCase().includes(searchQ.toLowerCase());
    return mc && ms;
  });
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // ── Cart helpers ──
  const cartCount = () => cart.reduce((s, i) => s + i.qty, 0);
  const cartSubtotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartTotal = () => cartSubtotal() + DELIVERY_FEE;

  const addToCart = (item) => {
    if (!isCafeOpen) { alert('🐼 Cafe is currently closed!'); return; }
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const changeQty = (id, d) => setCart(prev => prev.map(c => c.id === id ? { ...c, qty: Math.max(0, c.qty + d) } : c).filter(c => c.qty > 0));
  const removeItem = (id) => setCart(prev => prev.filter(c => c.id !== id));

  // ── PWA install ──
  const handleInstall = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); await deferredPrompt.userChoice; setDeferredPrompt(null); }
    else alert('💡 Browser లో "Add to Home Screen" option use చేయి భయ్యా!');
  };

  // ── Owner login ──
  const handleOwnerLogin = (e) => {
    e.preventDefault();
    if (ownerPwd === OWNER_PASS) setIsAuthorized(true);
    else alert('⚠️ తప్పు పాస్‌వర్డ్ భయ్యా!');
  };

  // ── WhatsApp Order ──
  const triggerWhatsAppOrder = () => {
    if (!isCafeOpen) { alert('🐼 Cafe is closed!'); return; }
    if (cart.length === 0) { alert('⚠️ Cart ఖాళీగా ఉంది!'); return; }
    if (cartSubtotal() < MIN_ORDER) { alert('⚠️ భయ్యా! కనీసం ₹190+ ఐటమ్స్ యాడ్ చేయాలి!'); return; }
    if (!custName.trim() || !custPhone.trim() || !custAddr.trim()) { alert('⚠️ అన్ని details నింపేయ్ భయ్యా!'); return; }
    if (distance > 7) {
      alert('Delivery is unavailable for distances exceeding 7 Kms. Please contact the cafe directly for special arrangements.');
      return;
    }
    const payLabel = payMode === 'COD' ? '💵 Cash on Delivery (COD)' : '📱 Online Payment (PhonePe/GPay)';
    let msg = `🐼 *Cafe Panda Official Order!*\n\n`;
    msg += `👤 *Name:* ${custName}\n📞 *Phone:* ${custPhone}\n📍 *Address:* ${custAddr}\n🚗 *Distance:* ${distance} Kms\n💳 *Payment:* ${payLabel}\n\n`;
    msg += `🛍 *Order Items:*\n`;
    cart.forEach((it, i) => { msg += `  ${i + 1}. ${it.qty}x ${it.name} — ₹${it.price * it.qty}\n`; });
    msg += `\n━━━━━━━━━━━━━━━━\n🧾 Subtotal: ₹${cartSubtotal()}\n🚚 Delivery: ₹${DELIVERY_FEE}\n💰 *TOTAL: ₹${cartTotal()}*\n━━━━━━━━━━━━━━━━\n`;
    msg += `⏰ ${new Date().toLocaleString('en-IN')}\n🙏 Thank you! 🐼`;
    const enc = encodeURIComponent(msg);
    const order = { id: Date.now(), items: [...cart], subtotal: cartSubtotal(), total: cartTotal(), payMode: payLabel, stage: 0, date: new Date().toLocaleString('en-IN'), customer: custName };
    const updOrders = [order, ...recentOrders]; setRecentOrders(updOrders); localStorage.setItem('panda_orders', JSON.stringify(updOrders));
    const updLive = [order, ...liveOrders]; setLiveOrders(updLive); localStorage.setItem('panda_live_orders', JSON.stringify(updLive));
    setOrderStage('Order Placed Successfully! ✅');
    window.open(`https://wa.me/${WA1}?text=${enc}`, '_blank');
    setTimeout(() => window.open(`https://wa.me/${WA2}?text=${enc}`, '_blank'), 1200);
    setCart([]); setIsCartOpen(false);
  };

  // ══════════ OWNER GATE ══════════
  if (isOwnerMode && !isAuthorized) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0f172a,#1e293b)', fontFamily: 'Outfit, sans-serif' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(78,204,163,0.3)', borderRadius: 24, padding: '48px 32px', maxWidth: 400, width: '90%', textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>👑</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#4ecca3', marginBottom: 6 }}>Owner Secret Gateway</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginBottom: 28 }}>కిరణ్ అన్నయ్య Control Room — Authorized Access Only</p>
          <form onSubmit={handleOwnerLogin}>
            <input type="password" placeholder="🔑 Enter Secret Code" value={ownerPwd} onChange={e => setOwnerPwd(e.target.value)} style={{ ...S.input, textAlign: 'center', fontSize: 18, letterSpacing: 6, marginBottom: 16 }} />
            <button type="submit" style={{ ...S.btn, fontSize: 15 }}>🔓 Unlock Control Room</button>
          </form>
          <button onClick={() => setIsOwnerMode(false)} style={{ marginTop: 14, background: 'none', border: 'none', color: '#64748b', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}>← Back to Menu</button>
        </div>
      </div>
    );
  }

  if (isOwnerMode && isAuthorized) {
    return <OwnerPanel
      isCafeOpen={isCafeOpen} setIsCafeOpen={setIsCafeOpen}
      dynamicMenu={dynamicMenu} setDynamicMenu={setDynamicMenu}
      newItemForm={newItemForm} setNewItemForm={setNewItemForm}
      priceEdit={priceEdit} setPriceEdit={setPriceEdit}
      branches={branches} setBranches={setBranches}
      newBranch={newBranch} setNewBranch={setNewBranch}
      cafeAddress={cafeAddress} setCafeAddress={setCafeAddress}
      newAddress={newAddress} setNewAddress={setNewAddress}
      liveOrders={liveOrders} setLiveOrders={setLiveOrders}
      ownerTab={ownerTab} setOwnerTab={setOwnerTab}
      onExit={() => setIsOwnerMode(false)}
    />;
  }

  // ══════════ MAIN APP ══════════
  return (
    <div style={{ minHeight: '100vh', fontFamily: 'Outfit, sans-serif', background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0a1628 100%)', color: '#e8e8e8' }}>

      {/* ── HEADER ── */}
      <header style={{ position: 'sticky', top: 0, zIndex: 500, background: 'rgba(15,23,42,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(78,204,163,0.15)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 22, cursor: 'pointer', padding: 4 }}>☰</button>
        <img src="/panda-logo.jpg" alt="Cafe Panda" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '2px solid #4ecca3', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 900, fontSize: 18, color: '#4ecca3', fontFamily: 'Fredoka, sans-serif' }}>🐼 Cafe Panda</div>
          <div style={{ fontSize: 11, color: '#475569' }}>Cravings Are Real • Amalapuram</div>
        </div>
        <button onClick={() => setIsCartOpen(true)} style={{ background: 'linear-gradient(135deg,#4ecca3,#38b2ac)', color: '#0f172a', border: 'none', borderRadius: 12, padding: '8px 14px', fontWeight: 900, fontSize: 13, cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 15px rgba(78,204,163,0.3)' }}>
          🛒 Cart ({cartCount()})
        </button>
      </header>

      {/* ── PRE-ORDER BANNER ── */}
      <div style={{ background: 'linear-gradient(90deg,#7c3aed,#4f46e5,#0ea5e9)', padding: '10px 16px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
        🍪 Pre-Order Customized Chocolates &amp; Cookies Available!
        <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 6, padding: '2px 10px', fontSize: 11 }}>Call: 9493189333</span>
      </div>

      {/* ── CLOSED NOTICE ── */}
      {!isCafeOpen && (
        <div style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', margin: '10px 16px', borderRadius: 10, padding: '10px 14px', textAlign: 'center', fontSize: 13, color: '#fca5a5', fontWeight: 700 }}>
          🔴 భయ్యా, Cafe ఇప్పుడు క్లోజ్ అయింది! తొందర్లో తిరిగి వస్తాం! 🐼
        </div>
      )}

      {/* ── SEARCH ── */}
      <div style={{ padding: '12px 16px 0' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, pointerEvents: 'none' }}>🔍</span>
          <input type="text" placeholder="Search menu items..." value={searchQ} onChange={e => { setSearchQ(e.target.value); setVisibleCount(INITIAL_LOAD); }} style={{ ...S.input, paddingLeft: 42 }} />
        </div>
      </div>

      {/* ── CATEGORY PILLS ── */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 16px', scrollbarWidth: 'none' }}>
        {['ALL', ...ALL_CATEGORIES].map(cat => (
          <button key={cat} onClick={() => { setActiveCat(cat); setVisibleCount(INITIAL_LOAD); }} style={{ flexShrink: 0, padding: '7px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600, border: activeCat === cat ? 'none' : '1px solid rgba(255,255,255,0.1)', background: activeCat === cat ? 'linear-gradient(135deg,#4ecca3,#38b2ac)' : 'rgba(255,255,255,0.06)', color: activeCat === cat ? '#0f172a' : '#94a3b8', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: activeCat === cat ? '0 4px 12px rgba(78,204,163,0.3)' : 'none' }}>
            {cat === 'ALL' ? '🍽 All Items' : `${CAT_EMOJI[cat] || ''} ${cat}`}
          </button>
        ))}
      </div>

      {/* ── MENU GRID ── */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
        {visible.map(item => (
          <MenuCard key={item.id} item={item} onAdd={addToCart} onOpen={setModalItem} isCafeOpen={isCafeOpen} qty={cart.find(c => c.id === item.id)?.qty || 0} onChangeQty={changeQty} />
        ))}
        {visible.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px 0', color: '#64748b' }}>
            <div style={{ fontSize: 48 }}>🐼</div>
            <p style={{ marginTop: 10 }}>No items found</p>
          </div>
        )}
      </div>

      {/* ── LOAD MORE ── */}
      {hasMore && (
        <div style={{ textAlign: 'center', padding: '20px 16px' }}>
          <button onClick={() => setVisibleCount(v => v + LOAD_MORE_STEP)} style={{ background: 'rgba(78,204,163,0.1)', border: '1px solid rgba(78,204,163,0.3)', borderRadius: 14, padding: '12px 28px', color: '#4ecca3', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            🔄 Load More Items ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{ background: 'rgba(0,0,0,0.35)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 16px 40px', textAlign: 'center', marginTop: 24 }}>
        <div style={{ fontSize: 30, marginBottom: 6 }}>🐼</div>
        <p style={{ fontWeight: 900, fontSize: 16, color: '#4ecca3', marginBottom: 2 }}>Cafe Panda</p>
        <p style={{ fontSize: 12, color: '#475569', marginBottom: 18 }}>{cafeAddress}</p>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 16 }}>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>👑 <strong style={{ color: '#f5c518' }}>Designed by Manisha Bonthu</strong></p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.linkedin.com/in/manisha-bonthu" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#0077b5,#005f8e)', color: '#fff', padding: '8px 18px', borderRadius: 10, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>🔗 LinkedIn</a>
            <a href="https://www.instagram.com/manisha.bonthu" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'linear-gradient(135deg,#e1306c,#833ab4)', color: '#fff', padding: '8px 18px', borderRadius: 10, fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>📸 Instagram</a>
          </div>
          <p style={{ fontSize: 11, color: '#1e293b', marginTop: 16 }}>© 2026 Cafe Panda Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* ── SIDEBAR ── */}
      {isSidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 900 }}>
          <div onClick={() => setIsSidebarOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 280, background: 'linear-gradient(180deg,#1e293b,#0f172a)', borderRight: '1px solid rgba(78,204,163,0.2)', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/panda-logo.jpg" alt="logo" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #4ecca3' }} />
                <span style={{ fontWeight: 900, color: '#4ecca3', fontSize: 16, fontFamily: 'Fredoka, sans-serif' }}>🐼 Cafe Menu</span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => { setIsSidebarOpen(false); handleInstall(); }} style={{ width: '100%', background: 'linear-gradient(135deg,#a78bfa,#f472b6)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>📲 Install Cafe Panda App</button>
              <button onClick={() => { setIsSidebarOpen(false); setIsOwnerMode(true); }} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', borderRadius: 12, padding: '12px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>👑 Admin Control Room</button>
            </div>
            {orderStage && <div style={{ margin: '0 16px', padding: '12px', background: 'rgba(78,204,163,0.1)', border: '1px solid rgba(78,204,163,0.25)', borderRadius: 12 }}><p style={{ fontSize: 11, color: '#4ecca3', fontWeight: 700, marginBottom: 4 }}>📦 Order Status</p><p style={{ fontSize: 13, color: '#e2e8f0' }}>⚡ {orderStage}</p></div>}
            {recentOrders.length > 0 && (
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: 12, color: '#64748b', fontWeight: 700, marginBottom: 10 }}>⏳ Recent Orders</p>
                {recentOrders.slice(0, 3).map((o, i) => (
                  <div key={i} style={{ padding: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 8, fontSize: 12 }}>
                    <p style={{ color: '#4ecca3', fontWeight: 700 }}>₹{o.total} — {o.customer}</p>
                    <p style={{ color: '#64748b', marginTop: 2 }}>{o.date}</p>
                  </div>
                ))}
              </div>
            )}
            <div style={{ marginTop: 'auto', padding: '16px', textAlign: 'center', fontSize: 11, color: '#334155' }}>v2.0.0 • 👑 Manisha Bonthu</div>
          </div>
        </div>
      )}

      {/* ── ITEM MODAL ── */}
      {modalItem && <ItemModal item={modalItem} onClose={() => setModalItem(null)} onAdd={addToCart} isCafeOpen={isCafeOpen} />}

      {/* ── CART DRAWER ── */}
      {isCartOpen && (
        <CartDrawer
          cart={cart} onClose={() => setIsCartOpen(false)}
          cartSubtotal={cartSubtotal} cartTotal={cartTotal}
          changeQty={changeQty} removeItem={removeItem}
          custName={custName} setCustName={setCustName}
          custPhone={custPhone} setCustPhone={setCustPhone}
          custAddr={custAddr} setCustAddr={setCustAddr}
          distance={distance} setDistance={setDistance}
          payMode={payMode} setPayMode={setPayMode}
          onPlaceOrder={triggerWhatsAppOrder} isCafeOpen={isCafeOpen}
        />
      )}

      {/* ── PWA FAB ── */}
      {deferredPrompt && (
        <button onClick={handleInstall} style={{ position: 'fixed', bottom: 90, right: 16, background: 'linear-gradient(135deg,#a78bfa,#f472b6)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', zIndex: 400, boxShadow: '0 4px 20px rgba(167,139,250,0.45)', fontFamily: 'Outfit, sans-serif' }}>
          📲 Install App
        </button>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  MENU CARD
// ═══════════════════════════════════════════════════════════════════
function MenuCard({ item, onAdd, onOpen, isCafeOpen, qty, onChangeQty }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform .25s, box-shadow .25s' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 35px rgba(78,204,163,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer' }} onClick={() => onOpen(item)}>
        <img src={item.image} alt={item.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 7, left: 7, width: 16, height: 16, border: `2px solid ${item.isVeg ? '#22c55e' : '#ef4444'}`, borderRadius: 3, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.isVeg ? '#22c55e' : '#ef4444' }} />
        </div>
        <div style={{ position: 'absolute', top: 7, right: 7, background: 'rgba(0,0,0,0.75)', borderRadius: 8, padding: '3px 8px', fontSize: 11, fontWeight: 700, color: '#4ecca3' }}>₹{item.price}</div>
      </div>
      <div style={{ padding: '10px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0', lineHeight: 1.3, marginBottom: 8 }}>{item.name}</p>
        {qty > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <button onClick={() => onChangeQty(item.id, -1)} style={S.qtyBtn}>−</button>
            <span style={{ fontWeight: 900, fontSize: 15, color: '#4ecca3', minWidth: 18, textAlign: 'center' }}>{qty}</span>
            <button onClick={() => onChangeQty(item.id, 1)} style={S.qtyBtn}>+</button>
          </div>
        ) : (
          <button disabled={!isCafeOpen} onClick={() => onAdd(item)} style={{ width: '100%', padding: '8px', borderRadius: 10, border: '1px solid rgba(78,204,163,0.3)', background: isCafeOpen ? 'rgba(78,204,163,0.1)' : 'rgba(255,255,255,0.04)', color: isCafeOpen ? '#4ecca3' : '#475569', fontSize: 12, fontWeight: 700, cursor: isCafeOpen ? 'pointer' : 'not-allowed' }}>+ Add</button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  ITEM MODAL
// ═══════════════════════════════════════════════════════════════════
function ItemModal({ item, onClose, onAdd, isCafeOpen }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'linear-gradient(180deg,#1e293b,#0f172a)', borderRadius: '24px 24px 0 0', width: '100%', maxWidth: 480, maxHeight: '88vh', overflowY: 'auto', border: '1px solid rgba(78,204,163,0.2)' }}>
        <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '24px 24px 0 0', flexShrink: 0 }}>
          <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 36, height: 36, color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.75)', borderRadius: 8, padding: '4px 10px', fontSize: 11, color: item.isVeg ? '#22c55e' : '#ef4444', fontWeight: 700 }}>{item.isVeg ? '🟢 VEG' : '🔴 NON-VEG'}</div>
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <h2 style={{ fontSize: 19, fontWeight: 900, color: '#f1f5f9', flex: 1, marginRight: 12, lineHeight: 1.3 }}>{item.name}</h2>
            <span style={{ fontSize: 21, fontWeight: 900, color: '#4ecca3', flexShrink: 0 }}>₹{item.price}</span>
          </div>
          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginBottom: 18 }}>{item.description}</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            {[{ label: '⏱ PREP', value: item.prepTime }, { label: '🔥 CAL', value: item.calories }, { label: '🏷 PRICE', value: `₹${item.price}` }].map((m, i) => (
              <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: '#64748b', marginBottom: 3 }}>{m.label}</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: i === 2 ? '#4ecca3' : '#e2e8f0' }}>{m.value}</p>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, color: '#4ecca3', fontWeight: 700, marginBottom: 10, letterSpacing: 1, textTransform: 'uppercase' }}>🧪 Ingredients</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {item.ingredients.map((ing, i) => (
                <span key={i} style={{ background: 'rgba(78,204,163,0.1)', border: '1px solid rgba(78,204,163,0.2)', borderRadius: 999, padding: '4px 12px', fontSize: 11, color: '#94a3b8' }}>{ing}</span>
              ))}
            </div>
          </div>
          <button disabled={!isCafeOpen} onClick={() => { onAdd(item); onClose(); }} style={{ ...S.btn, background: isCafeOpen ? 'linear-gradient(135deg,#4ecca3,#38b2ac)' : '#334155', color: isCafeOpen ? '#0f172a' : '#64748b', cursor: isCafeOpen ? 'pointer' : 'not-allowed', fontSize: 15 }}>
            {isCafeOpen ? `🛒 Add to Cart — ₹${item.price}` : '🔴 Cafe Currently Closed'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  CART DRAWER
// ═══════════════════════════════════════════════════════════════════
function CartDrawer({ cart, onClose, cartSubtotal, cartTotal, changeQty, removeItem, custName, setCustName, custPhone, setCustPhone, custAddr, setCustAddr, distance, setDistance, payMode, setPayMode, onPlaceOrder, isCafeOpen }) {
  const [paymentStatus, setPaymentStatus] = useState('PENDING');
  const sub = cartSubtotal();
  const meetsMin = sub >= MIN_ORDER;

  const handleCheckout = () => {
    if (cart.length === 0 || sub < MIN_ORDER || !custName.trim() || !custPhone.trim() || !custAddr.trim() || distance > 7) {
      onPlaceOrder(); // will trigger validations in parent
      return;
    }
    
    if (payMode === 'ONLINE' && paymentStatus !== 'SUCCESS') {
      alert('Initiating secure payment gateway connection...');
      setTimeout(() => {
        alert('✅ Payment verified successfully! You can now complete the order via WhatsApp.');
        setPaymentStatus('SUCCESS');
      }, 1500);
      return;
    }
    onPlaceOrder();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 800 }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, maxHeight: '90vh', overflowY: 'auto', background: 'linear-gradient(180deg,#1e293b,#0f172a)', borderTop: '2px solid #4ecca3', borderRadius: '24px 24px 0 0', boxShadow: '0 -10px 40px rgba(0,0,0,0.5)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, background: '#1e293b', zIndex: 10 }}>
          <h2 style={{ fontSize: 18, fontWeight: 900, color: '#f1f5f9' }}>🛍️ Your Cart</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ padding: '16px 20px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: '#64748b' }}>
              <div style={{ fontSize: 52 }}>🐼</div>
              <p style={{ marginTop: 10 }}>కార్ట్ ఖాళీగా ఉంది భయ్యా! ఐటమ్స్ యాడ్ చెయ్!</p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: 12 }}>
                    <img src={item.image} alt={item.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                      <p style={{ fontSize: 12, color: '#4ecca3', marginTop: 2 }}>₹{item.price * item.qty}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button onClick={() => changeQty(item.id, -1)} style={S.qtyBtn}>−</button>
                      <span style={{ fontWeight: 900, color: '#4ecca3', fontSize: 13, minWidth: 16, textAlign: 'center' }}>{item.qty}</span>
                      <button onClick={() => changeQty(item.id, 1)} style={S.qtyBtn}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 15, cursor: 'pointer' }}>🗑</button>
                  </div>
                ))}
              </div>

              {/* Min order warning */}
              {!meetsMin && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 12, color: '#fca5a5', fontWeight: 600 }}>⚠️ కనీసం ₹190+ ఐటమ్స్ యాడ్ చేయాలి! (₹{MIN_ORDER - sub} more needed)</div>}

              {/* Bill Summary */}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '14px', marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7, fontSize: 13, color: '#94a3b8' }}><span>Subtotal</span><span>₹{sub}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 13, color: '#94a3b8' }}><span>🚚 Delivery Fee</span><span style={{ color: '#f59e0b', fontWeight: 700 }}>₹{DELIVERY_FEE}</span></div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 900 }}><span style={{ color: '#f1f5f9' }}>💰 Total</span><span style={{ color: '#4ecca3' }}>₹{cartTotal()}</span></div>
              </div>

              {/* Delivery Details */}
              <p style={{ fontSize: 11, color: '#4ecca3', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>📍 Delivery Details</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                <input type="text" placeholder="నీ పేరు (Full Name)" value={custName} onChange={e => setCustName(e.target.value)} style={S.input} />
                <input type="tel" placeholder="WhatsApp Number" value={custPhone} onChange={e => setCustPhone(e.target.value)} style={S.input} />
                <textarea placeholder="పూర్తి Delivery Address" rows={2} value={custAddr} onChange={e => setCustAddr(e.target.value)} style={{ ...S.input, resize: 'none' }} />
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                    <span style={{ color: '#94a3b8' }}>📏 Distance</span>
                    <span style={{ fontWeight: 800, color: distance > 7 ? '#ef4444' : '#4ecca3' }}>{distance} Kms {distance > 7 ? '🚫' : '✅'}</span>
                  </div>
                  <input type="range" min={1} max={15} value={distance} onChange={e => setDistance(Number(e.target.value))} style={{ width: '100%', accentColor: '#4ecca3' }} />
                  {distance > 7 && <p style={{ fontSize: 11, color: '#fca5a5', marginTop: 4 }}>⚠️ 7Km+ దూరం! Dine-In option ఉపయోగించు.</p>}
                </div>
              </div>

              {/* Payment Mode */}
              <p style={{ fontSize: 11, color: '#4ecca3', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>💳 Payment Mode</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                {[{ v: 'COD', l: '💵 Cash on Delivery (COD)' }, { v: 'ONLINE', l: '📱 Online Payment (PhonePe/GPay)' }].map(opt => (
                  <label key={opt.v} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '12px 16px', borderRadius: 12, background: payMode === opt.v ? 'rgba(78,204,163,0.12)' : 'rgba(255,255,255,0.04)', border: `1.5px solid ${payMode === opt.v ? '#4ecca3' : 'rgba(255,255,255,0.08)'}`, transition: 'all .2s' }}>
                    <input type="radio" name="pay" value={opt.v} checked={payMode === opt.v} onChange={() => { setPayMode(opt.v); setPaymentStatus('PENDING'); }} style={{ accentColor: '#4ecca3', width: 16, height: 16 }} />
                    <span style={{ fontSize: 13, fontWeight: payMode === opt.v ? 700 : 500, color: payMode === opt.v ? '#4ecca3' : '#94a3b8' }}>{opt.l}</span>
                  </label>
                ))}
              </div>

              {/* Place Order */}
              <button onClick={handleCheckout} disabled={!isCafeOpen} style={{ width: '100%', padding: '15px', borderRadius: 14, border: 'none', background: isCafeOpen ? (payMode === 'ONLINE' && paymentStatus !== 'SUCCESS' ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#25D366,#128C7E)') : '#334155', color: '#fff', fontWeight: 900, fontSize: 15, cursor: isCafeOpen ? 'pointer' : 'not-allowed', boxShadow: isCafeOpen ? (payMode === 'ONLINE' && paymentStatus !== 'SUCCESS' ? '0 6px 24px rgba(59,130,246,0.3)' : '0 6px 24px rgba(37,211,102,0.3)') : 'none', fontFamily: 'Outfit, sans-serif' }}>
                {payMode === 'ONLINE' && paymentStatus !== 'SUCCESS' ? '💳 Pay Now' : '🚀 Place Order via WhatsApp'}
              </button>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#475569', marginTop: 8 }}>Order dispatched to both WhatsApp channels ✅</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  OWNER PANEL
// ═══════════════════════════════════════════════════════════════════
function OwnerPanel({ isCafeOpen, setIsCafeOpen, dynamicMenu, setDynamicMenu, newItemForm, setNewItemForm, priceEdit, setPriceEdit, branches, setBranches, newBranch, setNewBranch, cafeAddress, setCafeAddress, newAddress, setNewAddress, liveOrders, setLiveOrders, ownerTab, setOwnerTab, onExit }) {

  const TABS = [
    { id: 'status', l: '🏪 Status' }, { id: 'manageMenu', l: '🍔 Manage Menu' },
    { id: 'qr', l: '🔲 QR Code' }, { id: 'branches', l: '🏢 Branches' },
    { id: 'address', l: '📍 Address' }, { id: 'orders', l: '📦 Orders' },
  ];

  const [menuEditState, setMenuEditState] = useState({ id: '', name: '', price: '', category: ALL_CATEGORIES[0], image: '', description: '', isVeg: true });

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!menuEditState.name || !menuEditState.price) { alert('Name and Price are required!'); return; }
    if (menuEditState.id) {
      // Update existing
      setDynamicMenu(p => p.map(it => it.id === menuEditState.id ? { ...it, name: menuEditState.name, price: parseInt(menuEditState.price), category: menuEditState.category, image: menuEditState.image || it.image, description: menuEditState.description || it.description, isVeg: menuEditState.isVeg } : it));
      alert('✅ Item updated!');
    } else {
      // Add new
      const item = { id: `c_${Date.now()}`, category: menuEditState.category, name: menuEditState.name, price: parseInt(menuEditState.price), isVeg: menuEditState.isVeg, image: menuEditState.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80', description: menuEditState.description || 'New item by owner.', ingredients: ['Special Recipe'], calories: 'N/A', prepTime: 'N/A' };
      setDynamicMenu(p => [...p, item]);
      alert(`✅ "${item.name}" added to menu!`);
    }
    setMenuEditState({ id: '', name: '', price: '', category: ALL_CATEGORIES[0], image: '', description: '', isVeg: true });
  };

  const handleEditItem = (it) => setMenuEditState({ id: it.id, name: it.name, price: it.price, category: it.category, image: it.image, description: it.description, isVeg: it.isVeg });
  const handleDeleteItem = (id) => { if(window.confirm('Are you sure you want to delete this item?')) setDynamicMenu(p => p.filter(it => it.id !== id)); };

  const handleAddBranch = (e) => {
    e.preventDefault();
    if (!newBranch.name || !newBranch.address) { alert('Branch details నింపేయ్!'); return; }
    setBranches(p => [...p, { id: Date.now(), ...newBranch }]);
    setNewBranch({ name: '', address: '' }); alert('✅ Branch added!');
  };

  const handleAddressUpdate = (e) => {
    e.preventDefault();
    if (!newAddress.trim()) { alert('New address నింపేయ్!'); return; }
    setCafeAddress(newAddress); setNewAddress(''); alert('✅ Address updated!');
  };

  const advanceStage = (orderId) => {
    setLiveOrders(prev => {
      const upd = prev.map(o => o.id === orderId && o.stage < ORDER_STAGES.length - 1 ? { ...o, stage: o.stage + 1 } : o);
      localStorage.setItem('panda_live_orders', JSON.stringify(upd));
      return upd;
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#0f172a,#1e293b)', fontFamily: 'Outfit, sans-serif', color: '#e8e8e8' }}>
      {/* Header */}
      <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(78,204,163,0.2)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: '#4ecca3', fontFamily: 'Fredoka, sans-serif' }}>👑 కిరణ్ అన్నయ్య కంట్రోల్ రూమ్</h1>
          <p style={{ fontSize: 11, color: '#64748b' }}>Cafe Panda — Owner Dashboard v2.0</p>
        </div>
        <button onClick={onExit} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: 10, padding: '8px 14px', fontSize: 12, cursor: 'pointer' }}>👁 View App</button>
      </div>

      {/* Tab Bar */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', padding: '12px 16px', scrollbarWidth: 'none', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setOwnerTab(t.id)} style={{ flexShrink: 0, padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 700, border: ownerTab === t.id ? 'none' : '1px solid rgba(255,255,255,0.1)', background: ownerTab === t.id ? 'linear-gradient(135deg,#4ecca3,#38b2ac)' : 'rgba(255,255,255,0.06)', color: ownerTab === t.id ? '#0f172a' : '#94a3b8', cursor: 'pointer', whiteSpace: 'nowrap' }}>{t.l}</button>
        ))}
      </div>

      <div style={{ padding: '18px 16px' }}>
        {/* STATUS */}
        {ownerTab === 'status' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <OCard title="🏪 Cafe Operational Status">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: isCafeOpen ? '#22c55e' : '#ef4444' }}>{isCafeOpen ? '🟢 CAFE IS OPEN' : '🔴 CAFE IS CLOSED'}</span>
                <div onClick={() => setIsCafeOpen(p => !p)} style={{ width: 56, height: 28, borderRadius: 14, cursor: 'pointer', position: 'relative', background: isCafeOpen ? '#4ecca3' : '#334155', transition: 'background .3s' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: isCafeOpen ? 30 : 2, transition: 'left .3s', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }} />
                </div>
              </div>
              <p style={{ fontSize: 12, color: '#475569' }}>Toggle controls ordering availability across the app.</p>
            </OCard>
            <OCard title="📊 Quick Stats">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[{ l: 'Menu Items', v: dynamicMenu.length, ic: '🍽', c: '#4ecca3' }, { l: 'Live Orders', v: liveOrders.length, ic: '📦', c: '#f59e0b' }, { l: 'Branches', v: branches.length, ic: '🏢', c: '#a78bfa' }, { l: 'Status', v: isCafeOpen ? 'Open' : 'Closed', ic: '🏪', c: isCafeOpen ? '#22c55e' : '#ef4444' }].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
                    <div style={{ fontSize: 26 }}>{s.ic}</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: s.c, marginTop: 4 }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: '#64748b' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </OCard>
          </div>
        )}

        {/* MANAGE MENU */}
        {ownerTab === 'manageMenu' && (
          <OCard title="🍔 Manage Menu (Add / Edit / Delete)">
            <form onSubmit={handleSaveItem} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div><label style={S.label}>Item Name</label><input value={menuEditState.name} onChange={e => setMenuEditState(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Spicy Paneer Roll" style={S.input} /></div>
              <div><label style={S.label}>Price (₹)</label><input type="number" value={menuEditState.price} onChange={e => setMenuEditState(p => ({ ...p, price: e.target.value }))} placeholder="e.g. 149" style={S.input} /></div>
              <div><label style={S.label}>Category</label>
                <select value={menuEditState.category} onChange={e => setMenuEditState(p => ({ ...p, category: e.target.value }))} style={{ ...S.input, cursor: 'pointer' }}>
                  {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={S.label}>Image URL (Optional)</label><input value={menuEditState.image} onChange={e => setMenuEditState(p => ({ ...p, image: e.target.value }))} placeholder="https://..." style={S.input} /></div>
              <div><label style={S.label}>Description (Optional)</label><input value={menuEditState.description} onChange={e => setMenuEditState(p => ({ ...p, description: e.target.value }))} placeholder="Short description..." style={S.input} /></div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#e8e8e8', cursor: 'pointer' }}>
                <input type="checkbox" checked={menuEditState.isVeg} onChange={e => setMenuEditState(p => ({ ...p, isVeg: e.target.checked }))} style={{ accentColor: '#4ecca3' }} /> Veg Item
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" style={{ ...S.btn, flex: 1 }}>{menuEditState.id ? '💾 Update Item' : '✅ Add Item'}</button>
                {menuEditState.id && <button type="button" onClick={() => setMenuEditState({ id: '', name: '', price: '', category: ALL_CATEGORIES[0], image: '', description: '', isVeg: true })} style={{ ...S.btn, background: '#334155', color: '#e2e8f0', flex: 1 }}>Cancel Edit</button>}
              </div>
            </form>
            <p style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>Existing Menu Items:</p>
            <div style={{ maxHeight: 280, overflowY: 'auto' }}>
              {dynamicMenu.map(it => (
                <div key={it.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div>
                    <p style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 700 }}>{it.name} <span style={{ color: '#4ecca3' }}>(₹{it.price})</span></p>
                    <p style={{ fontSize: 11, color: '#64748b' }}>{it.category}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => handleEditItem(it)} style={{ padding: '4px 10px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Edit</button>
                    <button onClick={() => handleDeleteItem(it.id)} style={{ padding: '4px 10px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </OCard>
        )}

        {/* QR CODE */}
        {ownerTab === 'qr' && (
          <OCard title="🔲 Custom QR Code Generator">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, padding: '20px 0' }}>
              <div style={{ background: '#fff', padding: 20, borderRadius: 16 }}>
                <QRCode value="https://cafepanda.in" size={200} />
              </div>
              <p style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>This QR code redirects directly to <strong style={{ color: '#4ecca3' }}>cafepanda.in</strong>. Print and place this on your cafe tables!</p>
              <a href={`data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240"><foreignObject width="240" height="240"><body xmlns="http://www.w3.org/1999/xhtml"><div style="background:white;padding:20px;border-radius:16px"><style>svg{width:200px;height:200px}</style>' + '<div id="qr"></div>' + '</div></body></foreignObject></svg>')}`} download="CafePanda_QR.svg" onClick={(e) => {e.preventDefault(); alert('Please take a screenshot or print this page. SVG download requires additional setup.');}} style={{ ...S.btn, textAlign: 'center', textDecoration: 'none' }}>⬇️ Save / Print QR Code</a>
            </div>
          </OCard>
        )}

        {/* BRANCHES */}
        {ownerTab === 'branches' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <OCard title="🏢 Add New Branch">
              <form onSubmit={handleAddBranch} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div><label style={S.label}>Branch Name</label><input value={newBranch.name} onChange={e => setNewBranch(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Cafe Panda – Rajahmundry" style={S.input} /></div>
                <div><label style={S.label}>Branch Address</label><input value={newBranch.address} onChange={e => setNewBranch(p => ({ ...p, address: e.target.value }))} placeholder="Full Address" style={S.input} /></div>
                <button type="submit" style={S.btn}>🏢 Add Branch</button>
              </form>
            </OCard>
            <OCard title="📍 All Branches">
              {branches.map(b => (
                <div key={b.id} style={{ padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: 10, marginBottom: 10 }}>
                  <p style={{ fontWeight: 700, color: '#4ecca3', marginBottom: 4 }}>🏪 {b.name}</p>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>{b.address}</p>
                </div>
              ))}
            </OCard>
          </div>
        )}

        {/* ADDRESS */}
        {ownerTab === 'address' && (
          <OCard title="📍 Update Cafe Address">
            <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>Current: <strong style={{ color: '#4ecca3' }}>{cafeAddress}</strong></p>
            <form onSubmit={handleAddressUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div><label style={S.label}>New Address</label><textarea value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder="New Cafe Address..." rows={3} style={{ ...S.input, resize: 'none' }} /></div>
              <button type="submit" style={S.btn}>📍 Update Address</button>
            </form>
          </OCard>
        )}

        {/* ORDERS */}
        {ownerTab === 'orders' && (
          <OCard title="📦 Live Order Status Matrix">
            {liveOrders.length === 0 ? (
              <p style={{ color: '#64748b', textAlign: 'center', padding: '24px 0' }}>No live orders yet! 🐼</p>
            ) : liveOrders.map(order => (
              <div key={order.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '14px', marginBottom: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div><p style={{ fontWeight: 700, color: '#e2e8f0', fontSize: 13 }}>👤 {order.customer}</p><p style={{ fontSize: 11, color: '#64748b' }}>{order.date}</p></div>
                  <span style={{ fontSize: 14, fontWeight: 900, color: '#4ecca3' }}>₹{order.total}</span>
                </div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 10, overflowX: 'auto' }}>
                  {ORDER_STAGES.map((st, si) => (
                    <div key={si} style={{ flexShrink: 0, padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: si <= order.stage ? 'rgba(78,204,163,0.2)' : 'rgba(255,255,255,0.04)', color: si <= order.stage ? '#4ecca3' : '#475569', border: `1px solid ${si === order.stage ? '#4ecca3' : 'rgba(255,255,255,0.06)'}` }}>{st}</div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700, marginBottom: 10 }}>⚡ {ORDER_STAGES[order.stage]}</p>
                {order.stage < ORDER_STAGES.length - 1 ? (
                  <button onClick={() => advanceStage(order.id)} style={{ width: '100%', padding: '10px', borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#4ecca3,#38b2ac)', color: '#0f172a', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>
                    ➡ Advance to: {ORDER_STAGES[order.stage + 1]}
                  </button>
                ) : (
                  <div style={{ textAlign: 'center', padding: '8px', background: 'rgba(34,197,94,0.1)', borderRadius: 10, fontSize: 13, color: '#22c55e', fontWeight: 700 }}>✅ Delivered Successfully!</div>
                )}
              </div>
            ))}
          </OCard>
        )}
      </div>
    </div>
  );
}

function OCard({ title, children }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '18px' }}>
      <h3 style={{ fontSize: 14, fontWeight: 800, color: '#e2e8f0', marginBottom: 14 }}>{title}</h3>
      {children}
    </div>
  );
}
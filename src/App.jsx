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
  { id: 'item_1', category: 'QUICK BITES', name: 'Funky Fries (Plain)', price: 60, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Delicious Funky Fries (Plain)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_2', category: 'QUICK BITES', name: 'Salted Fries', price: 80, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Delicious Salted Fries', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_3', category: 'QUICK BITES', name: 'Peri Peri Fries', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Delicious Peri Peri Fries', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_4', category: 'QUICK BITES', name: 'Garlic Pops (15 pcs)', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Delicious Garlic Pops (15 pcs)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_5', category: 'QUICK BITES', name: 'Veg Nuggets (10 pcs)', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Delicious Veg Nuggets (10 pcs)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_6', category: 'QUICK BITES', name: 'Corn Rolls (5 pcs)', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Delicious Corn Rolls (5 pcs)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_7', category: 'QUICK BITES', name: 'Onion rings (5 pcs)', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Delicious Onion rings (5 pcs)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_8', category: 'QUICK BITES', name: 'Veg lollipops (5 pcs)', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Delicious Veg lollipops (5 pcs)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_9', category: 'ADD-ONS (QUICK BITES)', name: 'Peri Peri Sprinkler', price: 10, isVeg: true, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=600&q=80', description: 'Delicious Peri Peri Sprinkler', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_10', category: 'NON VEG SNACKATORY', name: 'Chicken Nuggets (6 pcs)', price: 99, isVeg: false, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80', description: 'Delicious Chicken Nuggets (6 pcs)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_11', category: 'NON VEG SNACKATORY', name: 'Chicken Fingers (4 pcs)', price: 99, isVeg: false, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80', description: 'Delicious Chicken Fingers (4 pcs)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_12', category: 'NON VEG SNACKATORY', name: 'Chicken Popcorn (15 pcs)', price: 99, isVeg: false, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80', description: 'Delicious Chicken Popcorn (15 pcs)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_13', category: 'NON VEG SNACKATORY', name: 'Chicken Loaded French fries', price: 199, isVeg: false, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80', description: 'Delicious Chicken Loaded French fries', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_14', category: 'VEG MOMOS (5Pcs)', name: 'Classic Veg Fried Momos', price: 110, isVeg: true, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&q=80', description: 'Delicious Classic Veg Fried Momos', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_15', category: 'VEG MOMOS (5Pcs)', name: 'Classic Veg Steamed Momos', price: 120, isVeg: true, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&q=80', description: 'Delicious Classic Veg Steamed Momos', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_16', category: 'VEG MOMOS (5Pcs)', name: 'Classic Veg Schezwan Momos', price: 120, isVeg: true, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&q=80', description: 'Delicious Classic Veg Schezwan Momos', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_17', category: 'VEG MOMOS (5Pcs)', name: 'Pan-Fried Momos', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&q=80', description: 'Delicious Pan-Fried Momos', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_18', category: 'NON-VEG MOMOS', name: 'Chicken Fried Momos', price: 110, isVeg: false, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&q=80', description: 'Delicious Chicken Fried Momos', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_19', category: 'NON-VEG MOMOS', name: 'Chicken Steamed Momos', price: 120, isVeg: false, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&q=80', description: 'Delicious Chicken Steamed Momos', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_20', category: 'NON-VEG MOMOS', name: 'Schezwan Pan-Fried Momos', price: 120, isVeg: false, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&q=80', description: 'Delicious Schezwan Pan-Fried Momos', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_21', category: 'NON-VEG MOMOS', name: 'Chicken Momos', price: 150, isVeg: false, image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?w=600&q=80', description: 'Delicious Chicken Momos', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_22', category: 'LORD OF THE WINGS (3Pc)', name: 'Crunchy Chicken Wings', price: 150, isVeg: false, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80', description: 'Delicious Crunchy Chicken Wings', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_23', category: 'LORD OF THE WINGS (3Pc)', name: 'Peri Peri Chicken Wings', price: 170, isVeg: false, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80', description: 'Delicious Peri Peri Chicken Wings', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_24', category: 'VEG PIZZA', name: 'Classic Margherita Pizza', price: 199, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Classic Margherita Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_25', category: 'VEG PIZZA', name: 'Creamy Golden Corn Pizza', price: 209, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Creamy Golden Corn Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_26', category: 'VEG PIZZA', name: 'Peppy Paneer Pizza', price: 219, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Peppy Paneer Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_27', category: 'VEG PIZZA', name: 'Peri Peri Paneer Pizza', price: 219, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Peri Peri Paneer Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_28', category: 'VEG PIZZA', name: 'BBQ Corn Pizza', price: 219, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious BBQ Corn Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_29', category: 'VEG PIZZA', name: 'BBQ Paneer Pizza', price: 219, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious BBQ Paneer Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_30', category: 'VEG PIZZA', name: 'Peri Peri Paneer Pizza', price: 219, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Peri Peri Paneer Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_31', category: 'VEG PIZZA', name: 'Veg Carnival Pizza', price: 249, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Veg Carnival Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_32', category: 'ADD-ONS (PIZZA)', name: 'Cheese Slice', price: 25, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Cheese Slice', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_33', category: 'ADD-ONS (PIZZA)', name: 'Extra Pizza Cheese', price: 40, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Extra Pizza Cheese', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_34', category: 'NON-VEG PIZZA', name: 'Classic Chicken Pizza', price: 209, isVeg: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Classic Chicken Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_35', category: 'NON-VEG PIZZA', name: 'Chicken & Corn Pizza', price: 209, isVeg: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Chicken & Corn Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_36', category: 'NON-VEG PIZZA', name: 'BBQ Chicken Pizza', price: 209, isVeg: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious BBQ Chicken Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_37', category: 'NON-VEG PIZZA', name: 'Chicken Paneer Pizza', price: 249, isVeg: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Chicken Paneer Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_38', category: 'NON-VEG PIZZA', name: 'Chicken Popcorn Pizza', price: 249, isVeg: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Chicken Popcorn Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_39', category: 'NON-VEG PIZZA', name: 'Chicken Nuggets Pizza', price: 259, isVeg: false, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80', description: 'Delicious Chicken Nuggets Pizza', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_40', category: 'BEVERAGES', name: 'Water', price: 10, isVeg: true, image: 'https://images.unsplash.com/photo-1548839140-29a749e1ab4c?w=600&q=80', description: 'Delicious Water', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_41', category: 'BEVERAGES', name: 'Coke', price: 40, isVeg: true, image: 'https://images.unsplash.com/photo-1548839140-29a749e1ab4c?w=600&q=80', description: 'Delicious Coke', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_42', category: 'BEVERAGES', name: 'ThumsUP', price: 40, isVeg: true, image: 'https://images.unsplash.com/photo-1548839140-29a749e1ab4c?w=600&q=80', description: 'Delicious ThumsUP', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_43', category: 'BEVERAGES', name: 'Sprite', price: 40, isVeg: true, image: 'https://images.unsplash.com/photo-1548839140-29a749e1ab4c?w=600&q=80', description: 'Delicious Sprite', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_44', category: 'VEG BURGERS', name: 'Veg Patty Burger', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Veg Patty Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_45', category: 'VEG BURGERS', name: 'Cheesy Veg Patty Burger', price: 119, isVeg: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Cheesy Veg Patty Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_46', category: 'VEG BURGERS', name: 'Mayo Loaded Veg Burger', price: 129, isVeg: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Mayo Loaded Veg Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_47', category: 'VEG BURGERS', name: 'Veg Double Patty Burger', price: 139, isVeg: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Veg Double Patty Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_48', category: 'VEG BURGERS', name: 'Veg Supreme Burger', price: 159, isVeg: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Veg Supreme Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_49', category: 'NON-VEG BURGERS', name: 'Chicken Patty Burger', price: 119, isVeg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Chicken Patty Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_50', category: 'NON-VEG BURGERS', name: 'Cheesy Chicken Patty Burger', price: 139, isVeg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Cheesy Chicken Patty Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_51', category: 'NON-VEG BURGERS', name: 'Mayo Loaded Chicken Burger', price: 139, isVeg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Mayo Loaded Chicken Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_52', category: 'NON-VEG BURGERS', name: 'Double Patty Chicken Burger', price: 169, isVeg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Double Patty Chicken Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_53', category: 'NON-VEG BURGERS', name: 'Chicken Supreme Burger', price: 179, isVeg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Chicken Supreme Burger', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_54', category: 'ADD-ONS (BURGERS)', name: 'Cheese Slice', price: 25, isVeg: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Cheese Slice', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_55', category: 'DESSERTS', name: 'Choco Brownie (Hot)', price: 90, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious Choco Brownie (Hot)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_56', category: 'DESSERTS', name: 'Choco Brownie with Ice Cream', price: 125, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious Choco Brownie with Ice Cream', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_57', category: 'DESSERTS', name: 'Red Velvet Brownie with Ice Cream', price: 125, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious Red Velvet Brownie with Ice Cream', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_58', category: 'BROWNIE BOWLS (250ml Bowl)', name: 'Oreo Brownie Bowl', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious Oreo Brownie Bowl', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_59', category: 'BROWNIE BOWLS (250ml Bowl)', name: 'KitKat Brownie Bowl', price: 160, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious KitKat Brownie Bowl', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_60', category: 'BROWNIE BOWLS (250ml Bowl)', name: 'Caramel Biscuit Brownie Bowl', price: 170, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious Caramel Biscuit Brownie Bowl', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_61', category: 'BROWNIE BOWLS (250ml Bowl)', name: 'Kunafa Brownie Bowl', price: 199, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious Kunafa Brownie Bowl', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_62', category: 'ADD-ONS (KUNAFA)', name: 'Classic Cream Kunafa', price: 299, isVeg: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80', description: 'Delicious Classic Cream Kunafa', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_63', category: 'ADD-ONS (DESSERTS)', name: 'Ice Cream', price: 25, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious Ice Cream', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_64', category: 'ADD-ONS (DESSERTS)', name: 'Caramel', price: 30, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious Caramel', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_65', category: 'CHOCOLATES (Made with Couverture Chocolate)', name: 'Kunafa Chocolate Bar', price: 170, isVeg: true, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=600&q=80', description: 'Delicious Kunafa Chocolate Bar', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_66', category: 'BOBA COLD COFFEE', name: 'Boba Pearl Cold Coffee', price: 130, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Boba Pearl Cold Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_67', category: 'BOBA COLD COFFEE', name: 'Double Shot Boba CC', price: 140, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Double Shot Boba CC', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_68', category: 'BOBA COLD COFFEE', name: 'Choco Boba CC', price: 140, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Choco Boba CC', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_69', category: 'BOBA COLD COFFEE', name: 'Oreo Boba CC', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Oreo Boba CC', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_70', category: 'BOBA COLD COFFEE', name: 'Caramel Boba CC', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Caramel Boba CC', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_71', category: 'BOBA COLD COFFEE', name: 'Kitkat Boba CC', price: 160, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Kitkat Boba CC', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_72', category: 'BOBA COLD COFFEE', name: 'Hazelnut Choco Boba CC', price: 160, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Hazelnut Choco Boba CC', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_73', category: 'BOBA COLD COFFEE', name: 'Brownie Boba CC', price: 180, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Brownie Boba CC', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_74', category: 'MILKSHAKES', name: 'Vanilla Snow', price: 100, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Vanilla Snow', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_75', category: 'MILKSHAKES', name: 'Strawberry', price: 110, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Strawberry', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_76', category: 'MILKSHAKES', name: 'Oreo Vanilla', price: 120, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Oreo Vanilla', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_77', category: 'MILKSHAKES', name: 'Butterscotch', price: 130, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Butterscotch', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_78', category: 'MILKSHAKES', name: 'Chocolate', price: 130, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Chocolate', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_79', category: 'MILKSHAKES', name: 'Oreo Choco', price: 130, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Oreo Choco', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_80', category: 'MILKSHAKES', name: 'Oreo Strawberry', price: 130, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Oreo Strawberry', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_81', category: 'MILKSHAKES', name: 'Blue Moon Vanilla', price: 140, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Blue Moon Vanilla', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_82', category: 'MILKSHAKES', name: 'Caramel Choco', price: 140, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Choco', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_83', category: 'MILKSHAKES', name: 'Caramel Butterscotch', price: 140, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Butterscotch', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_84', category: 'MILKSHAKES', name: 'Black Currant', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Black Currant', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_85', category: 'MILKSHAKES', name: 'Blue Berry', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Blue Berry', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_86', category: 'MILKSHAKES', name: 'Chocochip', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Chocochip', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_87', category: 'MILKSHAKES', name: 'Caramel Kitkat', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Kitkat', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_88', category: 'MILKSHAKES', name: 'Caramel Oreo', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Oreo', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_89', category: 'MILKSHAKES', name: 'Kitkat MS', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Kitkat MS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_90', category: 'MILKSHAKES', name: 'Choco Brownie MS', price: 160, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Choco Brownie MS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_91', category: 'MILKSHAKES', name: 'Dry Fruit MS', price: 170, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Dry Fruit MS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_92', category: 'MILKSHAKES', name: 'Red Velvet MS', price: 170, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Red Velvet MS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_93', category: 'MOCKTAILS', name: 'Blue Margarita', price: 80, isVeg: true, image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=600&q=80', description: 'Delicious Blue Margarita', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_94', category: 'MOCKTAILS', name: 'Mint Blast Mojito', price: 80, isVeg: true, image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=600&q=80', description: 'Delicious Mint Blast Mojito', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_95', category: 'MOCKTAILS', name: 'Raspberry Twist', price: 90, isVeg: true, image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=600&q=80', description: 'Delicious Raspberry Twist', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_96', category: 'MOCKTAILS', name: 'Bubblegum Temptation', price: 90, isVeg: true, image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=600&q=80', description: 'Delicious Bubblegum Temptation', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_97', category: 'MOCKTAILS', name: 'Watermelon Mojito', price: 90, isVeg: true, image: 'https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=600&q=80', description: 'Delicious Watermelon Mojito', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_98', category: 'THICKSHAKES', name: 'Oreo Crumble TS', price: 180, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Oreo Crumble TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_99', category: 'THICKSHAKES', name: 'Kitkat TS', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Kitkat TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_100', category: 'THICKSHAKES', name: 'Chocochip TS', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Chocochip TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_101', category: 'THICKSHAKES', name: 'Mississippi Mud TS', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Mississippi Mud TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_102', category: 'THICKSHAKES', name: 'Caramel Biscuit TS', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Biscuit TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_103', category: 'THICKSHAKES', name: 'Oreo Choco TS', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Oreo Choco TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_104', category: 'THICKSHAKES', name: 'Caramel Oreo TS', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Oreo TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_105', category: 'THICKSHAKES', name: 'Oreo Thick Coffee', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Oreo Thick Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_106', category: 'THICKSHAKES', name: 'Choco Thick Coffee', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Choco Thick Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_107', category: 'THICKSHAKES', name: 'Caramel Kitkat TS', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Kitkat TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_108', category: 'THICKSHAKES', name: 'Caramel Brownie TS', price: 199, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Brownie TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_109', category: 'THICKSHAKES', name: 'Chunky Choco Brownie TS', price: 199, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Chunky Choco Brownie TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_110', category: 'THICKSHAKES', name: 'Kitkat Thick Coffee', price: 199, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Kitkat Thick Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_111', category: 'THICKSHAKES', name: 'Brownie Thick Coffee', price: 199, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Brownie Thick Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_112', category: 'THICKSHAKES', name: 'Royal Red Velvet TS', price: 199, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Royal Red Velvet TS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_113', category: 'COLD COFFEE', name: 'Cold Coffee (Plain)', price: 90, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Cold Coffee (Plain)', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_114', category: 'COLD COFFEE', name: 'Double Shot Cold Coffee', price: 100, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Double Shot Cold Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_115', category: 'COLD COFFEE', name: 'Chocolate Cold Coffee', price: 110, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Chocolate Cold Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_116', category: 'COLD COFFEE', name: 'Caramel Cold Coffee', price: 120, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Caramel Cold Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_117', category: 'COLD COFFEE', name: 'Oreo Choco Cold Coffee', price: 120, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Oreo Choco Cold Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_118', category: 'COLD COFFEE', name: 'Hazelnut Choco Cold Coffee', price: 120, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Hazelnut Choco Cold Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_119', category: 'COLD COFFEE', name: 'Kitkat Cold Coffee', price: 120, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Kitkat Cold Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_120', category: 'COLD COFFEE', name: 'Brownie Cold Coffee', price: 140, isVeg: true, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', description: 'Delicious Brownie Cold Coffee', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_121', category: 'BOBA MILKSHAKES', name: 'Vanilla Snow', price: 130, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Vanilla Snow', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_122', category: 'BOBA MILKSHAKES', name: 'Strawberry', price: 140, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Strawberry', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_123', category: 'BOBA MILKSHAKES', name: 'Oreo Vanilla', price: 150, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Oreo Vanilla', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_124', category: 'BOBA MILKSHAKES', name: 'Butterscotch', price: 160, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Butterscotch', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_125', category: 'BOBA MILKSHAKES', name: 'Chocolate', price: 160, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Chocolate', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_126', category: 'BOBA MILKSHAKES', name: 'Oreo Choco', price: 160, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Oreo Choco', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_127', category: 'BOBA MILKSHAKES', name: 'Oreo Strawberry', price: 160, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Oreo Strawberry', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_128', category: 'BOBA MILKSHAKES', name: 'Blue Moon Vanilla', price: 170, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Blue Moon Vanilla', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_129', category: 'BOBA MILKSHAKES', name: 'Caramel Choco', price: 170, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Choco', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_130', category: 'BOBA MILKSHAKES', name: 'Caramel Butterscotch', price: 170, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Butterscotch', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_131', category: 'BOBA MILKSHAKES', name: 'Black Currant', price: 180, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Black Currant', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_132', category: 'BOBA MILKSHAKES', name: 'Blue Berry', price: 180, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Blue Berry', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_133', category: 'BOBA MILKSHAKES', name: 'Chocochip', price: 180, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Chocochip', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_134', category: 'BOBA MILKSHAKES', name: 'Caramel Kitkat', price: 180, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Kitkat', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_135', category: 'BOBA MILKSHAKES', name: 'Caramel Oreo', price: 180, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Caramel Oreo', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_136', category: 'BOBA MILKSHAKES', name: 'Kitkat MS', price: 180, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Kitkat MS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_137', category: 'BOBA MILKSHAKES', name: 'Choco Brownie MS', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Choco Brownie MS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_138', category: 'BOBA MILKSHAKES', name: 'Red Velvet MS', price: 190, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Red Velvet MS', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_139', category: 'ICE CREAM (2 Scoops)', name: 'Vanilla Ice Cream', price: 80, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Vanilla Ice Cream', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_140', category: 'ICE CREAM (2 Scoops)', name: 'Strawberry Ice Cream', price: 80, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Strawberry Ice Cream', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_141', category: 'ICE CREAM (2 Scoops)', name: 'Chocolate Ice Cream', price: 90, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Chocolate Ice Cream', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_142', category: 'ICE CREAM (2 Scoops)', name: 'Butterscotch Ice Cream', price: 99, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Butterscotch Ice Cream', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
  { id: 'item_143', category: 'ICE CREAM (2 Scoops)', name: 'Dry Fruit / Seasonal Fruit Ice Cream', price: 109, isVeg: true, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80', description: 'Delicious Dry Fruit / Seasonal Fruit Ice Cream', ingredients: [], calories: 'N/A', prepTime: '10 mins' },
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
        <div style={{ background: 'rgba(239,68,68,0.12)', border: '2px solid rgba(239,68,68,0.5)', margin: '15px 16px', borderRadius: 12, padding: '16px 20px', textAlign: 'center', fontSize: 14, color: '#fca5a5', fontWeight: 800, boxShadow: '0 4px 12px rgba(239,68,68,0.2)' }}>
          🛑 Cafe is Currently Closed. We are not accepting orders at the moment. You can still browse our menu!
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
        ) : isCafeOpen ? (
          <button onClick={() => onAdd(item)} style={{ width: '100%', padding: '8px', borderRadius: 10, border: '1px solid rgba(78,204,163,0.3)', background: 'rgba(78,204,163,0.1)', color: '#4ecca3', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ Add</button>
        ) : (
          <div style={{ width: '100%', padding: '8px', textAlign: 'center', fontSize: 12, color: '#64748b', fontWeight: 700 }}>Closed</div>
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
          {isCafeOpen ? (
            <button onClick={() => { onAdd(item); onClose(); }} style={{ ...S.btn, background: 'linear-gradient(135deg,#4ecca3,#38b2ac)', color: '#0f172a', cursor: 'pointer', fontSize: 15 }}>
              🛒 Add to Cart — ₹{item.price}
            </button>
          ) : (
            <div style={{ ...S.btn, background: 'rgba(239,68,68,0.1)', color: '#ef4444', textAlign: 'center', cursor: 'not-allowed' }}>
              🛑 Cafe Currently Closed
            </div>
          )}
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
              {isCafeOpen ? (
                <>
                  <button onClick={handleCheckout} style={{ width: '100%', padding: '15px', borderRadius: 14, border: 'none', background: (payMode === 'ONLINE' && paymentStatus !== 'SUCCESS' ? 'linear-gradient(135deg,#3b82f6,#2563eb)' : 'linear-gradient(135deg,#25D366,#128C7E)'), color: '#fff', fontWeight: 900, fontSize: 15, cursor: 'pointer', boxShadow: (payMode === 'ONLINE' && paymentStatus !== 'SUCCESS' ? '0 6px 24px rgba(59,130,246,0.3)' : '0 6px 24px rgba(37,211,102,0.3)'), fontFamily: 'Outfit, sans-serif' }}>
                    {payMode === 'ONLINE' && paymentStatus !== 'SUCCESS' ? '💳 Pay Now' : '🚀 Place Order via WhatsApp'}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: 11, color: '#475569', marginTop: 8 }}>Order dispatched to both WhatsApp channels ✅</p>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '15px', borderRadius: 14, background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 800 }}>
                  🛑 Cafe is Closed
                </div>
              )}
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

  const [menuEditState, setMenuEditState] = useState({ id: '', name: '', price: '', category: ALL_CATEGORIES[0], image: '', imageFile: null, description: '', isVeg: true });
  const [isUploading, setIsUploading] = useState(false);

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    // Replace with your actual ImgBB API key
    const API_KEY = '6b110bc5c30fb8ebf0ef7eeb5562828b';
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, { method: 'POST', body: formData });
    const data = await res.json();
    if(data.success) return data.data.url;
    throw new Error('Upload failed');
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (!menuEditState.name || !menuEditState.price) { alert('Name and Price are required!'); return; }
    
    setIsUploading(true);
    let finalImageUrl = menuEditState.image || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80';
    
    try {
      if (menuEditState.imageFile) {
        finalImageUrl = await uploadToImgBB(menuEditState.imageFile);
      }
    } catch (error) {
      alert('⚠️ Image upload failed. Using default/previous image.');
    }

    if (menuEditState.id) {
      // Update existing
      setDynamicMenu(p => p.map(it => it.id === menuEditState.id ? { ...it, name: menuEditState.name, price: parseInt(menuEditState.price), category: menuEditState.category, image: finalImageUrl, description: menuEditState.description || it.description, isVeg: menuEditState.isVeg } : it));
      alert('✅ Item updated!');
    } else {
      // Add new
      const item = { id: `c_${Date.now()}`, category: menuEditState.category, name: menuEditState.name, price: parseInt(menuEditState.price), isVeg: menuEditState.isVeg, image: finalImageUrl, description: menuEditState.description || 'New item by owner.', ingredients: ['Special Recipe'], calories: 'N/A', prepTime: 'N/A' };
      setDynamicMenu(p => [...p, item]);
      alert(`✅ "${item.name}" added to menu!`);
    }
    setMenuEditState({ id: '', name: '', price: '', category: ALL_CATEGORIES[0], image: '', imageFile: null, description: '', isVeg: true });
    setIsUploading(false);
  };

  const handleEditItem = (it) => setMenuEditState({ id: it.id, name: it.name, price: it.price, category: it.category, image: it.image, imageFile: null, description: it.description, isVeg: it.isVeg });
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
              <div>
                <label style={S.label}>Item Image (Upload)</label>
                <input type="file" accept="image/*" capture="environment" onChange={e => setMenuEditState(p => ({ ...p, imageFile: e.target.files[0] }))} style={{ ...S.input, background: 'rgba(255,255,255,0.02)', padding: '8px' }} />
                {menuEditState.image && !menuEditState.imageFile && <p style={{ fontSize: 11, color: '#4ecca3', marginTop: 6 }}>Current: <a href={menuEditState.image} target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>View Image</a></p>}
                {menuEditState.imageFile && <p style={{ fontSize: 11, color: '#f59e0b', marginTop: 6 }}>Ready to upload: {menuEditState.imageFile.name}</p>}
              </div>
              <div><label style={S.label}>Description (Optional)</label><input value={menuEditState.description} onChange={e => setMenuEditState(p => ({ ...p, description: e.target.value }))} placeholder="Short description..." style={S.input} /></div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#e8e8e8', cursor: 'pointer' }}>
                <input type="checkbox" checked={menuEditState.isVeg} onChange={e => setMenuEditState(p => ({ ...p, isVeg: e.target.checked }))} style={{ accentColor: '#4ecca3' }} /> Veg Item
              </label>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" disabled={isUploading} style={{ ...S.btn, flex: 1, background: isUploading ? '#64748b' : 'linear-gradient(135deg,#4ecca3,#38b2ac)' }}>
                  {isUploading ? '⏳ Uploading...' : (menuEditState.id ? '💾 Update Item' : '✅ Add Item')}
                </button>
                {menuEditState.id && <button type="button" disabled={isUploading} onClick={() => setMenuEditState({ id: '', name: '', price: '', category: ALL_CATEGORIES[0], image: '', imageFile: null, description: '', isVeg: true })} style={{ ...S.btn, background: '#334155', color: '#e2e8f0', flex: 1 }}>Cancel Edit</button>}
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
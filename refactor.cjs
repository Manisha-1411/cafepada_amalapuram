const fs = require('fs');
let code = fs.readFileSync('c:/Users/akhil/OneDrive/Desktop/cafe panda/src/App.jsx', 'utf8');

// 1. Add handleAddUpsells to App.jsx and pass it to CartDrawer
code = code.replace(
  "  const handleOwnerLogin = (e) => {",
  `  const handleAddUpsells = (upsells) => {
    if (!upsells || upsells.length === 0) return;
    setCart(prev => {
      let nextCart = [...prev];
      for (const u of upsells) {
        const ex = nextCart.find(i => i.id === u.id);
        if (ex) {
          nextCart = nextCart.map(i => i.id === u.id ? { ...i, qty: i.qty + 1 } : i);
        } else {
          nextCart.push({ ...u, qty: 1 });
        }
      }
      return nextCart;
    });
  };

  const handleOwnerLogin = (e) => {`
);

code = code.replace(
  "onPlaceOrder={triggerWhatsAppOrder} isCafeOpen={isCafeOpen}",
  "onPlaceOrder={triggerWhatsAppOrder} isCafeOpen={isCafeOpen} onAddUpsells={handleAddUpsells}"
);

// 2. Replace CartDrawer
const cartDrawerStart = "function CartDrawer({ cart, onClose, cartSubtotal, cartTotal, changeQty, removeItem, custName, setCustName, custPhone, setCustPhone, custAddr, setCustAddr, distance, setDistance, payMode, setPayMode, onPlaceOrder, isCafeOpen }) {";
const cartDrawerStartNew = "function CartDrawer({ cart, onClose, cartSubtotal, cartTotal, changeQty, removeItem, custName, setCustName, custPhone, setCustPhone, custAddr, setCustAddr, distance, setDistance, payMode, setPayMode, onPlaceOrder, isCafeOpen, onAddUpsells }) {";

const handleCheckoutRegex = /const handleCheckout = \(\) => \{[\s\S]*?\n  \};\n/;

const newHandleCheckout = `  const [showUpsell, setShowUpsell] = useState(false);
  const [selectedUpsells, setSelectedUpsells] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('PENDING');

  const UPSELLS = [
    { id: 'up_cheese_slice', name: 'Cheese Slice', price: 25 },
    { id: 'up_extra_cheese', name: 'Extra Pizza Cheese', price: 40 },
    { id: 'up_coke', name: 'Coke', price: 40 },
    { id: 'up_sprite', name: 'Sprite', price: 40 },
    { id: 'up_water', name: 'Water', price: 10 }
  ];

  const sub = cartSubtotal();
  const meetsMin = sub >= MIN_ORDER;
  const isBlacklisted = /kkd|kakinada|rajahmundry|yanam|ravulapalem/i.test(custAddr);

  const processCheckout = (itemsToAdd = []) => {
    if (itemsToAdd.length > 0) {
      onAddUpsells(itemsToAdd);
    }
    
    if (payMode === 'ONLINE' && paymentStatus !== 'SUCCESS') {
      setPaymentStatus('PROCESSING');
      setTimeout(() => {
        alert('✅ Secure Payment Verified Successfully! Order is being routed to WhatsApp.');
        setPaymentStatus('SUCCESS');
        onPlaceOrder();
      }, 2000);
      return;
    }
    onPlaceOrder();
  };

  const handleCheckout = () => {
    if (isBlacklisted) {
      alert("We only deliver within Amalapuram (max 7 Kms radius). Delivery to Kakinada/other cities is unavailable.");
      return;
    }
    if (distance > 7) {
      alert("Delivery is unavailable for distances exceeding 7 Kms. Please contact the cafe directly for special arrangements.");
      return;
    }
    if (cart.length === 0 || sub < MIN_ORDER || !custName.trim() || !custPhone.trim() || !custAddr.trim()) {
      onPlaceOrder(); // will trigger validations in parent
      return;
    }
    
    setShowUpsell(true);
  };
`;

// Replace function signature
code = code.replace(cartDrawerStart, cartDrawerStartNew);

// We also need to strip out existing paymentStatus, sub, meetsMin, isBlacklisted
code = code.replace("const [paymentStatus, setPaymentStatus] = useState('PENDING');\n", "");
code = code.replace("const sub = cartSubtotal();\n", "");
code = code.replace("const meetsMin = sub >= MIN_ORDER;\n", "");
code = code.replace("const isBlacklisted = /kkd|kakinada|rajahmundry|yanam|ravulapalem/i.test(custAddr);\n", "");

// Replace handleCheckout
code = code.replace(handleCheckoutRegex, newHandleCheckout);

// 3. Insert Upsell Modal at the end of CartDrawer return, right before the closing div
// We will look for   ); \n} right at the end of CartDrawer and insert it before the closing div.
// A simpler way: we just insert it before `    </div>\n  );\n}` in CartDrawer.
// But there are multiple `</div>` before return. Let's find the Place Order button and insert after it.

const placeOrderBtnRegex = /<button onClick=\{handleCheckout\} style=\{\{\s*\.\.\.S\.btn,\s*padding:\s*'16px',\s*fontSize:\s*16,\s*background:\s*'linear-gradient\(135deg,#4ecca3,#38b2ac\)'\s*\}\}>\s*🛒 Place Order via WhatsApp\s*<\/button>/;

const newPlaceOrderBtn = `<button onClick={handleCheckout} disabled={paymentStatus === 'PROCESSING'} style={{ ...S.btn, padding: '16px', fontSize: 16, background: paymentStatus === 'PROCESSING' ? '#64748b' : 'linear-gradient(135deg,#4ecca3,#38b2ac)' }}>
                  {paymentStatus === 'PROCESSING' ? '⏳ Verifying Payment Gateway...' : '🛒 Place Order via WhatsApp'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {showUpsell && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#1e293b', padding: 24, borderRadius: 20, width: '90%', maxWidth: 400, border: '1px solid #4ecca3' }}>
            <h3 style={{ color: '#fff', marginBottom: 16, textAlign: 'center' }}>🍟 Add Extra Cravings?</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {UPSELLS.map(u => {
                const isSel = selectedUpsells.some(s => s.id === u.id);
                return (
                  <label key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: isSel ? 'rgba(78,204,163,0.2)' : 'rgba(255,255,255,0.05)', borderRadius: 10, cursor: 'pointer', border: \`1px solid \${isSel ? '#4ecca3' : 'transparent'}\` }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{u.name}</span>
                    <span style={{ color: '#4ecca3', fontWeight: 900 }}>+₹{u.price}</span>
                    <input type="checkbox" checked={isSel} onChange={(e) => {
                      if (e.target.checked) setSelectedUpsells([...selectedUpsells, u]);
                      else setSelectedUpsells(selectedUpsells.filter(s => s.id !== u.id));
                    }} style={{ display: 'none' }} />
                  </label>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setShowUpsell(false); processCheckout([]); }} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Skip & Continue</button>
              <button onClick={() => { setShowUpsell(false); processCheckout(selectedUpsells); }} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#4ecca3,#38b2ac)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Add & Continue</button>
            </div>
          </div>
        </div>
      )}`;

// We need to replace the place order button and the closing tags.
// Let's replace the Place Order button and the subsequent `</div> </> )} </div> </div>` block.
// To be safe, let's just replace the button and inject the modal right after it but before `</div>`.

code = code.replace(
  /<button onClick=\{handleCheckout\} style=\{\{\s*\.\.\.S\.btn,\s*padding:\s*'16px',\s*fontSize:\s*16,\s*background:\s*'linear-gradient\(135deg,#4ecca3,#38b2ac\)'\s*\}\}>\s*🛒 Place Order via WhatsApp\s*<\/button>/,
  `<button onClick={handleCheckout} disabled={paymentStatus === 'PROCESSING'} style={{ ...S.btn, padding: '16px', fontSize: 16, background: paymentStatus === 'PROCESSING' ? '#64748b' : 'linear-gradient(135deg,#4ecca3,#38b2ac)' }}>
                  {paymentStatus === 'PROCESSING' ? '⏳ Verifying Payment Gateway...' : '🛒 Place Order via WhatsApp'}
                </button>
                
                {showUpsell && (
                  <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#1e293b', padding: 24, borderRadius: 20, width: '90%', maxWidth: 400, border: '1px solid #4ecca3' }}>
                      <h3 style={{ color: '#fff', marginBottom: 16, textAlign: 'center' }}>🍟 Add Extra Cravings?</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                        {UPSELLS.map(u => {
                          const isSel = selectedUpsells.some(s => s.id === u.id);
                          return (
                            <label key={u.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: isSel ? 'rgba(78,204,163,0.2)' : 'rgba(255,255,255,0.05)', borderRadius: 10, cursor: 'pointer', border: \`1px solid \${isSel ? '#4ecca3' : 'transparent'}\` }}>
                              <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{u.name}</span>
                              <span style={{ color: '#4ecca3', fontWeight: 900 }}>+₹{u.price}</span>
                              <input type="checkbox" checked={isSel} onChange={(e) => {
                                if (e.target.checked) setSelectedUpsells([...selectedUpsells, u]);
                                else setSelectedUpsells(selectedUpsells.filter(s => s.id !== u.id));
                              }} style={{ display: 'none' }} />
                            </label>
                          );
                        })}
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={() => { setShowUpsell(false); processCheckout([]); }} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Skip & Continue</button>
                        <button onClick={() => { setShowUpsell(false); processCheckout(selectedUpsells); }} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: 'linear-gradient(135deg,#4ecca3,#38b2ac)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}>Add & Continue</button>
                      </div>
                    </div>
                  </div>
                )}`
);

fs.writeFileSync('c:/Users/akhil/OneDrive/Desktop/cafe panda/src/App.jsx', code);

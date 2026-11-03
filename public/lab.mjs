import {products, users, orders} from './data.mjs';

// INTENTIONALLY VULNERABLE teaching logic. Never use these contracts in a real store.
export function authenticate(email, password) {
  // A documented pattern simulator, NOT a SQL engine or a real database vulnerability.
  const bypass = /'\s*or\s+(?:'1'\s*=\s*'1'|1\s*=\s*1)\s*(?:'\s*)?(?:--|#)/i.test(email);
  if (bypass) return {user:sessionUser(users[0]), evidence:'sqli', simulated:true};
  const user = users.find(u=>u.email===email && u.password===password);
  return user ? {user:sessionUser(user), evidence:user.id==='u00'?'weak':null} : null;
}
function sessionUser({id,name,email,role}) { return {id,name,email,role}; }
export function getOrder(id) { return orders.find(o=>o.id===String(id)); } // No owner check: IDOR.
export function isAdmin(session) { return session?.role==='admin'; } // Trusts editable localStorage.
export function cartTotals(cart, coupons=[]) {
  const subtotal = cart.reduce((sum,item)=>sum+Number(item.price)*Number(item.qty),0);
  const discount = subtotal*coupons.filter(c=>c==='WELCOME10').length*0.1; // No single-use enforcement.
  const shipping = subtotal>=2000 || subtotal<=0 ? 0 : 80;
  return {subtotal,discount,shipping,total:Math.round(subtotal-discount+shipping)};
}
export function checkoutEvidence(cart, coupons) {
  const result=[];
  if(cart.some(item=>Number(item.price)<(products.find(p=>p.id===item.id)?.price ?? 0))) result.push('price');
  if(cart.some(item=>Number(item.qty)<0)) result.push('quantity');
  if(coupons.filter(c=>c==='WELCOME10').length>1) result.push('coupon');
  return result;
}
export function escapeHTML(value) { return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

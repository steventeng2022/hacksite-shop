import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {authenticate,getOrder,isAdmin,cartTotals,checkoutEvidence,escapeHTML} from '../public/lab.mjs';
import {challenges,products} from '../public/data.mjs';

test('normal customer journey retains expected prices and shipping',()=>{
  assert.equal(authenticate('alice@example.test','wrong'),null);
  const a=authenticate('alice@example.test','alice123');
  assert.equal(a.user.id,'u01');assert.equal(a.user.password,undefined);
  assert.deepEqual(cartTotals([{id:'p02',price:890,qty:1}],[]),{subtotal:890,discount:0,shipping:80,total:970});
  assert.equal(cartTotals([{id:'p01',price:3280,qty:1}],['WELCOME10']).total,2952);
});
test('weak admin credentials and documented SQLi pattern demonstrate separate lessons',()=>{
  assert.equal(authenticate('admin@example.test','admin123').evidence,'weak');
  const bypass=authenticate("' OR '1'='1' --",'anything');
  assert.equal(bypass.evidence,'sqli');assert.equal(bypass.simulated,true);
  assert.equal(authenticate("' OR 1=1 --",'x').user.id,'u01');
  assert.equal(authenticate('normal@example.test','x'),null);
});
test('IDOR and role forgery remain intentionally reproducible',()=>{
  assert.equal(getOrder('1002').userId,'u02');
  assert.equal(getOrder('missing'),undefined);
  assert.equal(isAdmin({id:'u01',role:'customer'}),false);
  assert.equal(isAdmin({id:'u01',role:'admin'}),true);
});
test('tampered prices and negative quantities affect checkout and evidence',()=>{
  const low=[{id:'p01',price:1,qty:1}];
  assert.equal(cartTotals(low).total,81);
  assert.deepEqual(checkoutEvidence(low,[]),['price']);
  const neg=[{id:'p01',price:3280,qty:-1}];
  assert.equal(cartTotals(neg).total,-3280);
  assert.deepEqual(checkoutEvidence(neg,[]),['quantity']);
  assert.deepEqual(checkoutEvidence([{id:'p01',price:3280,qty:1}],[]),[]);
});
test('repeated coupons stack, documenting the business logic defect',()=>{
  const codes=['WELCOME10','WELCOME10'];const items=[{id:'p01',price:3280,qty:1}];
  assert.equal(cartTotals(items,codes).total,2624);
  assert.deepEqual(checkoutEvidence(items,codes),['coupon']);
});
test('parent app escapes payloads and isolates the only raw HTML sink',async()=>{
  assert.equal(escapeHTML('<img src=x onerror="x">'), '&lt;img src=x onerror=&quot;x&quot;&gt;');
  const app=await readFile(new URL('../public/app.mjs',import.meta.url),'utf8');
  const frame=await readFile(new URL('../public/preview.html',import.meta.url),'utf8');
  assert.ok(app.includes('sandbox="allow-scripts"'));
  assert.ok(!app.includes('sandbox="allow-scripts allow-same-origin"'));
  assert.ok(!app.includes('.srcdoc'));
  assert.ok(app.includes("event.origin!=='null'"));
  assert.ok(app.includes('event.source===job.window&&event.data.nonce===job.nonce'));
  assert.ok(frame.includes("connect-src 'none'"));
  assert.ok(frame.includes("form-action 'none'"));
  assert.ok(frame.includes('event.source !== parent'));
});
test('all ten challenges have stable IDs, explanations and repair guidance',()=>{
  assert.equal(challenges.length,10);assert.equal(new Set(challenges.map(c=>c.id)).size,10);
  for(const c of challenges){for(const field of ['goal','hint','solution','fix','kind','route'])assert.ok(c[field],`${c.id}: ${field}`)}
  assert.equal(new Set(products.map(p=>p.id)).size,products.length);
});
test('public diagnostic values are explicitly fake and unusable',async()=>{
  const c=JSON.parse(await readFile(new URL('../public/debug/config.json',import.meta.url),'utf8'));
  assert.equal(c.diagnostic_code,'NOVA-DEMO-2026');
  assert.ok(c.payment_api_key.startsWith('DEMO-ONLY'));
  assert.ok(c.database_password.startsWith('DEMO-ONLY'));
});

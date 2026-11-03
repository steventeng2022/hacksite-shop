import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Window} from 'happy-dom';

// DOM integration tests are not a browser/CSP execution test. The real XSS boundary
// also needs manual browser QA; iframe network and script loading are disabled here.
test('storefront renders and completes shopping, account, order and reset flows',async()=>{
  const window=new Window({url:'http://localhost/hacksite-shop/',settings:{disableJavaScriptFileLoading:true,disableJavaScriptEvaluation:true,disableIframePageLoading:true,disableCSSFileLoading:true}});
  const bindings={window,document:window.document,location:window.location,localStorage:window.localStorage,FormData:window.FormData,addEventListener:window.addEventListener.bind(window),setTimeout:window.setTimeout.bind(window),clearTimeout:window.clearTimeout.bind(window)};
  const previous=new Map();
  for(const [key,value]of Object.entries(bindings)){previous.set(key,Object.getOwnPropertyDescriptor(globalThis,key));Object.defineProperty(globalThis,key,{value,configurable:true,writable:true})}
  const doc=window.document;
  const tick=()=>window.happyDOM.waitUntilComplete();
  const navigate=async hash=>{window.location.hash=hash;await tick();await tick()};
  const click=selector=>{const el=doc.querySelector(selector);assert.ok(el,selector);el.click()};
  const submit=selector=>{const form=doc.querySelector(selector);assert.ok(form,selector);form.dispatchEvent(new window.Event('submit',{bubbles:true,cancelable:true}))};
  try{
    doc.write(await readFile(new URL('../public/index.html',import.meta.url),'utf8'));
    await import('../public/app.mjs');
    assert.match(doc.querySelector('h1').textContent,/讓日常/);
    assert.equal(doc.querySelectorAll('.product-card').length,4);
    await navigate('/shop');assert.equal(doc.querySelectorAll('.product-card').length,8);
    await navigate('/shop?category=數位生活');assert.equal(doc.querySelectorAll('.product-card').length,3);
    await navigate('/product/p01');assert.ok(doc.querySelector('#add-form'));
    submit('#add-form');assert.equal(JSON.parse(window.localStorage.hs_cart)[0].qty,1);
    await navigate('/cart');assert.match(doc.querySelector('.summary').textContent,/3,280/);
    doc.querySelector('#coupon').value='WELCOME10';submit('#coupon-form');
    doc.querySelector('#coupon').value='WELCOME10';submit('#coupon-form');
    assert.match(doc.querySelector('.summary').textContent,/2,624/);
    assert.ok(JSON.parse(window.localStorage.hs_progress).includes('coupon'));
    await navigate('/checkout');assert.equal(doc.querySelector('#recipient-email').value,'demo@example.test');
    submit('#checkout-form');await tick();await tick();
    assert.match(doc.querySelector('h1').textContent,/謝謝/);
    assert.equal(JSON.parse(window.localStorage.hs_orders)[0].total,2624);
    assert.equal(JSON.parse(window.localStorage.hs_cart).length,0);
    await navigate('/account');click('[data-action="fill-login"]');submit('#login-form');
    assert.equal(JSON.parse(window.localStorage.hs_session).id,'u01');await tick();await tick();
    assert.match(doc.querySelector('.account-panel h1').textContent,/Alice/);
    await navigate('/orders?id=1002');assert.match(doc.querySelector('.order-meta').textContent,/Bob Lin/);
    assert.ok(JSON.parse(window.localStorage.hs_progress).includes('idor'));
    const s=JSON.parse(window.localStorage.hs_session);s.role='admin';window.localStorage.hs_session=JSON.stringify(s);
    await navigate('/admin');assert.ok(doc.querySelector('.data-table'));
    assert.ok(JSON.parse(window.localStorage.hs_progress).includes('role'));
    await navigate('/product/p01');doc.querySelector('#review-body').value='<img src=x onerror="labProof()">';submit('#review-form');
    assert.equal(JSON.parse(window.localStorage.hs_reviews).length,1);
    const frame=doc.querySelector('iframe');assert.equal(frame.getAttribute('sandbox'),'allow-scripts');
    assert.equal(doc.querySelectorAll('#main img[onerror]').length,0);
    await navigate('/shop?q=%3Cimg%20src%3Dx%20onerror%3D%22labProof()%22%3E');
    assert.ok(doc.querySelector('iframe'));assert.equal(doc.querySelectorAll('#main img[onerror]').length,0);
    await navigate('/cart');assert.match(doc.querySelector('h2').textContent,/購物袋/);
    window.localStorage.setItem('unrelated_site_data','keep');
    click('[data-action="lab"]');assert.equal(doc.querySelectorAll('.challenge').length,10);
    click('[data-action="reset"]');click('[data-action="confirm-reset"]');await tick();await tick();
    assert.equal(window.localStorage.getItem('hs_session'),null);
    assert.equal(window.localStorage.getItem('hs_reviews'),null);
    assert.equal(window.localStorage.getItem('unrelated_site_data'),'keep');
    assert.match(doc.querySelector('#lab-count').textContent,/0\/10/);
  }finally{
    await window.happyDOM.close();
    for(const [key,descriptor]of previous){if(descriptor)Object.defineProperty(globalThis,key,descriptor);else delete globalThis[key]}
  }
});

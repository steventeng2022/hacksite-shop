import {cp,mkdir,readFile} from 'node:fs/promises';
const required=['index.html','app.mjs','styles.css','lab.mjs','data.mjs','art.mjs','preview.html','debug/config.json','assets/favicon.svg'];
for(const file of required)await readFile(new URL('../public/'+file,import.meta.url));
const config=JSON.parse(await readFile(new URL('../public/debug/config.json',import.meta.url),'utf8'));
if(!config.notice.includes('fictional')||!config.payment_api_key.startsWith('DEMO-ONLY'))throw Error('Diagnostic fixture must stay fictional');
await mkdir(new URL('../dist/',import.meta.url),{recursive:true});
await cp(new URL('../public/',import.meta.url),new URL('../dist/',import.meta.url),{recursive:true});
console.log('Built static site in dist/ — no external runtime dependencies.');

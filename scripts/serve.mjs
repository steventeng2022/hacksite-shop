import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('public');
const port=Number(process.env.PORT||4173);
const mime={'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    // Support both local root and the eventual GitHub project subpath.
    const pathname=decodeURIComponent(url.pathname).replace(/^\/hacksite-shop(?=\/|$)/,'');
    const path=resolve(root,'.'+(pathname==='/'||pathname===''?'/index.html':pathname));
    if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403);res.end('Forbidden');return}
    if(!(await stat(path)).isFile())throw Error('Not a file');
    const body=await readFile(path);
    res.writeHead(200,{'Content-Type':mime[extname(path)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(body);
  }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found')}
});
server.listen(port,'127.0.0.1',()=>console.log(`NOVA preview: http://127.0.0.1:${port}/hacksite-shop/`));
for(const sig of ['SIGINT','SIGTERM'])process.on(sig,()=>server.close(()=>process.exit(0)));

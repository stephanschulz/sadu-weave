/* bake: route the page's default values in Node and store them inside net12.html
   usage:  node net12-bake.js net12.html     (re-run after changing routing code or default values) */
const fs=require('fs'), zlib=require('zlib'); const F=process.argv[2]; let html=fs.readFileSync(F,'utf8');
eval(html.split('/*CORE-BEGIN*/')[1].split('/*CORE-END*/')[0]);
const IDS=JSON.parse(html.match(/const IDS=(\[[^\]]*\])/)[1]);
const p={}; for(const id of IDS){ const m=html.match(new RegExp('id="'+id+'" value="([^"]*)"')); if(!m) throw new Error('no default for '+id); p[id]=+m[1]; }
p.diagonals=/id="diagonals" checked/.test(html); p.rerouteShare=0.12; p.repairRounds=+html.match(/p\.repairRounds=(\d+)/)[1];
const t0=Date.now(); const net=buildNet(p); const bulbs=placeBulbs(p,net,mulberry32((p.bulbSeed*9973+17)>>>0));
const g=routeAll(p,net,bulbs,(p.seed*7919+3)>>>0); let r; while(!(r=g.next()).done); const res=r.value; const st=netStats(p,net,res);
console.log('routed in',((Date.now()-t0)/1000).toFixed(1),'s  uncov',st.uncov,'overlap',st.bulbOverlap,'ties',st.ties,'tmax',st.tmax.toFixed(2),'cv',st.cv.toFixed(2));
const Q=400, N=p.N, bufs=[]; const hdr=Buffer.from(JSON.stringify({key:JSON.stringify(p), N, q:Q, repairs:res.repairs}));
const u32=Buffer.alloc(4); u32.writeUInt32LE(hdr.length); bufs.push(u32,hdr);
const f32=(arr)=>{ const b=Buffer.alloc(4*arr.length); arr.forEach((v,i)=>b.writeFloatLE(v,4*i)); bufs.push(b); };
f32(res.cab.flatMap(c=>c.bulb)); f32(res.cab.map(c=>c.anchorX)); f32(res.cab.map(c=>c.tail)); f32(res.cab.map(c=>c.over)); f32(res.cab.map(c=>c.longTail));
let esc=0;
for(const c of res.cab){ const n=c.nodes.length, b=[]; const h=Buffer.alloc(6); let x=Math.round(net.nx[c.nodes[0]]*Q), y=Math.round(net.ny[c.nodes[0]]*Q); h.writeUInt16LE(n,0); h.writeUInt16LE(x,2); h.writeUInt16LE(y,4); b.push(h);
  for(let q=1;q<n;q++){ const X=Math.round(net.nx[c.nodes[q]]*Q), Y=Math.round(net.ny[c.nodes[q]]*Q), dx=X-x, dy=Y-y;
    if(dx>-128 && dx<128 && dy>-128 && dy<128){ const d=Buffer.alloc(2); d.writeInt8(dx,0); d.writeInt8(dy,1); b.push(d); }
    else { const d=Buffer.alloc(6); d.writeInt8(-128,0); d.writeInt8(0,1); d.writeUInt16LE(X,2); d.writeUInt16LE(Y,4); b.push(d); esc++; }
    x=X; y=Y; }
  bufs.push(...b); }
const raw=Buffer.concat(bufs), gz=zlib.gzipSync(raw,{level:9}), b64=gz.toString('base64');
const open='<script id="net12pre" type="text/plain">'; const i=html.indexOf(open); if(i<0) throw new Error('no placeholder'); const j=html.indexOf('</script>',i);
html=html.slice(0,i+open.length)+b64+html.slice(j); fs.writeFileSync(F,html);

console.log('raw',raw.length,'gzip',gz.length,'base64',b64.length,'escapes',esc,'page bytes',html.length);

import{readFileSync as R,readdirSync as E,mkdirSync as M,writeFileSync as W}from'node:fs';
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
let W2,D,wall;
const S=(a,b)=>a-b;
function B(s,bx,ok){let P=new Map([[s,[0,'',0]]]),q=[s];for(let h=0;h<q.length;h++){let c=q[h],d=P.get(c)[2]+1;for(let k=0;k<4;k++){let n=c+D[k][0];if(!wall[n]&&!P.has(n)&&!(bx&&bx.includes(n))&&(!ok||ok(n)))P.set(n,[c,D[k][1],d]),q.push(n)}}return P}
function Pt(P,t){let s='';for(let e=P.get(t);e&&e[0];e=P.get(e[0]))s=e[1]+s;return s}
function AR(cl,bx,gl,en){
let n=bx.length,ok=c=>cl.has(c)||c===en;
let DG=gl.map(g=>B(g,0,ok));
let lv=new Set(gl),ch=1;
while(ch){ch=0;for(let c of cl){if(lv.has(c))continue;for(let k=0;k<4;k++){let o=D[k][0];if(lv.has(c+o)&&(c-o===en||cl.has(c-o))){lv.add(c);ch=1;break}}}}
let HC=new Map();
function H(b){let k=b.join(),v=HC.get(k);if(v!==undefined)return v;let s=0;for(let x of b){let m=1e9;for(let j=0;j<n;j++){let e=DG[j].get(x);if(e&&e[2]<m)m=e[2]}s+=m}v=s;HC.set(k,v);return v}
let it={b:[...bx].sort(S),p:en,m:'',g:0},h0=H(it.b);
if(h0>=1e9)return null;
let V=new Map([[it.b.join()+','+it.p,0]]),Bk=[],ex=0;
Bk[h0]=[it];let cur=h0;
while(1){
while(!Bk[cur]||!Bk[cur].length){cur++;if(cur>=Bk.length)return null}
let s=Bk[cur].pop();
if(V.get(s.b.join()+','+s.p)!==s.g)continue;
if(s.b.every(x=>gl.includes(x)))return s;
if(++ex>4e5)return null;
let P=B(s.p,s.b,ok);
for(let i=0;i<n;i++){let x=s.b[i];
for(let k=0;k<4;k++){let o=D[k][0],t=x+o,y=x-o;
if(!lv.has(t)||s.b.includes(t)||!P.has(y))continue;
let nb=[...s.b];nb[i]=t;nb.sort(S);
let hh=H(nb);if(hh>=1e9)continue;
let ng=s.g+1,kk=nb.join()+','+x;
if(V.has(kk)&&V.get(kk)<=ng)continue;
V.set(kk,ng);
let f=ng+hh;(Bk[f]=Bk[f]||[]).push({b:nb,p:x,m:s.m+Pt(P,y)+D[k][1],g:ng});
}}}
}
function solve(t){
let r=t.split('\n').filter(x=>x.length),H=r.length,W=0;
for(let x of r)W=Math.max(W,x.length);
W2=W+2;D=[[-W2,'u'],[W2,'d'],[-1,'l'],[1,'r']];
wall=new Array(W2*(H+2)).fill(true);
let G=[],Bx=[],pl=0,hy=0,Y=i=>((i-1)/W2|0)-1;
r.forEach((s,y)=>{for(let x=0;x<s.length;x++){let c=s[x],i=(y+1)*W2+x+1;if(c!=='#')wall[i]=false;if(c>='*'&&c<='.')G.push(i);if(c==='$'||c==='*')Bx.push(i);if(c==='@'||c==='+'){pl=i;hy=y}}});
let seen=new Set(),rooms=[];
for(let i=0;i<wall.length;i++){let y=Y(i);if(wall[i]||y===hy||seen.has(i))continue;let cp=new Set([i]),q=[i];seen.add(i);for(let h=0;h<q.length;h++){let c=q[h];for(let k=0;k<4;k++){let n=c+D[k][0];if(!wall[n]&&Y(n)!==hy&&!seen.has(n)){seen.add(n);cp.add(n);q.push(n)}}}rooms.push(cp)}
let mv='',cur=pl,AB=[...Bx];
for(let cp of rooms){
let rb=AB.filter(x=>cp.has(x)),rg=G.filter(x=>cp.has(x));
if(!rb.length)continue;
let en=0;
for(let c of cp){for(let k=0;k<4;k++){let n=c+D[k][0];if(Y(n)===hy&&!wall[n]){en=n;break}}if(en)break}
if(!en)return '';
let P=B(cur,AB,0);
if(!P.has(en))return '';
mv+=Pt(P,en);cur=en;
let s=AR(cp,rb,rg,en);
if(!s)return '';
mv+=s.m;cur=s.p;AB=AB.filter(x=>!rb.includes(x)).concat(s.b);
}
return mv;
}
for(let d of E(I).sort().filter(d=>d[0]==='i')){let m=solve(R(I+'/'+d+'/level.txt','utf8'));M(O+'/'+d,{recursive:true});W(O+'/'+d+'/solution.txt',m)}

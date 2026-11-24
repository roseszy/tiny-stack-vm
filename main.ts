import{readdirSync,readFileSync,writeFileSync,mkdirSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of readdirSync(I).sort()){
const r=R(readFileSync(join(I,d,'program.bin')),readFileSync(join(I,d,'input.bin')));
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,'stdout.bin'),Buffer.from(r.o));
writeFileSync(join(O,d,'exit.txt'),r.c+'\n');
}
function R(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=[];
let s=0,c=0,pc=0,t=0,ip=0;const n=p.length;
const T=x=>({o,c:x});
for(;;){
if(t===1e6)return T(10);
if(pc<0||pc>=n)return T(9);
const b=p[pc];
const B=b>15&&b<35&&b!==23&&b!==27&&b!==31;
let m=0,u=0,v=0;
if(b===1){m=1;v=1}else if(b===2){m=4;v=1}
else if(b===3)u=1;
else if(b===4){u=1;v=2}
else if(b===5){u=2;v=2}
else if(b===6){u=2;v=3}
else if(b===7){u=3;v=3}
else if(B){u=2;v=1}
else if(b===23||b===27){u=1;v=1}
else if(b===48){m=2}
else if(b===49||b===50){m=2;u=1}
else if(b===51){m=2}
else if(b===52){}
else if(b===64){u=1;v=1}
else if(b===65){u=2}
else if(b===80||b===81){u=1}
else if(b===82){v=1}
else if(b===83){u=1}
else if(b!==0)return T(5);
if(pc+m>=n)return T(9);
t++;const nx=pc+1+m;
if(s<u)return T(2);
if(s-u+v>256)return T(3);
pc=nx;
if(b===0)return T(0);
if(b===1){D[s++]=(p[nx-1]<<24)>>24;continue}
if(b===2){D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;continue}
if(b===3){s--;continue}
if(b===4){D[s]=D[s-1];s++;continue}
if(b===5){const x=D[s-1];D[s-1]=D[s-2];D[s-2]=x;continue}
if(b===6){D[s]=D[s-2];s++;continue}
if(b===7){const x=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=x;continue}
if(b===23){D[s-1]=-D[s-1]|0;continue}
if(b===27){D[s-1]=~D[s-1];continue}
if(B){
const y=D[s-1],x=D[s-2];let r;
if(b===16)r=x+y|0;
else if(b===17)r=x-y|0;
else if(b===18)r=Math.imul(x,y);
else if(b===19){if(!y)return T(4);r=x===-2147483648&&y===-1?x:(x/y)|0}
else if(b===20){if(!y)return T(4);r=y===-1?0:x%y|0}
else if(b===21){if(!y)return T(4);r=Math.floor((x>>>0)/(y>>>0))|0}
else if(b===22){if(!y)return T(4);r=(x>>>0)%(y>>>0)|0}
else if(b===24)r=x&y;
else if(b===25)r=x|y;
else if(b===26)r=x^y;
else if(b===28)r=x<<(y&31);
else if(b===29)r=x>>(y&31);
else if(b===30)r=x>>>(y&31)|0;
else if(b===32)r=x===y?1:0;
else if(b===33)r=x<y?1:0;
else r=x>>>0<y>>>0?1:0;
s-=2;D[s++]=r;continue;
}
if(b>=48&&b<=50){
const rel=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
let take=1;
if(b!==48){const w=D[--s];take=b===49?w===0:w!==0}
if(take)pc=nx+rel;
continue;
}
if(b===51){
if(c===64)return T(7);
C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;continue;
}
if(b===52){
if(!c)return T(8);
pc=C[--c];continue;
}
if(b===64){
const a=D[s-1];
if(a<0||a>255)return T(6);
D[s-1]=M[a];continue;
}
if(b===65){
const a=D[s-1],w=D[s-2];
if(a<0||a>255)return T(6);
s-=2;M[a]=w;continue;
}
if(b===80){
const g=String(D[s-1]);
if(o.length+g.length>65536)return T(11);
s--;
for(let i=0;i<g.length;i++)o.push(g.charCodeAt(i));
continue;
}
if(b===81){
if(o.length+1>65536)return T(11);
o.push(D[--s]&255);continue;
}
if(b===82){D[s++]=ip<q.length?q[ip++]:-1;continue}
return T(D[--s]&255);
}
}

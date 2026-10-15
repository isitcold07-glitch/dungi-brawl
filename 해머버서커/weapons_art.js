/* ---------- 무기 그림 (시안 → 게임에 그대로 넣을 함수) ----------
   wArt(kind,lvl,opt): 현재 변환 기준 손잡이 끝(쥐는 곳)이 원점, 무기가 +x 방향으로 뻗는다.
   kind: hammer | twin | flail | pan,  lvl: 괴력 레벨 0~8 */
const OL='#1c1d2b';
function wPoly(pts,f,s=OL,w=2){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.fillStyle=f;ctx.fill();if(s){ctx.strokeStyle=s;ctx.lineWidth=w;ctx.stroke();}}
function wLG(x0,y0,x1,y1,...c){const g=ctx.createLinearGradient(x0,y0,x1,y1);c.forEach((col,i)=>g.addColorStop(i/(c.length-1),col));return g;}
function wHandle(len,w,lvl,wood='#8b5a2b',metal=false){
 ctx.fillStyle=metal?wLG(0,-w/2,0,w/2,'#e9ecef','#868e96','#495057'):wLG(0,-w/2,0,w/2,mix(wood,.3),wood,mix(wood,-.4));
 ctx.strokeStyle=OL;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(-4,-w/2,len+4,w,w/2);ctx.fill();ctx.stroke();
 if(lvl>=2&&!metal){ctx.fillStyle='#adb5bd';for(const u of[.25,.7]){ctx.fillRect(len*u-2,-w/2-1,4,w+2);ctx.strokeStyle=OL;ctx.lineWidth=1;ctx.strokeRect(len*u-2,-w/2-1,4,w+2);}}
 // 손잡이 감은 가죽
 ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=1.2;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(i*5,-w/2);ctx.lineTo(i*5+4,w/2);ctx.stroke();}}
function rune(x,y,s,col){ctx.save();ctx.strokeStyle=col;ctx.lineWidth=1.6;ctx.globalCompositeOperation='lighter';ctx.beginPath();ctx.moveTo(x-s,y-s);ctx.lineTo(x,y+s);ctx.lineTo(x+s,y-s);ctx.moveTo(x-s*.5,y);ctx.lineTo(x+s*.5,y);ctx.stroke();ctx.restore();}
function wGlow(x,y,r,col){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();ctx.restore();}

// 망치: 0 나무+회색 쇠머리 → 2 쇠테 → 4 강철 머리+모서리 장식 → 6 금 테두리·문양 → 8 룬이 빛나는 전설 망치
function artHammer(lvl){const L=46,hw=30,hh=20;wHandle(L,7,lvl);
 ctx.save();ctx.translate(L+hh/2-2,0);
 const body=lvl>=8?['#5c6b8a','#2b3350']:lvl>=4?['#dee2e6','#6c757d']:['#adb5bd','#5c636a'];
 if(lvl>=8)wGlow(0,0,34,'rgba(120,200,255,.55)');
 ctx.fillStyle=wLG(-hh/2,0,hh/2,0,mix(body[0],.3),body[0],body[1]);ctx.strokeStyle=OL;ctx.lineWidth=2.4;ctx.beginPath();ctx.roundRect(-hh/2,-hw/2,hh,hw,lvl>=4?3:5);ctx.fill();ctx.stroke();
 ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillRect(-hh/2+3,-hw/2+3,hh*.25,hw-6);
 if(lvl>=4){ctx.fillStyle=lvl>=6?'#ffd43b':'#495057';for(const sy of[-1,1]){ctx.beginPath();ctx.moveTo(-hh/2-2,sy*hw/2);ctx.lineTo(hh/2+2,sy*hw/2);ctx.lineTo(hh/2+2,sy*(hw/2-5));ctx.lineTo(-hh/2-2,sy*(hw/2-5));ctx.closePath();ctx.fill();ctx.strokeStyle=OL;ctx.lineWidth=1.5;ctx.stroke();}}
 if(lvl>=6){ctx.strokeStyle='#ffd43b';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(0,0,5,0,TAU);ctx.stroke();ctx.beginPath();ctx.moveTo(0,-9);ctx.lineTo(0,9);ctx.stroke();}
 if(lvl>=8){rune(0,-6,3.5,'#9be7ff');rune(0,6,3.5,'#9be7ff');}
 ctx.restore();}

// 쌍망치 (한 자루): 0 작은 목수 망치 → 2 쇠 손잡이 → 4 날렵한 강철 → 6 은·금 장식+리본 → 8 룬(side:+1 푸른빛, -1 붉은빛)
function artTwin(lvl,side=1){const L=30;wHandle(L,5.5,0,'#a0703c',lvl>=2);
 if(lvl>=6){ctx.save();ctx.strokeStyle=side>0?'#4dabf7':'#ff6b6b';ctx.lineWidth=3;ctx.lineCap='round';const w=Math.sin((window.time||0)*10)*3;ctx.beginPath();ctx.moveTo(2,2);ctx.quadraticCurveTo(-6,10+w,-12,14);ctx.stroke();ctx.restore();}
 ctx.save();ctx.translate(L+5,0);
 const glowC=side>0?'rgba(77,171,247,.6)':'rgba(255,90,90,.6)';if(lvl>=8)wGlow(0,0,24,glowC);
 const c=lvl>=8?(side>0?['#74c0fc','#1864ab']:['#ff8787','#a51111']):lvl>=4?['#f1f3f5','#868e96']:['#ced4da','#6c757d'];
 // 머리: 한쪽 납작한 타격면, 반대쪽 노루발(목수 망치) / 4레벨부터 날렵한 쐐기
 ctx.fillStyle=wLG(-6,0,6,0,mix(c[0],.3),c[0],c[1]);
 if(lvl<4){wPoly([[-6,-12],[6,-12],[6,-4],[4,-2],[4,9],[-6,9]],ctx.fillStyle,OL,2);ctx.fillStyle=c[1];wPoly([[-5,9],[4,9],[1,16],[-3,17]],c[1],OL,1.6);}
 else{wPoly([[-6,-15],[7,-13],[7,-4],[5,0],[7,4],[7,10],[-1,18],[-6,12]],ctx.fillStyle,OL,2);}
 ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillRect(-4,-10,3,14);
 if(lvl>=6){ctx.fillStyle='#ffd43b';ctx.fillRect(-6.5,-3,14,3);ctx.strokeStyle=OL;ctx.lineWidth=1;ctx.strokeRect(-6.5,-3,14,3);}
 if(lvl>=8)rune(1,-8,3,side>0?'#d0ebff':'#ffe3e3');
 ctx.restore();}

// 철퇴: 괴력 레벨마다 쇠구슬 가시 추가 (0 매끈 → 8 가시투성이). opt.chain: 사슬 길이, opt.ba: 구슬 방향(로컬 라디안)
function artFlail(lvl,opt={}){const L=28,cl=opt.chain??46,ba=opt.ba??.35;wHandle(L,7,lvl,'#6b4423');
 ctx.fillStyle='#868e96';ctx.strokeStyle=OL;ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(L+2,0,4.5,0,TAU);ctx.fill();ctx.stroke();
 const bx=L+2+Math.cos(ba)*cl,by=Math.sin(ba)*cl,n=Math.max(3,Math.round(cl/8));
 for(let i=1;i<=n;i++){const u=i/(n+1),x=L+2+(bx-L-2)*u,y=by*u+Math.sin(u*Math.PI)*cl*.12;ctx.save();ctx.translate(x,y);ctx.rotate(ba+(i%2)*Math.PI/2);ctx.strokeStyle=OL;ctx.lineWidth=4.2;ctx.beginPath();ctx.ellipse(0,0,4.6,2.6,0,0,TAU);ctx.stroke();ctx.strokeStyle='#ced4da';ctx.lineWidth=2;ctx.stroke();ctx.restore();}
 const R=13+Math.min(lvl,8)*.5,sp=[0,0,4,4,6,6,8,10,12][Math.min(lvl,8)];
 ctx.save();ctx.translate(bx,by);if(lvl>=8)wGlow(0,0,R*2.2,'rgba(255,80,60,.5)');
 for(let i=0;i<sp;i++){const a=i*TAU/sp+.3,l=R+6+lvl*.5;ctx.fillStyle=lvl>=6?'#e9ecef':'#adb5bd';wPoly([[Math.cos(a-.22)*R*.9,Math.sin(a-.22)*R*.9],[Math.cos(a)*l,Math.sin(a)*l],[Math.cos(a+.22)*R*.9,Math.sin(a+.22)*R*.9]],ctx.fillStyle,OL,1.5);}
 const g=ctx.createRadialGradient(-R*.35,-R*.4,R*.1,0,0,R*1.1);g.addColorStop(0,lvl>=8?'#6c6f86':'#ced4da');g.addColorStop(.5,lvl>=8?'#2b2d42':'#6c757d');g.addColorStop(1,lvl>=8?'#0d0e17':'#343a40');
 ctx.fillStyle=g;ctx.strokeStyle=OL;ctx.lineWidth=2.4;ctx.beginPath();ctx.arc(0,0,R,0,TAU);ctx.fill();ctx.stroke();
 if(lvl>=6){ctx.strokeStyle='#ffd43b';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,0,R,R*.35,0,0,TAU);ctx.stroke();}
 if(lvl>=8){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='#ff6b4a';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-R*.5,-R*.3);ctx.lineTo(-R*.1,R*.1);ctx.lineTo(R*.3,-R*.2);ctx.lineTo(R*.5,R*.3);ctx.stroke();ctx.restore();}
 ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.ellipse(-R*.35,-R*.4,R*.25,R*.15,-.6,0,TAU);ctx.fill();
 ctx.restore();}

// 프라이팬: 괴력 레벨에 따라 팬 위 음식 (0 빈 팬 → 2 계란 → 4 계란+베이컨 → 6 스테이크 → 8 은빛 팬+지글지글 스테이크)
function artPan(lvl){const L=30,R=21;
 ctx.fillStyle=wLG(0,-4,0,4,'#495057','#212529');ctx.strokeStyle=OL;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(-4,-3.5,L+6,7,3.5);ctx.fill();ctx.stroke();
 ctx.fillStyle='#868e96';ctx.beginPath();ctx.arc(2,0,1.6,0,TAU);ctx.fill();
 ctx.save();ctx.translate(L+R,0);
 const gold=lvl>=8;if(gold)wGlow(0,0,R*1.8,'rgba(220,235,255,.4)');
 ctx.fillStyle=gold?wLG(-R,-R,R,R,'#ffffff','#ced4da','#6c757d'):wLG(-R,-R,R,R,'#868e96','#343a40','#1c1d2b');ctx.strokeStyle=OL;ctx.lineWidth=2.6;ctx.beginPath();ctx.arc(0,0,R,0,TAU);ctx.fill();ctx.stroke();
 ctx.fillStyle=gold?'#495057':'#2b2d33';ctx.beginPath();ctx.arc(0,0,R-4,0,TAU);ctx.fill();
 ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,R-2,-2.4,-1.2);ctx.stroke();
 const t=window.time||0;
 if(lvl>=6){// 스테이크
  ctx.fillStyle='#8b3a1e';ctx.strokeStyle='#3d1406';ctx.lineWidth=1.6;ctx.beginPath();ctx.ellipse(1,0,12,9,.3,0,TAU);ctx.fill();ctx.stroke();
  ctx.fillStyle='#fff1e6';ctx.beginPath();ctx.ellipse(-7,-3,3,5,.3,0,TAU);ctx.fill();
  ctx.strokeStyle='#3d1406';ctx.lineWidth=1.8;for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(-4+i*5,-6);ctx.lineTo(4+i*5,5);ctx.stroke();}
  if(gold){ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=1.4;for(let i=0;i<3;i++){const x=-6+i*6,y=-12-((t*30+i*7)%10);ctx.beginPath();ctx.moveTo(x,y+6);ctx.quadraticCurveTo(x+3,y+3,x,y);ctx.stroke();}}}
 else{
  if(lvl>=4){ctx.fillStyle='#e8590c';ctx.strokeStyle='#7a2e05';ctx.lineWidth=1.3;for(const oy of[-9,9]){ctx.beginPath();ctx.moveTo(-12,oy);for(let i=0;i<=6;i++)ctx.lineTo(-12+i*4,oy+Math.sin(i*1.6)*2.2);ctx.lineTo(12,oy+3);for(let i=6;i>=0;i--)ctx.lineTo(-12+i*4,oy+3+Math.sin(i*1.6)*2.2);ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle='#ffd8a8';ctx.beginPath();ctx.moveTo(-10,oy+1.5);ctx.lineTo(10,oy+1.5);ctx.stroke();ctx.strokeStyle='#7a2e05';}}
  if(lvl>=2){ctx.fillStyle='#fff';ctx.strokeStyle='#ced4da';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-9,0);ctx.bezierCurveTo(-10,-8,0,-8,4,-5);ctx.bezierCurveTo(10,-3,9,6,3,7);ctx.bezierCurveTo(-3,9,-8,6,-9,0);ctx.fill();ctx.stroke();
   ctx.fillStyle=wLG(-3,-3,3,3,'#ffe066','#f59f00');ctx.beginPath();ctx.arc(-1,0,4.2,0,TAU);ctx.fill();ctx.fillStyle='rgba(255,255,255,.8)';ctx.beginPath();ctx.arc(-2.4,-1.4,1.2,0,TAU);ctx.fill();}}
 ctx.restore();}

function wArt(kind,lvl,opt={}){if(kind==='hammer')artHammer(lvl);else if(kind==='twin')artTwin(lvl,opt.side??1);else if(kind==='flail')artFlail(lvl,opt);else artPan(lvl);}

// 몽둥이: 0 나무 방망이 → 2 테이프 감음 → 4 못 박힘 → 6 쇠테 → 8 불타는 방망이
function artBat(lvl){const L=70;
 if(lvl>=8){wGlow(L*.75,0,30,'rgba(255,120,30,.5)');}
 const wood=lvl>=6?['#c08552','#6f3d1b']:['#e0b07a','#9c6b3a'];
 ctx.fillStyle=wLG(0,-8,0,8,mix(wood[0],.3),wood[0],wood[1]);ctx.strokeStyle=OL;ctx.lineWidth=2.2;
 ctx.beginPath();ctx.moveTo(-4,-3.5);ctx.lineTo(L*.45,-5);ctx.quadraticCurveTo(L*.8,-10,L,-9.5);ctx.arc(L,0,9.5,-Math.PI/2,Math.PI/2);ctx.quadraticCurveTo(L*.8,10,L*.45,5);ctx.lineTo(-4,3.5);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.fillStyle='#5c3a1e';ctx.beginPath();ctx.ellipse(-4,0,2.5,4.5,0,0,TAU);ctx.fill();ctx.stroke();
 ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(L*.4,-6,L*.5,2.5);
 if(lvl>=2){ctx.fillStyle=lvl>=6?'#212529':'#e9ecef';ctx.fillRect(2,-4,16,8);ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=1;for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(3+i*4,-4);ctx.lineTo(6+i*4,4);ctx.stroke();}}
 if(lvl>=4){for(const [x,y,a] of[[L*.62,-8,-1.6],[L*.78,9,1.5],[L*.92,-9,-1.4],[L+8,3,.3],[L*.7,1,-.4]]){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.fillStyle='#ced4da';ctx.strokeStyle=OL;ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(0,-2);ctx.lineTo(9,0);ctx.lineTo(0,2);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}}
 if(lvl>=6){ctx.fillStyle='#868e96';ctx.strokeStyle=OL;ctx.lineWidth=1.4;for(const u of[.6,.88]){ctx.beginPath();ctx.rect(L*u-2.5,-10,5,20);ctx.fill();ctx.stroke();}}
 if(lvl>=8){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const x=L*.55+i*9,h=10+(i%2)*6;const g=ctx.createLinearGradient(0,-8,0,-8-h);g.addColorStop(0,'rgba(255,200,60,.9)');g.addColorStop(1,'rgba(255,60,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-4,-6);ctx.quadraticCurveTo(x,-8-h,x+4,-6);ctx.fill();}ctx.restore();}}

// 쇠기둥 → 신전 기둥 (파르테논 기둥을 통째로 뽑아온 느낌): 손잡이 쪽 = 뜯겨 나간 밑동, 끝 = 기둥머리
// 0 금 간 대리석 토막 → 2 이끼·흙 묻은 기둥 → 4 온전한 도리스 기둥머리 → 6 금 소용돌이 장식(이오니아) → 8 신성한 빛의 기둥
function artPillar(lvl){const L=100,w=lvl>=4?15:13,top=lvl>=4;
 if(lvl>=8)wGlow(L*.6,0,50,'rgba(255,230,150,.5)');
 const c=lvl>=8?['#fffaf0','#d9c9a3']:['#f1ece2','#b5ab98'];
 // 뜯겨 나간 밑동 (울퉁불퉁한 단면 + 흙)
 ctx.fillStyle='#7a5c3e';ctx.strokeStyle=OL;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(4,-w-2);ctx.lineTo(-3,-w*.6);ctx.lineTo(2,-w*.2);ctx.lineTo(-5,w*.25);ctx.lineTo(1,w*.6);ctx.lineTo(-2,w+2);ctx.lineTo(10,w+2);ctx.lineTo(10,-w-2);ctx.closePath();ctx.fill();ctx.stroke();
 // 기둥 몸통 (세로 홈)
 const x1=8,x2=top?L-14:L-4;
 ctx.fillStyle=wLG(0,-w,0,w,mix(c[0],.4),c[0],c[1]);ctx.beginPath();ctx.moveTo(x1,-w);ctx.lineTo(x2,-w*.9);ctx.lineTo(x2,w*.9);ctx.lineTo(x1,w);ctx.closePath();ctx.fill();ctx.stroke();
 ctx.strokeStyle='rgba(90,80,60,.35)';ctx.lineWidth=1.6;for(const f of[-.66,-.33,0,.33,.66]){ctx.beginPath();ctx.moveTo(x1+3,w*f);ctx.lineTo(x2-2,w*f*.9);ctx.stroke();}
 ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=1.2;for(const f of[-.5,-.17,.17,.5]){ctx.beginPath();ctx.moveTo(x1+3,w*f);ctx.lineTo(x2-2,w*f*.9);ctx.stroke();}
 if(!top){// 부러진 윗부분: 들쭉날쭉한 단면
  ctx.fillStyle='#d8cfbf';ctx.strokeStyle=OL;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x2-6,-w*.9);ctx.lineTo(x2+4,-w*.5);ctx.lineTo(x2-1,-w*.1);ctx.lineTo(x2+6,w*.3);ctx.lineTo(x2,w*.9);ctx.lineTo(x2-6,w*.9);ctx.closePath();ctx.fill();ctx.stroke();}
 else{// 기둥머리: 도리스(4) → 이오니아 금 소용돌이(6) → 빛나는 장식(8)
  ctx.fillStyle=wLG(0,-w,0,w,mix(c[0],.4),c[0],c[1]);ctx.strokeStyle=OL;ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(x2,-w*.9);ctx.quadraticCurveTo(x2+7,-w*1.15,x2+8,-w*1.35);ctx.lineTo(x2+8,w*1.35);ctx.quadraticCurveTo(x2+7,w*1.15,x2,w*.9);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.rect(x2+8,-w*1.5,7,w*3);ctx.fill();ctx.stroke();
  if(lvl>=6){ctx.strokeStyle='#ffd43b';ctx.lineWidth=2.4;for(const sy of[-1,1]){ctx.beginPath();for(let i=0;i<=24;i++){const t=i/24*TAU*1.4,r=6.5*(1-i/30);ctx.lineTo(x2+6+Math.cos(t)*r*.8,sy*(w*1.3)+Math.sin(t)*r*sy);}ctx.stroke();}}
  ctx.fillStyle=lvl>=6?'#ffd43b':'rgba(90,80,60,.5)';ctx.fillRect(x2,-w*.95,2.5,w*1.9);}
 // 금 간 자국, 이끼
 ctx.strokeStyle='rgba(60,50,40,.7)';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(x1+18,-w);ctx.lineTo(x1+24,-w*.4);ctx.lineTo(x1+20,0);ctx.lineTo(x1+28,w*.5);ctx.stroke();
 if(lvl<4){ctx.beginPath();ctx.moveTo(x2-20,w*.9);ctx.lineTo(x2-26,w*.3);ctx.lineTo(x2-18,-w*.1);ctx.stroke();}
 if(lvl>=2&&lvl<8){ctx.fillStyle='rgba(90,140,60,.75)';for(const [x,y,r] of[[x1+6,w*.7,5],[x1+14,w*.85,4],[x1+4,-w*.75,4]]){ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();}}
 // 밑동에 붙은 흙덩이·뿌리
 ctx.strokeStyle='#5c3a1e';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-1,w*.3);ctx.quadraticCurveTo(-10,w*.6,-12,w*1.1);ctx.moveTo(0,-w*.5);ctx.quadraticCurveTo(-9,-w*.7,-11,-w*1.2);ctx.stroke();
 if(lvl>=8){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(255,236,170,.9)';ctx.lineWidth=2;for(const f of[-.5,0,.5]){ctx.beginPath();ctx.moveTo(x1+6,w*f);ctx.lineTo(x2-4,w*f*.9);ctx.stroke();}ctx.restore();}}

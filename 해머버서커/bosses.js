/* 일반 보스 6종 + 새 궁기사 새. 게임 helper(mix, AG, sprite, TAU, ctx, time) 사용. 로컬 좌표: 발 y=0 */
function bGlow(pts,col,w=3){ctx.save();ctx.shadowBlur=14;ctx.shadowColor=col;ctx.strokeStyle=mix(col,.6);ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.restore();}
function bOut(w=3,c='#120a18'){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineJoin='round';ctx.stroke();}
function bEye(x,y,r,iris,angry,look=0){ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(x,y,r,r*1.15,0,0,TAU);ctx.fill();bOut(2.2);
 ctx.fillStyle=iris;ctx.beginPath();ctx.arc(x+look*r*.3,y+r*.1,r*.6,0,TAU);ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.arc(x+look*r*.35,y+r*.12,r*.3,0,TAU);ctx.fill();
 ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.arc(x-r*.25,y-r*.3,r*.22,0,TAU);ctx.fill();
 if(angry){ctx.strokeStyle='#120a18';ctx.lineWidth=r*.45;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-r*1.1*angry,y-r*1.5);ctx.lineTo(x+r*1.1*angry,y-r*1.05);ctx.stroke();}}
function bClaws(x,y,n,s,dir=1){ctx.fillStyle='#f1e3c8';for(let j=0;j<n;j++){ctx.beginPath();ctx.moveTo(x+dir*j*7*s,y-2);ctx.quadraticCurveTo(x+dir*(j*7+8)*s,y-2,x+dir*(j*7+7)*s,y+6*s);ctx.lineTo(x+dir*(j*7+2)*s,y-6);ctx.closePath();ctx.fill();bOut(1.2);}}

/* 1. 슬라임 왕 */
function drawSlimeKing(st={}){const t=st.t??time,w=Math.sin(t*4)*.06,c='#3fa9f5',fl=st.flash;
 ctx.save();ctx.scale(1+w,1-w);
 const body=new Path2D();body.moveTo(-70,0);body.bezierCurveTo(-80,-60,-50,-118,0,-118);body.bezierCurveTo(50,-118,80,-60,70,0);
 for(let i=0;i<5;i++){const x=70-i*28;body.quadraticCurveTo(x-6,8+(i%2)*6,x-14,2);body.quadraticCurveTo(x-20,-2,x-28,0);}body.closePath();
 const g=ctx.createRadialGradient(-26,-86,6,0,-56,90);g.addColorStop(0,fl?'#fff':'#c9ecff');g.addColorStop(.45,fl?'#fff':c);g.addColorStop(1,mix(c,-.55));
 ctx.globalAlpha=.92;ctx.fillStyle=g;ctx.fill(body);ctx.globalAlpha=1;ctx.strokeStyle=mix(c,-.75);ctx.lineWidth=3.5;ctx.stroke(body);
 ctx.save();ctx.clip(body);for(let i=0;i<7;i++){const bx=Math.sin(i*2.3+t)*40,by=-20-((t*30+i*23)%90);ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(bx,by,3+i%3*2,0,TAU);ctx.stroke();}
  ctx.fillStyle='rgba(20,60,120,.35)';ctx.beginPath();ctx.ellipse(0,-40,36,24,0,0,TAU);ctx.fill();ctx.restore();
 ctx.fillStyle='rgba(255,255,255,.75)';ctx.beginPath();ctx.ellipse(-36,-88,14,8,-.6,0,TAU);ctx.fill();ctx.beginPath();ctx.arc(-18,-100,4,0,TAU);ctx.fill();
 bEye(-22,-62,12,'#0b3d91',.8,.3);bEye(22,-62,12,'#0b3d91',-.8,.3);
 ctx.fillStyle='#0b2545';ctx.beginPath();ctx.moveTo(-18,-34);ctx.quadraticCurveTo(0,-20,18,-34);ctx.quadraticCurveTo(0,-28,-18,-34);ctx.fill();
 ctx.restore();
 ctx.save();ctx.translate(0,-118+Math.sin(t*4)*3);ctx.rotate(-.12);
 const cr=new Path2D();cr.moveTo(-30,0);cr.lineTo(-34,-28);cr.lineTo(-18,-14);cr.lineTo(-8,-36);cr.lineTo(2,-14);cr.lineTo(16,-34);cr.lineTo(22,-12);cr.lineTo(36,-26);cr.lineTo(32,0);cr.closePath();
 ctx.fillStyle=AG(-36,0,'#ffd43b');ctx.fill(cr);ctx.strokeStyle='#7a5c00';ctx.lineWidth=2.5;ctx.stroke(cr);
 for(const [x,col] of [[-14,'#e63946'],[2,'#4cc9f0'],[18,'#06d6a0']]){ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,-7,4,0,TAU);ctx.fill();ctx.strokeStyle='#5a3d00';ctx.lineWidth=1.2;ctx.stroke();}
 ctx.restore();}

/* 2. 돌격 갑수 */
function drawBeast(st={}){const t=st.t??time,M='#ff006e',MD=mix(M,-.55),run=st.run?Math.sin(t*16):0;
 const leg=(lx,far,p)=>{const s=Math.sin(t*16+p)*(st.run?8:0);ctx.strokeStyle=far?'#140a14':'#2b1a30';ctx.lineWidth=24;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(lx,-40);ctx.lineTo(lx+6+s,-4);ctx.stroke();bClaws(lx-6+s,2,3,1);};
 leg(-62,true,0);leg(46,true,Math.PI);
 ctx.fillStyle=AG(-110,-20,MD);ctx.beginPath();ctx.ellipse(-6,-58,96,56,0,Math.PI,TAU);ctx.lineTo(90,-40);ctx.quadraticCurveTo(-6,-14,-102,-40);ctx.closePath();ctx.fill();bOut(3.5);
 const shell=new Path2D();shell.ellipse(-14,-64,90,62,0,Math.PI,TAU);shell.closePath();
 ctx.fillStyle=st.flash?'#fff':AG(-126,-30,'#5a2a52');ctx.fill(shell);ctx.save();ctx.clip(shell);
 for(let i=0;i<5;i++){ctx.strokeStyle='#120a18';ctx.lineWidth=3;ctx.beginPath();ctx.arc(-14,-64,90-i*17,Math.PI,TAU);ctx.stroke();}
 ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(-24,-68,74,Math.PI*1.15,Math.PI*1.45);ctx.stroke();ctx.restore();
 ctx.strokeStyle='#120a18';ctx.lineWidth=3.5;ctx.stroke(shell);
 for(let i=0;i<7;i++){const a=Math.PI+.25+i*.42,px=-14+Math.cos(a)*90,py=-64+Math.sin(a)*62;ctx.save();ctx.translate(px,py);ctx.rotate(a+1.57);ctx.fillStyle=AG(-30,0,'#e9e2d0');ctx.beginPath();ctx.moveTo(-8,4);ctx.lineTo(0,-28-(i%2)*8);ctx.lineTo(8,4);ctx.closePath();ctx.fill();bOut(2);ctx.restore();}
 bGlow([[-60,-92],[-40,-78],[-48,-60]],'#ff4da6');bGlow([[10,-108],[20,-88],[8,-74]],'#ff4da6');
 leg(-40,false,Math.PI);leg(66,false,0);
 ctx.save();ctx.translate(98,-52);const hd=sprite('sphere',34,M);ctx.drawImage(hd.c,-hd.s/2,-hd.s/2,hd.s,hd.s);
 ctx.fillStyle=AG(-30,10,'#2b1a30');ctx.beginPath();ctx.moveTo(-26,-22);ctx.quadraticCurveTo(4,-40,30,-18);ctx.lineTo(10,-8);ctx.quadraticCurveTo(-8,-18,-26,-4);ctx.closePath();ctx.fill();bOut(2.5);
 ctx.fillStyle=AG(-80,0,'#f3e6cc');ctx.beginPath();ctx.moveTo(18,-14);ctx.quadraticCurveTo(54,-30,52,-80);ctx.quadraticCurveTo(44,-40,6,-24);ctx.closePath();ctx.fill();bOut(2.5);
 ctx.beginPath();ctx.moveTo(6,-30);ctx.quadraticCurveTo(10,-56,-2,-70);ctx.quadraticCurveTo(-4,-50,-6,-30);ctx.closePath();ctx.fill();bOut(2.5);
 ctx.save();ctx.shadowBlur=14;ctx.shadowColor='#ffd43b';ctx.fillStyle='#ffd43b';ctx.beginPath();ctx.moveTo(4,-12);ctx.lineTo(20,-14);ctx.lineTo(14,-6);ctx.closePath();ctx.fill();ctx.restore();
 ctx.strokeStyle='#f1e3c8';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(22,10);ctx.quadraticCurveTo(38,10,40,-6);ctx.stroke();
 ctx.restore();}

/* 3. 포자 여왕 */
function drawMushroom(st={}){const t=st.t??time,cap='#8e44ad',fl=st.flash;
 for(let i=0;i<10;i++){const a=t*.6+i*.63,r=70+Math.sin(t*2+i)*14,x=Math.cos(a)*r,y=-90+Math.sin(a)*r*.6;ctx.fillStyle=`rgba(190,255,120,${.35+.3*Math.sin(t*3+i)})`;ctx.beginPath();ctx.arc(x,y,3+i%3,0,TAU);ctx.fill();}
 ctx.fillStyle=AG(-90,0,fl?'#fff':'#f1e3c8');ctx.beginPath();ctx.moveTo(-34,0);ctx.quadraticCurveTo(-40,-50,-26,-92);ctx.lineTo(26,-92);ctx.quadraticCurveTo(40,-50,34,0);ctx.quadraticCurveTo(0,8,-34,0);ctx.closePath();ctx.fill();bOut(3.2,'#3d2a14');
 ctx.fillStyle='rgba(120,80,40,.25)';ctx.beginPath();ctx.ellipse(0,-30,22,26,0,0,TAU);ctx.fill();
 for(const sg of[-1,1]){ctx.strokeStyle='#3d2a14';ctx.lineWidth=11;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(sg*30,-56);ctx.quadraticCurveTo(sg*56,-44,sg*58,-18);ctx.stroke();ctx.strokeStyle='#e9dcc0';ctx.lineWidth=7;ctx.stroke();}
 ctx.save();ctx.translate(58,-18);ctx.strokeStyle='#5c3a1e';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,10);ctx.lineTo(0,-60);ctx.stroke();ctx.fillStyle='#b8f35a';ctx.shadowBlur=16;ctx.shadowColor='#b8f35a';ctx.beginPath();ctx.arc(0,-66,9,0,TAU);ctx.fill();ctx.restore();
 bEye(-12,-66,8,'#6a994e',.7);bEye(12,-66,8,'#6a994e',-.7);
 ctx.fillStyle='#3d2a14';ctx.beginPath();ctx.arc(0,-46,6,0,Math.PI);ctx.fill();
 const capP=new Path2D();capP.moveTo(-96,-86);capP.bezierCurveTo(-100,-170,100,-170,96,-86);for(let i=0;i<8;i++){const x=96-i*24;capP.quadraticCurveTo(x-12,-78+(i%2)*6,x-24,-86);}capP.closePath();
 ctx.fillStyle=ctx.createRadialGradient(-30,-150,8,0,-110,120);ctx.fillStyle.addColorStop(0,fl?'#fff':'#e0aaff');ctx.fillStyle.addColorStop(.5,fl?'#fff':cap);ctx.fillStyle.addColorStop(1,mix(cap,-.6));ctx.fill(capP);ctx.strokeStyle='#240b36';ctx.lineWidth=3.5;ctx.stroke(capP);
 ctx.save();ctx.clip(capP);ctx.fillStyle='rgba(255,230,140,.85)';ctx.strokeStyle='rgba(60,30,0,.5)';ctx.lineWidth=1.5;
 for(const [x,y,r] of [[-50,-118,14],[-6,-140,11],[38,-122,16],[-78,-98,8],[70,-100,9],[10,-104,7]]){ctx.save();ctx.shadowBlur=12;ctx.shadowColor='#d8f3a0';ctx.beginPath();ctx.ellipse(x,y,r,r*.75,0,0,TAU);ctx.fill();ctx.restore();ctx.stroke();}
 ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(-100,-96,200,14);ctx.restore();
 ctx.save();ctx.translate(-8,-158);ctx.fillStyle=AG(-20,0,'#ffd43b');ctx.beginPath();ctx.moveTo(-16,0);ctx.lineTo(-18,-14);ctx.lineTo(-8,-6);ctx.lineTo(0,-18);ctx.lineTo(8,-6);ctx.lineTo(18,-14);ctx.lineTo(16,0);ctx.closePath();ctx.fill();bOut(2,'#6b4f00');ctx.restore();}

/* 4. 서리 거인 */
function drawFrost(st={}){const t=st.t??time,fl=st.flash,poly=(pts,c1,c2)=>{ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();const ys=pts.map(p=>p[1]);ctx.fillStyle=fl?'#fff':AG(Math.min(...ys),Math.max(...ys),c1);ctx.fill();bOut(3,'#0b2a4a');};
 const crystal=(x,y,a,l,w)=>{ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.beginPath();ctx.moveTo(-w,0);ctx.lineTo(-w*.6,-l*.7);ctx.lineTo(0,-l);ctx.lineTo(w*.6,-l*.7);ctx.lineTo(w,0);ctx.closePath();ctx.fillStyle=AG(-l,0,'#d0f0ff');ctx.fill();bOut(2,'#0b2a4a');ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,-l);ctx.lineTo(0,-2);ctx.stroke();ctx.restore();};
 poly([[-50,0],[-56,-40],[-30,-50],[-20,-4]],'#5c8db8');poly([[20,0],[26,-50],[52,-42],[50,0]],'#5c8db8');
 poly([[-62,-40],[-74,-110],[-40,-150],[30,-156],[66,-116],[60,-44],[0,-30]],'#9cc9ea');
 ctx.fillStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.moveTo(-60,-104);ctx.lineTo(-40,-146);ctx.lineTo(-10,-150);ctx.lineTo(-44,-100);ctx.closePath();ctx.fill();
 ctx.save();ctx.shadowBlur=24;ctx.shadowColor='#4cc9f0';ctx.fillStyle='#e0fbff';ctx.beginPath();ctx.moveTo(0,-110);ctx.lineTo(12,-92);ctx.lineTo(0,-74);ctx.lineTo(-12,-92);ctx.closePath();ctx.fill();ctx.restore();
 bGlow([[0,-74],[-10,-58],[-4,-44]],'#4cc9f0',2);bGlow([[12,-92],[30,-86],[40,-70]],'#4cc9f0',2);
 poly([[-30,-150],[-26,-186],[0,-198],[28,-184],[30,-150]],'#bfe3ff');
 ctx.save();ctx.shadowBlur=16;ctx.shadowColor='#4cc9f0';ctx.fillStyle='#e0fbff';ctx.fillRect(-18,-176,12,6);ctx.fillRect(6,-176,12,6);ctx.restore();
 crystal(-56,-140,-.7,52,12);crystal(-40,-150,-.35,40,9);crystal(52,-130,.7,50,12);crystal(38,-150,.35,36,8);crystal(0,-196,0,30,8);
 const arm=(sg)=>{poly([[sg*60,-130],[sg*96,-110],[sg*92,-70],[sg*66,-80]],'#7fb2d8');poly([[sg*80,-74],[sg*112,-64],[sg*110,-26],[sg*76,-26],[sg*72,-56]],'#9cc9ea');crystal(sg*100,-66,sg*1,22,7);};
 arm(-1);arm(1);
 for(let i=0;i<6;i++){const a=t*1.5+i,x=Math.sin(a*1.3)*90,y=-160+((t*40+i*30)%160);ctx.fillStyle='rgba(220,245,255,.8)';ctx.beginPath();ctx.arc(x,y,2,0,TAU);ctx.fill();}}

/* 5. 망령 마법사 */
function drawWraith(st={}){const t=st.t??time,fl=st.flash,fy=Math.sin(t*2)*6;
 ctx.save();ctx.translate(0,fy);
 ctx.save();ctx.translate(0,-10);ctx.scale(1,.35);ctx.rotate(t*.6);ctx.strokeStyle='rgba(160,90,255,.7)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,86,0,TAU);ctx.stroke();ctx.beginPath();ctx.arc(0,0,70,0,TAU);ctx.stroke();
 for(let i=0;i<8;i++){const a=i*TAU/8;ctx.save();ctx.translate(Math.cos(a)*78,Math.sin(a)*78);ctx.rotate(a);ctx.fillStyle='rgba(200,150,255,.9)';ctx.fillRect(-4,-5,8,10);ctx.restore();}ctx.restore();
 const robe=new Path2D();robe.moveTo(-36,-150);robe.quadraticCurveTo(-60,-90,-52,-40);for(let i=0;i<5;i++){const x=-52+i*26;robe.quadraticCurveTo(x+6,-14+Math.sin(t*5+i)*8,x+13,-30);robe.quadraticCurveTo(x+20,-10+Math.cos(t*5+i)*8,x+26,-40);}robe.quadraticCurveTo(62,-90,36,-150);robe.closePath();
 ctx.fillStyle=fl?'#fff':AG(-160,-20,'#4b1d6e');ctx.fill(robe);bOut(3,'#12051e');
 ctx.save();ctx.clip(robe);ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=4;for(const x of[-20,4,26]){ctx.beginPath();ctx.moveTo(x*.6,-140);ctx.quadraticCurveTo(x,-80,x*1.1,-20);ctx.stroke();}ctx.restore();
 ctx.fillStyle='#d4af37';ctx.fillRect(-40,-96,80,8);bOut(1.5,'#5a3d00');
 const hood=new Path2D();hood.moveTo(-42,-136);hood.quadraticCurveTo(-46,-196,0,-206);hood.quadraticCurveTo(46,-196,42,-136);hood.quadraticCurveTo(0,-124,-42,-136);hood.closePath();
 ctx.fillStyle=fl?'#fff':AG(-210,-130,'#5a2a82');ctx.fill(hood);bOut(3,'#12051e');
 ctx.fillStyle='#07020c';ctx.beginPath();ctx.ellipse(4,-160,26,24,0,0,TAU);ctx.fill();
 ctx.save();ctx.shadowBlur=18;ctx.shadowColor='#80ffdb';ctx.fillStyle='#b9fbe9';ctx.beginPath();ctx.ellipse(-6,-162,5,3,0,0,TAU);ctx.fill();ctx.beginPath();ctx.ellipse(14,-162,5,3,0,0,TAU);ctx.fill();ctx.restore();
 for(const sg of[-1,1]){ctx.strokeStyle='#12051e';ctx.lineWidth=14;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(sg*36,-120);ctx.quadraticCurveTo(sg*64,-100,sg*66,-74);ctx.stroke();ctx.strokeStyle='#4b1d6e';ctx.lineWidth=10;ctx.stroke();
  ctx.strokeStyle='#e9e2d0';ctx.lineWidth=2.5;for(let j=0;j<3;j++){ctx.beginPath();ctx.moveTo(sg*66,-72);ctx.lineTo(sg*(66+j*4),-60);ctx.stroke();}}
 ctx.save();ctx.translate(76,-60+Math.sin(t*3)*3);ctx.strokeStyle='#2b1a30';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-10,-12);ctx.lineTo(0,-24);ctx.stroke();
 ctx.fillStyle='#3a2d45';ctx.fillRect(-10,-12,20,4);ctx.fillRect(-10,14,20,4);ctx.strokeStyle='#3a2d45';ctx.lineWidth=3;ctx.strokeRect(-8,-8,16,22);
 ctx.shadowBlur=24;ctx.shadowColor='#80ffdb';const fg=ctx.createRadialGradient(0,4,0,0,4,12);fg.addColorStop(0,'#fff');fg.addColorStop(.5,'#80ffdb');fg.addColorStop(1,'rgba(128,255,219,0)');ctx.fillStyle=fg;ctx.beginPath();ctx.arc(0,4,12,0,TAU);ctx.fill();ctx.restore();
 ctx.restore();}

/* 6. 마왕 구체 */
function drawOrb(st={}){const t=st.t??time,M='#ff006e',MD=mix(M,-.55),fl=st.flash;ctx.save();ctx.translate(0,-18+Math.sin(t*2.5)*5);
 for(let i=0;i<7;i++){const a=i*TAU/7+t*.8,r=108,sx=Math.cos(a)*r,sy=-80+Math.sin(a)*r*.5;ctx.save();ctx.translate(sx,sy);ctx.rotate(a+1.57);ctx.fillStyle=AG(-20,6,M);ctx.beginPath();ctx.moveTo(0,-20);ctx.lineTo(9,6);ctx.lineTo(-9,6);ctx.closePath();ctx.fill();bOut(2,mix(M,-.8));ctx.restore();}
 for(const sg of[-1,1]){ctx.strokeStyle=mix(M,-.8);ctx.lineWidth=16;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(sg*52,-62);ctx.quadraticCurveTo(sg*92,-50,sg*86,-18);ctx.stroke();ctx.strokeStyle=MD;ctx.lineWidth=11;ctx.stroke();bClaws(sg*80,-18,3,1,sg);}
 ctx.save();ctx.translate(0,-80);const sp=sprite('sphere',64,fl?'#ffffff':M);ctx.drawImage(sp.c,-sp.s/2,-sp.s/2,sp.s,sp.s);
 ctx.fillStyle=AG(-60,-20,'#3a2440');ctx.beginPath();ctx.arc(0,0,64,Math.PI*1.05,Math.PI*1.62);ctx.lineTo(-18,-34);ctx.quadraticCurveTo(-44,-20,-50,6);ctx.closePath();ctx.fill();bOut(2.5);
 bGlow([[18,-58],[10,-36],[24,-20],[16,4]],'#ff4da6');bGlow([[-40,30],[-22,22],[-14,40]],'#ff4da6',2.5);
 for(let i=0;i<5;i++){const a=-Math.PI/2+(i-2)*.38,b=60;ctx.save();ctx.translate(Math.cos(a)*b,Math.sin(a)*b);ctx.rotate(a+1.57);ctx.fillStyle=AG(-40,0,'#2b1a30');ctx.beginPath();ctx.moveTo(-9,4);ctx.quadraticCurveTo(-4,-22,(i-2)*4,-42-(i===2?14:0));ctx.quadraticCurveTo(4,-20,9,4);ctx.closePath();ctx.fill();bOut(2,'#0b060e');
  ctx.fillStyle='#ffd43b';ctx.beginPath();ctx.moveTo((i-2)*4,-42-(i===2?14:0));ctx.lineTo(-3,-30);ctx.lineTo(4,-30);ctx.closePath();ctx.fill();ctx.restore();}
 ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(6,-8,26,20,0,0,TAU);ctx.fill();bOut(3);
 ctx.fillStyle=AG(-16,16,'#ffd43b');ctx.beginPath();ctx.arc(10+(st.look||0)*8,-6,14,0,TAU);ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(10+(st.look||0)*8,-6,3.5,11,0,0,TAU);ctx.fill();
 ctx.fillStyle='rgba(255,255,255,.8)';ctx.beginPath();ctx.arc(4,-12,4,0,TAU);ctx.fill();
 ctx.strokeStyle='#120a18';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-26,-38);ctx.lineTo(6,-26);ctx.lineTo(38,-40);ctx.stroke();
 ctx.fillStyle='#2a0010';ctx.beginPath();ctx.moveTo(-30,22);ctx.quadraticCurveTo(6,48,40,20);ctx.quadraticCurveTo(6,32,-30,22);ctx.fill();
 ctx.fillStyle='#fff';for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(-24+i*11,23+Math.sin(i)*2);ctx.lineTo(-19+i*11,32);ctx.lineTo(-14+i*11,24);ctx.fill();}
 ctx.restore();ctx.restore();}

/* 궁기사의 새 (비행) — 로컬 좌표, 오른쪽을 봄, 기수 안장 y=-58 근처 */
function feather(x,y,a,len,w,c1,c2){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(len*.5,-w,len,0);ctx.quadraticCurveTo(len*.5,w*.7,0,0);ctx.closePath();
 ctx.fillStyle=AG(-w,w,c1===c2?c1:c1);const g=ctx.createLinearGradient(0,0,len,0);g.addColorStop(0,c1);g.addColorStop(1,c2);ctx.fillStyle=g;ctx.fill();ctx.strokeStyle='rgba(60,20,0,.55)';ctx.lineWidth=1.2;ctx.stroke();
 ctx.strokeStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.moveTo(2,0);ctx.lineTo(len*.9,0);ctx.stroke();ctx.restore();}
function drawBird2(D,ph,fl){ctx.save();ctx.scale(1.3,1.3);const fp=Math.sin(time*5.5),c=D.mountCol,dk=mix(c,-.45),lt=mix(c,.45),gold='#ffd43b';
 const wing=(far)=>{ctx.save();ctx.translate(far?2:-4,far?-56:-52);ctx.rotate(.55+fp*.55+(far?.15:0));if(far)ctx.scale(.85,.85);
  const cA=far?dk:c,cB=far?mix(c,-.65):'#e85d04';
  for(let i=0;i<8;i++)feather(-6-i*8,0,Math.PI/2+.5+i*.11,34+i*6,7,far?dk:lt,cB);
  for(let i=0;i<7;i++)feather(-4-i*8,-3,Math.PI/2+.35+i*.1,20+i*3,6,far?c:'#fff3e0',cA);
  ctx.fillStyle=far?dk:AG(-10,6,c);ctx.beginPath();ctx.moveTo(4,4);ctx.quadraticCurveTo(-30,-12,-66,-2);ctx.quadraticCurveTo(-30,6,4,10);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(60,20,0,.6)';ctx.lineWidth=1.5;ctx.stroke();
  ctx.restore();};
 wing(true);
 for(let i=0;i<3;i++){const w=Math.sin(time*3+i)*6;ctx.strokeStyle=['#e85d04',gold,'#d00000'][i];ctx.lineWidth=7-i*1.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-20,-46);ctx.bezierCurveTo(-50,-40+w,-80,-30-i*10+w,-110-i*8,-44-i*12+w*1.5);ctx.stroke();
  ctx.fillStyle=['#e85d04',gold,'#d00000'][i];ctx.beginPath();ctx.ellipse(-112-i*8,-44-i*12+w*1.5,9,5,-.3,0,TAU);ctx.fill();}
 for(let i=0;i<5;i++)feather(-18,-46,Math.PI-.35+i*.17,36-Math.abs(i-2)*5,7,c,'#d00000');
 ctx.strokeStyle='#e8a33b';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-4,-34);ctx.lineTo(-12,-24);ctx.lineTo(-6,-20);ctx.moveTo(6,-34);ctx.lineTo(0,-24);ctx.lineTo(6,-21);ctx.stroke();
 const body=new Path2D();body.moveTo(-26,-48);body.bezierCurveTo(-20,-66,16,-68,28,-56);body.bezierCurveTo(34,-44,20,-30,0,-30);body.bezierCurveTo(-16,-30,-30,-38,-26,-48);body.closePath();
 const bg=ctx.createLinearGradient(0,-68,0,-30);bg.addColorStop(0,fl?'#fff':c);bg.addColorStop(.6,fl?'#fff':lt);bg.addColorStop(1,'#fff3e0');ctx.fillStyle=bg;ctx.fill(body);ctx.strokeStyle=mix(c,-.75);ctx.lineWidth=2.2;ctx.stroke(body);
 ctx.save();ctx.clip(body);ctx.strokeStyle='rgba(180,60,0,.3)';ctx.lineWidth=1.2;for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(-6+i*9,-38,6,.2,Math.PI-.2);ctx.stroke();}ctx.restore();
 const nk=new Path2D();nk.moveTo(18,-60);nk.quadraticCurveTo(26,-80,36,-84);nk.lineTo(44,-76);nk.quadraticCurveTo(36,-66,30,-50);nk.closePath();ctx.fillStyle=fl?'#fff':AG(-86,-50,c);ctx.fill(nk);ctx.strokeStyle=mix(c,-.75);ctx.lineWidth=2;ctx.stroke(nk);
 ctx.fillStyle=fl?'#fff':ctx.createRadialGradient(36,-88,2,40,-84,13);if(!fl){ctx.fillStyle.addColorStop(0,lt);ctx.fillStyle.addColorStop(1,c);}ctx.beginPath();ctx.arc(40,-84,11,0,TAU);ctx.fill();ctx.stroke();
 for(let i=0;i<3;i++){ctx.strokeStyle=[gold,'#d00000',gold][i];ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(36,-92);ctx.bezierCurveTo(30,-104-i*3,20-i*4,-110+i*2,8-i*6,-104+i*5);ctx.stroke();}
 ctx.fillStyle=gold;ctx.beginPath();ctx.moveTo(49,-88);ctx.quadraticCurveTo(62,-86,64,-78);ctx.quadraticCurveTo(56,-80,49,-80);ctx.closePath();ctx.fill();ctx.strokeStyle='#8a5a00';ctx.lineWidth=1.5;ctx.stroke();
 ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(43,-87,3.6,4,0,0,TAU);ctx.fill();ctx.fillStyle='#1a0a00';ctx.beginPath();ctx.arc(44,-87,2.4,0,TAU);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(43.2,-88,.9,0,TAU);ctx.fill();
 ctx.fillStyle='rgba(255,120,120,.5)';ctx.beginPath();ctx.ellipse(40,-80,4,2.4,0,0,TAU);ctx.fill();
 ctx.fillStyle=AG(-70,-56,D.col);ctx.beginPath();ctx.ellipse(-2,-62,16,6,0,0,TAU);ctx.fill();ctx.strokeStyle=D.trim;ctx.lineWidth=1.5;ctx.stroke();
 wing(false);ctx.restore();}

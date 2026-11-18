(()=>{
const F=window.Forge={};
F.PLAN={nom:'Pousser',muscles:'Pectoraux · Épaules · Triceps',ex:['Développé couché']};
// Haptique : Vibration API (Android) ; sur iPhone elle n'existe pas, on utilise l'interrupteur natif de Safari (iOS 17.4+)
const lb=document.createElement('label');lb.className='hx';lb.innerHTML='<input type="checkbox" switch>';document.body.append(lb);
F.tap=()=>{try{if(navigator.vibrate&&navigator.vibrate(18))return}catch(e){}try{lb.click()}catch(e){}};
F.go=u=>setTimeout(()=>{location.href=u},130); // petit délai : la vibration a le temps de partir avant le changement de page
F.toast=m=>{let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';document.body.append(t)}t.textContent=m;t.className='on';clearTimeout(F._t);F._t=setTimeout(()=>t.className='',2400)};
F.db=()=>window.forgeSupabase;
F.user=async()=>{const {data:{session}}=await F.db().auth.getSession();if(!session){location.replace('login.html');return null}return session.user};
// Unités de toute l'app (stockées en local, synchronisées au profil)
F.U={get(){let u={};try{u=JSON.parse(localStorage.getItem('forge_units'))||{}}catch(e){}return{w:u.w==='lb'?'lb':'kg',c:u.c==='€'?'€':'$'}},set(u){try{localStorage.setItem('forge_units',JSON.stringify(u))}catch(e){}}};
F.W=()=>F.U.get().w==='lb'?'lbs':'kg';
F.kg2u=k=>F.U.get().w==='lb'?k*2.20462:k;F.u2kg=v=>F.U.get().w==='lb'?v/2.20462:v;
F.fmt=n=>String(Math.round(n*10)/10).replace('.',',');
// Muscles travaillés selon le nom de l'exercice (liste de départ, à compléter)
const MU={'developpe couche':['Pectoraux','Épaules','Triceps'],'developpe incline':['Pectoraux','Épaules','Triceps'],'developpe militaire':['Épaules','Triceps'],'elevations laterales':['Épaules'],'triceps':['Triceps'],'dips':['Pectoraux','Triceps','Épaules'],'traction':['Dos','Biceps'],'rowing':['Dos','Biceps'],'curl':['Biceps'],'squat':['Quadriceps','Fessiers'],'souleve de terre':['Dos','Fessiers','Ischios'],'presse':['Quadriceps','Fessiers'],'mollets':['Mollets'],'abdos':['Abdominaux']};
const nz=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
F.muscles=a=>{const o=[];a.forEach(n=>{const z=nz(n);for(const k in MU)if(z.includes(k))MU[k].forEach(m=>{if(!o.includes(m))o.push(m)})});return o.join(' · ')};
// Hauteur réelle de l'écran (iPhone en PWA : évite la bande noire sous la barre de navigation)
const fit=()=>document.documentElement.style.setProperty('--ah',(navigator.standalone===true?Math.max(screen.height,innerHeight):innerHeight)+'px');
fit();addEventListener('resize',fit);addEventListener('orientationchange',fit);
// Nouvelle version du site : rechargement automatique
if('serviceWorker'in navigator){let had=!!navigator.serviceWorker.controller;navigator.serviceWorker.addEventListener('controllerchange',()=>{if(had&&!window._rl){window._rl=1;location.reload()}had=true})}
document.addEventListener('touchstart',()=>{},{passive:true}); // active les états :active sur iOS
document.addEventListener('click',e=>{
  if(e.target.closest('[data-soon]')){e.preventDefault();F.tap();F.toast('Bientôt disponible');return}
  const t=e.target.closest('button,a[href],[data-go]');if(!t)return;F.tap();
  const a=t.closest('a[href]');
  if(a){const h=a.getAttribute('href');if(h&&h[0]!=='#'&&a.target!=='_blank'){e.preventDefault();F.go(h)}}
});
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
// Aucun rebond / sortie de page : on ne laisse défiler que les zones réellement défilantes
let y0=0;document.addEventListener('touchstart',e=>{y0=e.touches[0].clientY},{passive:true});
document.addEventListener('touchmove',e=>{if(e.target.closest&&e.target.closest('.fr'))return;const d=e.touches[0].clientY-y0;
 for(let el=e.target;el&&el!==document.documentElement;el=el.parentElement){const o=getComputedStyle(el).overflowY;
  if((o==='auto'||o==='scroll')&&el.scrollHeight>el.clientHeight+1){const top=el.scrollTop<=0,bot=el.scrollTop+el.clientHeight>=el.scrollHeight-1;if(((top&&d>0)||(bot&&d<0))&&e.cancelable)e.preventDefault();return}}
 if(e.cancelable)e.preventDefault()},{passive:false});
})();
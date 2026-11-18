(()=>{
const F=window.Forge={};
F.PLAN={nom:'Pousser',muscles:'Pectoraux · Épaules · Triceps',ex:['Développé couché','Développé incliné','Développé militaire','Élévations latérales','Extensions triceps','Dips']};
// Haptique : Vibration API (Android) ; sur iPhone elle n'existe pas, on utilise l'interrupteur natif de Safari (iOS 17.4+)
const lb=document.createElement('label');lb.className='hx';lb.innerHTML='<input type="checkbox" switch>';document.body.append(lb);
F.tap=()=>{try{if(navigator.vibrate&&navigator.vibrate(18))return}catch(e){}try{lb.click()}catch(e){}};
F.go=u=>setTimeout(()=>{location.href=u},130); // petit délai : la vibration a le temps de partir avant le changement de page
F.toast=m=>{let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';document.body.append(t)}t.textContent=m;t.className='on';clearTimeout(F._t);F._t=setTimeout(()=>t.className='',2400)};
F.db=()=>window.forgeSupabase;
F.user=async()=>{const {data:{session}}=await F.db().auth.getSession();if(!session){location.replace('login.html');return null}return session.user};
document.addEventListener('touchstart',()=>{},{passive:true}); // active les états :active sur iOS
document.addEventListener('click',e=>{
  if(e.target.closest('[data-soon]')){e.preventDefault();F.tap();F.toast('Bientôt disponible');return}
  const t=e.target.closest('button,a[href],[data-go]');if(!t)return;F.tap();
  const a=t.closest('a[href]');
  if(a){const h=a.getAttribute('href');if(h&&h[0]!=='#'&&a.target!=='_blank'){e.preventDefault();F.go(h)}}
});
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
})();
const V='forge-v9',SHELL=['./','index.html','login.html','inscription.html','accueil.html','seance.html','ajouter.html','historique.html','modifier-profil.html','exercices.js','profil.html','base.css','app.css','forge.js','supabase.js','manifest.webmanifest','forge-192.png','forge-512.png','forge-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.hostname.endsWith('supabase.co'))return; // données toujours fraîches
  // Réseau d'abord (toujours la dernière version), cache seulement hors ligne
  e.respondWith(fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque')){const k=r.clone();caches.open(V).then(c=>c.put(e.request,k))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(h=>h||caches.match('index.html'))));
});
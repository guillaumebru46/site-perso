document.documentElement.classList.add('js');

/* Menu mobile et fenêtre d'informations */
const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#main-navigation');
function closeMenu(){toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent='Menu';}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Fermer':'Menu';});
navigation?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();const opener=event.target.closest('[data-open]');if(opener)document.getElementById(opener.dataset.open)?.showModal();if(event.target.closest('[data-close]'))event.target.closest('dialog')?.close();});
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}));

/* Animations : discrètes, jouées une seule fois, désactivées si l'utilisateur réduit les animations */
(()=>{
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STEP=80, MAX_STEPS=6;
  const marked=new Set();
  const mark=(el,cls,i=0)=>{if(!el||marked.has(el))return;marked.add(el);el.classList.add(cls);el.style.setProperty('--d',Math.min(i,MAX_STEPS)*STEP+'ms');};

  // Titres de haut de page : lignes révélées une par une
  document.querySelectorAll('.hero h1').forEach(h1=>{
    marked.add(h1);h1.classList.add('reveal-lines');
    h1.querySelectorAll('.line>span').forEach((line,i)=>line.style.setProperty('--d',120+i*110+'ms'));
  });

  // Listes : chaque élément apparaît à la suite du précédent
  const lists=['.intent-grid>article','.fit-grid>.fit-card','.support-list>li','.faq details','.key-figures>div','.press-list>li','.price-list>div'];
  lists.forEach(sel=>{const groups=new Map();document.querySelectorAll(sel).forEach(el=>{const p=el.parentElement;const i=groups.get(p)||0;groups.set(p,i+1);mark(el,'reveal',i);});});

  // Blocs de texte : les enfants apparaissent en cascade
  const containers=['.hero-copy','.section-copy','.section-heading','.experience-intro>div','.contact-inner','.personal-note','.service-grid>div:first-child','.faq-section>div:first-child','.manifesto-inner','.press-band-inner','.fit-action','.experience-note'];
  containers.forEach(sel=>document.querySelectorAll(sel).forEach(box=>{
    let i=0;
    [...box.children].forEach(child=>{
      if(child.matches('.press-list,.key-figures,.support-list,.price-list')){marked.add(child);return;}
      if(child.matches('.personal-note-grid')){[...child.children].forEach(c=>mark(c,'reveal',i++));marked.add(child);return;}
      if(box.classList.contains('hero-copy')&&child.tagName==='H1'){i+=3;return;}
      mark(child,'reveal',i++);
    });
  }));
  document.querySelectorAll('.experience-note').forEach(el=>mark(el,'reveal'));

  // Photos : dévoilées en rideau avec un léger zoom arrière
  document.querySelectorAll('.hero-photo,.editorial-photo,.friends-panorama,.comparison-phones,.media-visual').forEach(el=>mark(el,'reveal-photo'));

  // Liens soulignés hors des blocs déjà animés
  document.querySelectorAll('.text-link').forEach(link=>{if(!link.closest('.reveal,.reveal-photo'))mark(link,'reveal');});

  const targets=[...marked];
  const show=el=>el.classList.add('is-in');
  if(reduce||!('IntersectionObserver' in window)){targets.forEach(show);}
  else{
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){show(entry.target);io.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    targets.forEach(el=>io.observe(el));
  }
  window.__revealReady=true;

  // Compteur du comparatif
  const amount=document.querySelector('.difference strong');
  if(amount&&!reduce&&'IntersectionObserver' in window){
    const final=amount.textContent.trim();
    const value=parseFloat(final.replace(/[^\d,]/g,'').replace(',','.'));
    if(!isNaN(value)){
      const fmt=new Intl.NumberFormat('fr-FR',{minimumFractionDigits:2,maximumFractionDigits:2});
      amount.setAttribute('aria-label',final);
      const run=()=>{const start=performance.now(),dur=1300;const tick=now=>{const t=Math.min((now-start)/dur,1);const e=1-Math.pow(1-t,3);amount.textContent=fmt.format(value*e)+' €';if(t<1)requestAnimationFrame(tick);else amount.textContent=final;};requestAnimationFrame(tick);};
      const co=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){co.disconnect();setTimeout(run,250);}},{threshold:.6});
      co.observe(amount);
    }
  }

  // En-tête qui s'affine au défilement + légère profondeur sur la photo du haut (ordinateur)
  const header=document.querySelector('.site-header');
  const heroImg=document.querySelector('.hero .hero-photo>img');
  const parallax=!reduce&&heroImg&&window.matchMedia('(min-width: 821px)').matches;
  let ticking=false;
  const update=()=>{
    const y=window.scrollY;
    header?.classList.toggle('is-scrolled',y>24);
    if(parallax&&y<window.innerHeight*1.2)heroImg.style.setProperty('--py',Math.min(y*.06,18).toFixed(1)+'px');
    ticking=false;
  };
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  update();
})();

/* Vidéo et prise de rendez-vous dans la page, sans quitter le site.
   Les lecteurs externes ne se chargent qu'au clic du visiteur. */
(()=>{
  const CALENDLY='https://calendly.com/guillaume-bru/cae';
  let lastFocus=null;
  function buildModal(kind,title,externalUrl,externalLabel){
    const d=document.createElement('dialog');
    d.className='modal embed-modal embed-'+kind;
    d.setAttribute('aria-label',title);
    d.innerHTML='<div class="embed-bar"><span class="eyebrow"></span><span class="embed-actions"><a class="embed-external" target="_blank" rel="noopener noreferrer"></a><button class="embed-close" type="button" aria-label="Fermer">✕</button></span></div><div class="embed-frame"><p class="embed-loading">Chargement…</p></div>';
    d.querySelector('.eyebrow').textContent=title;
    const ext=d.querySelector('.embed-external');ext.href=externalUrl;ext.textContent=externalLabel+' ↗';
    d.querySelector('.embed-close').addEventListener('click',()=>d.close());
    d.addEventListener('click',e=>{if(e.target===d)d.close();});
    d.addEventListener('close',()=>{d.remove();lastFocus?.focus?.();});
    document.body.appendChild(d);
    return d;
  }
  function open(kind,src,title,externalUrl,externalLabel){
    lastFocus=document.activeElement;
    const d=buildModal(kind,title,externalUrl,externalLabel);
    const f=document.createElement('iframe');
    f.src=src;f.title=title;f.loading='eager';
    f.allow=kind==='video'?'autoplay; encrypted-media; picture-in-picture; fullscreen':'';
    f.referrerPolicy='strict-origin-when-cross-origin';
    if(kind==='video')f.allowFullscreen=true;
    f.addEventListener('load',()=>d.classList.add('is-loaded'));
    d.querySelector('.embed-frame').appendChild(f);
    d.showModal();
    d.querySelector('.embed-close').focus();
  }
  document.addEventListener('click',e=>{
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    const v=e.target.closest('[data-video]');
    if(v){
      e.preventDefault();
      const id=v.dataset.video;
      open('video','https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0&modestbranding=1&playsinline=1',v.dataset.videoTitle||'Vidéo','https://youtu.be/'+id,'Ouvrir sur YouTube');
      return;
    }
    const c=e.target.closest('[data-calendly]');
    if(c){
      e.preventDefault();
      const host=location.hostname||'guillaumebru.com';
      open('calendly',CALENDLY+'?embed_domain='+encodeURIComponent(host)+'&embed_type=Inline&hide_gdpr_banner=1','Réserver un échange',CALENDLY,'Ouvrir dans Calendly');
    }
  });
})();

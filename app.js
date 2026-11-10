document.documentElement.classList.add('js');
const toggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#main-navigation');
function closeMenu(){toggle?.setAttribute('aria-expanded','false');if(toggle)toggle.textContent='Menu';}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Fermer':'Menu';});
navigation?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();const opener=event.target.closest('[data-open]');if(opener)document.getElementById(opener.dataset.open)?.showModal();if(event.target.closest('[data-close]'))event.target.closest('dialog')?.close();});
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}));


const menu=document.querySelector('.menu'),nav=document.querySelector('.navlinks');
if(menu)menu.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
const glow=document.querySelector('.cursor-glow');
if(glow)window.addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
const panel=document.querySelector('.hero-panel');
if(panel&&matchMedia('(pointer:fine)').matches){
panel.addEventListener('pointermove',e=>{const r=panel.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;panel.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`});
panel.addEventListener('pointerleave',()=>panel.style.transform='');
}
const topBtn=document.querySelector('.top-btn');
window.addEventListener('scroll',()=>{if(topBtn)topBtn.classList.toggle('show',scrollY>600)});
if(topBtn)topBtn.onclick=()=>scrollTo({top:0,behavior:'smooth'});

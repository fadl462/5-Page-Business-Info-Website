
/* SERVICES V3.1 SCRIPT */

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

const orbital=document.querySelector('.home-v2 .orbital');
if(orbital&&matchMedia('(pointer:fine)').matches){
 orbital.addEventListener('pointermove',e=>{const r=orbital.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;orbital.style.transform=`perspective(1200px) rotateY(${x*4}deg) rotateX(${-y*4}deg)`});
 orbital.addEventListener('pointerleave',()=>orbital.style.transform='');
}

const storyCore=document.querySelector('.about-v2 .story-core');
if(storyCore&&matchMedia('(pointer:fine)').matches){
 storyCore.addEventListener('pointermove',e=>{const r=storyCore.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;storyCore.style.transform=`perspective(1200px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`});
 storyCore.addEventListener('pointerleave',()=>storyCore.style.transform='');
}


const serviceData=[
 {n:'01 / BUSINESS CONSULTING',t:'Business Consulting',l:'Practical guidance for strategy, operations, growth decisions and business challenges.',need:'A clearer view of the decision in front of you, stronger direction and a practical route forward.',o:['Structured options and recommendations','Practical strategic direction','Decision-ready next steps'],visual:'consulting'},
 {n:'02 / PROJECT MANAGEMENT',t:'Project Management',l:'Planning, coordination and delivery support that keeps important initiatives organized.',need:'A project that needs structure, coordination, accountability and steady forward movement.',o:['Clear plans and priorities','Coordination across people and tasks','Progress tracking and delivery support'],visual:'timeline'},
 {n:'03 / PROCESS IMPROVEMENT',t:'Process Improvement',l:'Identify friction, simplify workflows and create more effective ways of working.',need:'Workflows that feel slower, harder or more complicated than they should be.',o:['Process mapping and review','Practical workflow improvements','Clearer roles and handoffs'],visual:'workflow'},
 {n:'04 / DIGITAL SOLUTIONS',t:'Digital Solutions',l:'Practical digital improvements that strengthen communication, operations and customer experience.',need:'A business process or customer experience that could work smarter with the right digital approach.',o:['Digital workflow improvements','Better information and communication','Practical tools and implementation guidance'],visual:'grid-visual'},
 {n:'05 / RESEARCH & ANALYSIS',t:'Research & Analysis',l:'Structured research and insight to support planning, evaluation and evidence-based decisions.',need:'Reliable evidence, clearer insight or structured analysis to support an important decision.',o:['Research design and structured inquiry','Data and evidence synthesis','Actionable findings and recommendations'],visual:'radar'},
 {n:'06 / ONGOING ADVISORY',t:'Ongoing Advisory',l:'Flexible access to professional support when your business needs an experienced extra pair of hands.',need:'An experienced external perspective available when priorities shift or decisions need pressure-testing.',o:['Regular advisory access','Decision and problem-solving support','Flexible support as needs change'],visual:'compass'}
];
const tabs=document.querySelectorAll('.services-v2 .service-tab');
const chips=document.querySelectorAll('.services-v2 .mobile-service-chip');
if(tabs.length){
 const detail=document.querySelector('.services-v2 .service-detail');
 const inner=detail?.querySelector('.detail-inner');
 const n=document.getElementById('detailNumber'),t=document.getElementById('detailTitle'),l=document.getElementById('detailLead'),need=document.getElementById('detailNeed'),out=document.getElementById('detailOutcomes'),visual=document.getElementById('serviceVisual');
 let current=0,busy=false;
 const visualMarkup={
  consulting:'<span class="sv-node">PLAN</span><span class="sv-node">GOAL</span><span class="sv-node">MOVE</span><span class="sv-line"></span><span class="sv-line"></span>',
  timeline:'<span class="sv-line"></span><span class="sv-dot"></span><span class="sv-dot"></span><span class="sv-dot"></span><span class="sv-dot"></span>',
  workflow:'<span class="sv-node">01</span><span class="sv-node">02</span><span class="sv-node">03</span><span class="sv-line"></span><span class="sv-line"></span>',
  'grid-visual':'',
  radar:'<span class="sv-dot"></span>',
  compass:'<span class="sv-orbit"></span><span class="sv-node">N</span><span class="sv-line"></span>'
 };
 const syncChips=i=>chips.forEach((x,j)=>x.classList.toggle('active',i===j));
 const setService=i=>{
   if(i===current && !busy)return;
   const d=serviceData[i]; current=i; syncChips(i);
   tabs.forEach((x,j)=>{x.classList.toggle('active',i===j);x.setAttribute('aria-selected',i===j)});
   if(busy)return;
   busy=true;
   inner?.classList.add('detail-exit'); detail?.classList.add('is-switching');
   setTimeout(()=>{
     n.textContent=d.n;t.textContent=d.t;l.textContent=d.l;need.textContent=d.need;out.innerHTML=d.o.map(x=>`<li>${x}</li>`).join('');
     visual.className='service-visual '+d.visual; visual.innerHTML=visualMarkup[d.visual]||'';
     inner?.classList.remove('detail-exit'); detail?.classList.remove('is-switching');
     busy=false;
   },170);
 };
 tabs.forEach((b,i)=>b.addEventListener('click',()=>setService(i)));
 chips.forEach((b,i)=>b.addEventListener('click',()=>{setService(i);document.querySelector('.services-v2 .service-detail')?.scrollIntoView({behavior:'smooth',block:'center'})}));
}

/* FAQ V3 — robust accordion + filtering for the current FAQ cards */
(function(){
  const faqItems=[...document.querySelectorAll('.faq-v2 .faq-card, .faq-v2 .faq-item')];
  const filters=[...document.querySelectorAll('.faq-v2 .faq-filter')];
  const empty=document.getElementById('faqEmpty');
  if(!faqItems.length) return;

  const setOpen=(item,open)=>{
    item.classList.toggle('is-open',open);
    const q=item.querySelector('.faq-question');
    if(q) q.setAttribute('aria-expanded',String(open));
  };

  faqItems.forEach(item=>{
    const q=item.querySelector('.faq-question');
    if(!q) return;
    q.addEventListener('click',()=>{
      const willOpen=!item.classList.contains('is-open');
      faqItems.forEach(other=>{if(other!==item)setOpen(other,false)});
      setOpen(item,willOpen);
    });
  });

  filters.forEach(filter=>filter.addEventListener('click',()=>{
    const category=filter.dataset.filter || 'all';
    filters.forEach(f=>f.classList.toggle('active',f===filter));
    let shown=0;
    faqItems.forEach(item=>{
      const match=category==='all' || item.dataset.category===category;
      item.classList.toggle('is-hidden',!match);
      item.classList.toggle('is-filtered',!match);
      if(!match) setOpen(item,false);
      if(match) shown++;
    });
    if(empty) empty.style.display=shown ? 'none' : 'block';
    if(shown && window.innerWidth<851) document.getElementById('faqList')?.scrollIntoView({behavior:'smooth',block:'start'});
  }));
})();

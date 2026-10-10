
const btn=document.getElementById('menuBtn'),nav=document.getElementById('nav');
btn.addEventListener('click',()=>{const o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}});
document.getElementById('yr').textContent=new Date().getFullYear();
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target,s=encodeURIComponent('Portfolio message from '+f.name.value);
  const b=encodeURIComponent(f.msg.value+'\n\n'+f.name.value+' ('+f.email.value+')');
  document.getElementById('note').textContent='Opening your email app to send the message.';
  location.href='mailto:shaidelosantos77@gmail.com?subject='+s+'&body='+b;
});

/* Scroll animations */
(function(){
  const root=document.documentElement;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!('IntersectionObserver' in window)||reduce){return;}
  root.classList.add('js');

  const add=(sel,cls,step)=>document.querySelectorAll(sel).forEach((el,i)=>{
    el.classList.add('reveal');if(cls)el.classList.add(cls);
    el.style.setProperty('--d',(i*(step||0.1))+'s');
  });
  add('.hero .wrap > div:first-child','from-left');
  add('.hero .photo','from-right');
  add('section:not(.hero) h2');
  add('.about .portrait','from-left');
  add('.about > div:last-child');
  add('.skill-group','',0.15);
  add('.card','',0.15);
  add('.col-edu .timeline li','from-left',0.18);
  add('.col-exp .timeline li','from-right',0.18);
  add('.contact .wrap > div');
  add('#contactForm','from-right');

  const countUp=el=>{
    const end=parseInt(el.textContent,10),t0=performance.now(),dur=1400;
    const tick=t=>{const p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3);
      el.textContent=Math.round(end*e)+'%';if(p<1)requestAnimationFrame(tick)};
    el.textContent='0%';requestAnimationFrame(tick);
  };

  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting)return;
      const el=en.target;el.classList.add('in');
      if(el.classList.contains('skill-group')){
        el.querySelectorAll('li').forEach((li,i)=>{
          li.querySelector('i').style.setProperty('--d',(i*0.15)+'s');
          setTimeout(()=>countUp(li.querySelector('b')),350+i*150);
        });
      }
      io.unobserve(el);
    });
  },{threshold:.15,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
})();

/* Project slideshows */
document.querySelectorAll('.shots').forEach(box=>{
  const slides=[...box.querySelectorAll('.slide')],dots=[...box.querySelectorAll('.dot')];
  let i=0,timer=null;
  const show=n=>{i=(n+slides.length)%slides.length;
    slides.forEach((s,k)=>s.classList.toggle('active',k===i));
    dots.forEach((d,k)=>d.classList.toggle('active',k===i));};
  const start=()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    stop();timer=setInterval(()=>show(i+1),3500);};
  const stop=()=>{clearInterval(timer);timer=null;};
  dots.forEach((d,k)=>d.addEventListener('click',()=>{show(k);start();}));
  box.addEventListener('mouseenter',stop);box.addEventListener('mouseleave',start);
  box.addEventListener('focusin',stop);box.addEventListener('focusout',start);
  start();
});

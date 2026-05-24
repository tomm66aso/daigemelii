
'use strict';
const prog=document.querySelector('.prog');
const nav=document.querySelector('.nav');
const heroBg=document.querySelector('.hero__bg');

window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  const max=document.body.scrollHeight-window.innerHeight;
  const pct=max>0?Math.min(1,y/max):0;
  if(nav) nav.classList.toggle('scrolled',y>50);
  if(prog) prog.style.transform='scaleX('+pct+')';
  if(heroBg&&y<window.innerHeight)
    heroBg.style.transform='scale(1.02) translateY('+(y*.2)+'px)';
},{passive:true});

const burger=document.querySelector('.burger');
const mmenu=document.querySelector('.mmenu');
if(burger&&mmenu){
  burger.addEventListener('click',()=>{
    const o=burger.classList.toggle('open');
    mmenu.classList.toggle('open',o);
    document.body.classList.toggle('locked',o);
    burger.setAttribute('aria-expanded',o);
  });
  mmenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    burger.classList.remove('open');
    mmenu.classList.remove('open');
    document.body.classList.remove('locked');
  }));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&mmenu.classList.contains('open')){
      burger.classList.remove('open');mmenu.classList.remove('open');
      document.body.classList.remove('locked');
    }
  });
}

// Active link
(()=>{
  const path=location.pathname.replace(/\.html$/,'').replace(/\/$/,'')||'/';
  document.querySelectorAll('.nav__links a,.mmenu__nav a').forEach(a=>{
    const h=a.getAttribute('href').replace(/\.html$/,'').replace(/\/$/,'')||'/';
    if(h===path) a.classList.add('active');
  });
})();

// Reveal
const ro=new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);}});
},{threshold:.06,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal,.reveal-img').forEach(el=>ro.observe(el));

// Loader (home only)
const loader=document.querySelector('.loader');
if(loader){
  const ct=loader.querySelector('.loader__counter');
  let c=0;loader.classList.add('filling');
  const iv=setInterval(()=>{
    c+=Math.floor(Math.random()*14)+6;
    if(c>=100){
      c=100;if(ct)ct.textContent='100';clearInterval(iv);
      setTimeout(()=>{
        loader.classList.add('done');
        document.body.classList.remove('locked');
        setTimeout(()=>loader.classList.add('gone'),1500);
      },200);
    }else{if(ct)ct.textContent=String(c).padStart(2,'0');}
  },30);
}

// Letter anim
document.querySelectorAll('.word').forEach(w=>{
  w.querySelectorAll('.ltr').forEach((l,i)=>{
    l.style.setProperty('--i',i);
    const f=l.querySelector('.ltr-f');
    if(f)f.style.setProperty('--i',i);
  });
});

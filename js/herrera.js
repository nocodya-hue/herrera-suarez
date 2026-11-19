/* Herrera Suárez · interacción ligera (sin librerías) */
(() => {
  const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
  document.documentElement.classList.remove('sin-js');

  /* un solo bucle de scroll (rAF) */
  let pid = 0;
  const cab = $('#cab'), barra = $('.barra'), portada = $('#inicio');
  const tarea = () => { cab.classList.toggle('solida', scrollY > 20); if (barra) barra.classList.toggle('ver', scrollY > portada.offsetHeight * 0.6); };
  addEventListener('scroll', () => { if (!pid) pid = requestAnimationFrame(() => { pid = 0; tarea(); }); }, { passive: true });

  /* revelado y tejados que se dibujan al llegar */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
  $$('.revelar').forEach((el, i) => { el.style.setProperty('--r', `${(i % 3) * 0.07}s`); io.observe(el); });
  $$('.tejado').forEach((el) => io.observe(el));

  /* cinta: parada fuera de pantalla */
  const cinta = $('.cinta');
  if (cinta) new IntersectionObserver((es) => es.forEach((e) => cinta.classList.toggle('parada', !e.isIntersecting))).observe(cinta);

  /* formulario → WhatsApp */
  const form = $('#formulario');
  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const t = [`Hola, soy ${d.get('nombre')}.`, `Necesito: ${d.get('que')}.`, d.get('donde') ? `En ${d.get('donde')}.` : '', d.get('msg') || ''].filter(Boolean).join(' ');
    open(`https://wa.me/${window.WA}?text=${encodeURIComponent(t)}`, '_blank', 'noopener');
  });

  tarea();
})();

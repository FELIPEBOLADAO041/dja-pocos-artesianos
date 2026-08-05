/* DJA | interações da landing page */

const WHATSAPP = '5541998090467';

/* ---------- header: sombra ao rolar ---------- */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- menu mobile ---------- */
const burger = document.getElementById('burger');
burger.addEventListener('click', () => {
  const open = header.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- vídeo: capa → modal ---------- */
(function () {
  const player = document.getElementById('video-player');
  if (!player) return;

  const modal = document.getElementById('video-modal');
  const frame = document.getElementById('video-frame');
  const fechar = document.getElementById('video-close');

  const ID = 'dq-F6xP5usw';
  /* domínio normal (não o nocookie) + referrerpolicy: sem isso o YouTube
     devolve erro 153 quando a página é aberta sem referrer, ex.: file:// */
  const EMBED = `https://www.youtube.com/embed/${ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

  /* aberto direto do disco o embed não funciona: manda pro YouTube */
  const semServidor = location.protocol === 'file:';

  function abrir() {
    if (semServidor) {
      window.open(`https://www.youtube.com/watch?v=${ID}`, '_blank', 'noopener');
      return;
    }

    /* o iframe só nasce no clique: nada de YouTube carregando no fundo */
    frame.innerHTML = `<iframe src="${EMBED}" title="Vídeo da DJA Manutenções"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen></iframe>`;
    modal.hidden = false;
    document.body.classList.add('is-locked');
    fechar.focus();
  }

  function fechado() {
    modal.hidden = true;
    frame.innerHTML = '';           /* remove o iframe = para o áudio */
    document.body.classList.remove('is-locked');
    player.focus();
  }

  player.addEventListener('click', abrir);
  player.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); }
  });

  fechar.addEventListener('click', fechado);
  modal.addEventListener('click', e => { if (e.target === modal) fechado(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) fechado();
  });
})();

/* ---------- formulário → WhatsApp ---------- */
const form = document.getElementById('form-contato');

form.addEventListener('submit', e => {
  e.preventDefault();

  const v = id => document.getElementById(id).value.trim();
  const obrigatorios = ['nome', 'telefone', 'cidade', 'problema'];

  const faltando = obrigatorios.find(id => !v(id));
  if (faltando) {
    const campo = document.getElementById(faltando);
    campo.focus();
    campo.reportValidity?.();
    return;
  }

  const linhas = [
    'Olá! Vim pelo site da DJA. Meu poço está com problema e gostaria de um orçamento.',
    '',
    `*Nome:* ${v('nome')}`,
    `*Contato:* ${v('telefone')}`,
    `*Cidade do poço:* ${v('cidade')}`,
    `*Problema:* ${v('problema')}`
  ];

  if (v('mensagem')) linhas.push(`*Mensagem:* ${v('mensagem')}`);

  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(linhas.join('\n'))}`,
    '_blank',
    'noopener'
  );
});

/* ---------- carrossel de serviços ---------- */
(function () {
  const raiz = document.getElementById('carrossel');
  if (!raiz) return;

  const track = document.getElementById('carrossel-track');
  const dotsBox = document.getElementById('carrossel-dots');
  const slides = Array.from(track.children);
  const total = slides.length;
  const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let atual = 0;
  let timer = null;
  const INTERVALO = 4500;

  /* monta os botões de navegação */
  const dots = slides.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Ver foto ${i + 1} de ${total}`);
    b.addEventListener('click', () => { ir(i); reiniciar(); });
    dotsBox.appendChild(b);
    return b;
  });

  /* garante que o slide já esteja baixado antes de entrar na tela */
  function precarregar(i) {
    const img = slides[(i + total) % total].querySelector('img');
    if (img && !img.complete) img.loading = 'eager';
  }

  function ir(i) {
    atual = (i + total) % total;
    track.style.transform = `translate3d(${-atual * 100}%, 0, 0)`;
    dots.forEach((d, n) => d.setAttribute('aria-selected', String(n === atual)));
    slides.forEach((s, n) => s.setAttribute('aria-hidden', String(n !== atual)));
    precarregar(atual + 1);
    precarregar(atual - 1);
  }

  const proximo = () => ir(atual + 1);
  const anterior = () => ir(atual - 1);

  document.getElementById('carrossel-next').addEventListener('click', () => { proximo(); reiniciar(); });
  document.getElementById('carrossel-prev').addEventListener('click', () => { anterior(); reiniciar(); });

  /* autoplay */
  function iniciar() {
    if (semAnimacao || timer) return;
    timer = setInterval(proximo, INTERVALO);
  }
  function parar() {
    clearInterval(timer);
    timer = null;
  }
  function reiniciar() {
    parar();
    iniciar();
  }

  raiz.addEventListener('mouseenter', parar);
  raiz.addEventListener('mouseleave', iniciar);
  raiz.addEventListener('focusin', parar);
  raiz.addEventListener('focusout', iniciar);

  /* pausa quando a seção sai da tela */
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(
      ([e]) => (e.isIntersecting ? iniciar() : parar()),
      { threshold: .25 }
    ).observe(raiz);
  } else {
    iniciar();
  }

  /* arrastar com mouse ou dedo */
  let inicioX = 0;
  let deslocamento = 0;
  let arrastando = false;

  const largura = () => raiz.getBoundingClientRect().width || 1;

  track.addEventListener('pointerdown', e => {
    if (e.button !== undefined && e.button !== 0) return;
    arrastando = true;
    inicioX = e.clientX;
    deslocamento = 0;
    track.classList.add('is-dragging');
    track.setPointerCapture(e.pointerId);
    parar();
  });

  track.addEventListener('pointermove', e => {
    if (!arrastando) return;
    deslocamento = e.clientX - inicioX;
    const pct = (deslocamento / largura()) * 100;
    track.style.transform = `translate3d(${-atual * 100 + pct}%, 0, 0)`;
  });

  function soltar() {
    if (!arrastando) return;
    arrastando = false;
    track.classList.remove('is-dragging');

    const limite = largura() * .18;
    if (deslocamento > limite) anterior();
    else if (deslocamento < -limite) proximo();
    else ir(atual);

    reiniciar();
  }

  track.addEventListener('pointerup', soltar);
  track.addEventListener('pointercancel', soltar);

  /* setas do teclado */
  raiz.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { proximo(); reiniciar(); }
    if (e.key === 'ArrowLeft') { anterior(); reiniciar(); }
  });

  ir(0);
})();

/* ---------- ano no rodapé ---------- */
document.getElementById('ano').textContent = new Date().getFullYear();

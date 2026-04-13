function toggleDay(el) {
  const wasOpen = el.classList.contains('open');
  document.querySelectorAll('.day-card').forEach(d => d.classList.remove('open'));
  if (!wasOpen) el.classList.add('open');
}

function toggleCheck(el) {
  el.classList.toggle('done');
  saveChecklist();
}

function saveChecklist() {
  const items = document.querySelectorAll('.check-item');
  const state = Array.from(items).map(i => i.classList.contains('done'));
  try { localStorage.setItem('disney-checklist', JSON.stringify(state)); } catch(e) {}
}

function loadChecklist() {
  try {
    const state = JSON.parse(localStorage.getItem('disney-checklist'));
    if (state) {
      const items = document.querySelectorAll('.check-item');
      items.forEach((item, i) => { if (state[i]) item.classList.add('done'); });
    }
  } catch(e) {}
}

loadChecklist();

const navLinks = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const target = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (target) target.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

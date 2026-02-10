document.addEventListener('DOMContentLoaded', () => {
  // Current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typing effect
  const tagline = document.getElementById('tagline');
if (tagline) {
  // Get the text from the data-text attribute
  const text = tagline.dataset.text || ""; 
  let ti = 0;
  function type() {
    if (ti < text.length) {
      tagline.textContent += text.charAt(ti);
      ti++;
      setTimeout(type, 45);
    }
  }
  type();
}

  // Dark mode toggle
  const toggle = document.getElementById('darkModeToggle');
  function applyDark(isDark){
    document.body.classList.toggle('dark', isDark);
    toggle?.setAttribute('aria-pressed', isDark ? 'true':'false');
  }
  const saved = localStorage.getItem('darkMode');
  applyDark(saved === 'true');

  toggle?.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    applyDark(isDark);
    localStorage.setItem('darkMode', isDark?'true':'false');
  });

  // Reveal on scroll
  const sections = document.querySelectorAll('section');
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold:0.15});
    sections.forEach(s => observer.observe(s));
  } else {
    sections.forEach(s => s.classList.add('visible'));
  }
});
const readMoreButtons = document.querySelectorAll('.read-more-btn');

readMoreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.previousElementSibling; // the blog-content div
    content.classList.toggle('show');
    btn.textContent = content.classList.contains('show') ? 'Read Less' : 'Read More';
  });
});

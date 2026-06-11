// inject-navbar.js
(function() {
  const container = document.getElementById('navbar-container');
  if (!container) return;
  
  // 1. جلب HTML النافبار
  fetch('/assets/src/html/nev.html')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load navbar');
      return res.text();
    })
    .then(html => {
      // حقن HTML في الصفحة
      container.innerHTML = html;
      
      // 2. تحميل سكريبت النافبار لو لسه متحمّلش
      if (!document.querySelector('script[src*="nev.js"]')) {
        const script = document.createElement('script');
        script.src = '/assets/src/js/sections/nev/nev.js'; // مسار مطلق عشان يشتغل من أي صفحة
        script.defer = true;
        document.body.appendChild(script);
      }
    })
    .catch(err => console.error('Navbar injection failed:', err));
})();
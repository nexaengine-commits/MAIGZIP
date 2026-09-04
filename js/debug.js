// Console visible à'écran (debug mobile)
(function() {
  const c document.createElement('pre');
  c.style.cssText = 'position:fixed;bottom:0;left:0;right:0;max-height:30%;overflow:auto;background:#000;color:#0f0;font-size:10px;padding:4px;z-index:9999;';
  document.body.appendChild(c);
  window.addEventListener('error', function(e) {
    c.textContent += '❌ ' + e.message + 'ligne ' + e.lineno + ')\n';
  });
  c.textContent += '✅ debug chargé\n';
})();

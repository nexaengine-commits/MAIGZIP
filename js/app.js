// ===== MAIGZIP v0.1 — Jour 1 =====
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const results = document.getElementById('results');

// Ouvrir le sélecteur de fichiers au toucher
dropzone.addEventListener('click', () => fileInput.click());

// Gérer les fichiers sélectionnés
fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
});

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' o';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / (1024 * 1024)).toFixed(2) + ' Mo';
function handleFiles(files) {
  for (const file of files) {
    if (file.type.startsWith('image/')) {
      compressImage(file);
    } else {
      showResult(file.name, file.size, file.size); // non supporté encore
    }
  }
}

// Compression d'image (canvas API) — fonctionne DÈS aujourd'hui
function compressImage(file) {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    // Réduire à max 1920px de large (garde qualité téléphone)
    const scale = Math.min(1, 1920 / img.width);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        showResult(file.name, file.size, blob.size, blob, 'image/webp');
      }
    }, 'image/webp', 0.8); // qualité 80%
  };
  img.src = URL.createObjectURL(file);
function showResult(name, originalSize, newSize, blob, type) {
  const gain = Math.round((1 - newSize / originalSize) * 100);
  const div = document.createElement('div');
  div.className = 'result-item';
  div.innerHTML = `
    <strong>${name}</strong><br>
    formatSize(originalSize)→<spanclass="gain">{formatSize(originalSize)} →<span class="gain">formatSize(originalSize)→<spanclass="gain">{formatSize(newSize)}</span>
    (${gain > 0 ? '-' + gain + '%' : 'déjà optimisé'})
  `;

  // Bouton de téléchargement si compression réussie
  if (blob && gain > 0) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name.replace(/\.\w+$/, '') + '.webp';
    a.textContent = ' ⬇️ Télécharger';
    a.style.color = '#00e5a0';
    div.appendChild(a);
  }
  results.appendChild(div);
}

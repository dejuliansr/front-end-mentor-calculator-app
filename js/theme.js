document.addEventListener('DOMContentLoaded', function () {
  const themeButton = document.getElementById('themeButton');
  const slider = document.getElementById('slider');
  const body = document.body;

  let currentTheme = 0;
  const themes = ['theme-one', 'theme-two', 'theme-three'];

  // Fungsi untuk menyimpan tema ke localStorage
  function saveTheme(themeIndex) {
    localStorage.setItem('selectedTheme', themeIndex);
  }

  // Fungsi untuk memuat tema dari localStorage
  function loadTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme !== null) {
      currentTheme = parseInt(savedTheme, 10); // Konversi ke number
      body.className = themes[currentTheme];
      updateSliderPosition();
    }
  }

  // Fungsi untuk memperbarui posisi slider
  function updateSliderPosition() {
    slider.style.left = `${currentTheme * 16}px`; // Sesuaikan dengan kebutuhan
  }

  // Muat tema yang disimpan saat halaman dimuat
  loadTheme();

  // Tambahkan event listener untuk tombol tema
  themeButton.addEventListener('click', function () {
    currentTheme = (currentTheme + 1) % themes.length;
    body.className = themes[currentTheme];
    updateSliderPosition();
    saveTheme(currentTheme); // Simpan tema yang dipilih
  });
});
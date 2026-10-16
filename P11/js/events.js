// =============================================================
// P11 — events.js: pemasangan seluruh pendengar peristiwa
// Pendengar hanya membaca apa yang diklik/diketik pengguna, lalu
// menyerahkannya ke fungsi pengubah di state.js. Tidak ada state.x = ... di sini.
// =============================================================

import { state, pilihKategori, ubahKolom, sentuhKolom, kirimForm } from "./state.js";
import { barisFilter, form, fokusKolomGalat } from "./dom.js";

export function pasangPendengar() {
  // satu pendengar di induk untuk semua tombol filter
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return; // klik di sela tombol, abaikan
    pilihKategori(tombol.dataset.kategori);
  });

  // satu pendengar di form untuk ketiga kolom; kolom dikenali dari data-kolom
  form.addEventListener("input", (event) => {
    ubahKolom(event.target.dataset.kolom, event.target.value);
  });

  form.addEventListener("change", (event) => {
    sentuhKolom(event.target.dataset.kolom); // selesai mengisi satu kolom: mulai dinilai
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // halaman tidak dimuat ulang
    if (!kirimForm()) fokusKolomGalat(state.form);
  });
}

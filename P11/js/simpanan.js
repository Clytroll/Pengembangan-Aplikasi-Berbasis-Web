// =============================================================
// P11 — simpanan.js: simpan dan muat pilihan pengguna di localStorage
// Hanya pilihan tampilan yang disimpan, bukan data dan bukan isian form.
// =============================================================

const KUNCI = "pabw-p11";
const VERSI = 1;

export function simpan(state) {
  // localStorage hanya menerima teks, jadi objek diubah dulu dengan JSON.stringify
  const isi = { versi: VERSI, kategoriAktif: state.kategoriAktif, temaDibalik: state.temaDibalik };
  localStorage.setItem(KUNCI, JSON.stringify(isi));
}

export function muat() {
  try { return JSON.parse(localStorage.getItem(KUNCI)); } // null bila belum pernah disimpan
  catch { return null; } // simpanan rusak: pakai nilai bawaan
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
}

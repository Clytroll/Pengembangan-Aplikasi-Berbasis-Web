// =============================================================
// P11 — simpanan.js: simpan dan muat pilihan pengguna di localStorage
// P12: dipindahkan apa adanya; dipanggil dari onMounted, watch, dan tombol atur ulang di App.vue
// Hanya pilihan tampilan yang disimpan. Sengaja TIDAK disimpan di sini:
// isian form yang belum dikirim, data referensi dari wger.de, token/kata sandi,
// dan data pribadi (nama, NIM) — localStorage tidak terenkripsi.
// =============================================================

const KUNCI = "pabw-p11";
const VERSI = 1; // naikkan bila bentuk isi simpanan berubah

export function simpan(state) {
  // localStorage hanya menerima teks, jadi objek diubah dulu dengan JSON.stringify
  const isi = { versi: VERSI, kategoriAktif: state.kategoriAktif, temaDibalik: state.temaDibalik };
  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch (galat) {
    // penyimpanan diblokir atau penuh: halaman tetap jalan, hanya tidak mengingat
    console.warn("Pilihan tidak tersimpan:", galat.message);
  }
}

// mengembalikan isi simpanan yang sah, atau null (belum ada, rusak, atau bentuk lama)
export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI)); // getItem null → JSON.parse(null) → null
    if (isi?.versi !== VERSI) {
      localStorage.removeItem(KUNCI); // belum ada, bentuk lama, atau asing: buang
      return null;
    }
    return isi;
  } catch {
    aturUlang(); // isi rusak (bukan JSON) atau penyimpanan diblokir: buang tanpa melempar galat lagi
    return null;
  }
}

export function aturUlang() {
  try { localStorage.removeItem(KUNCI); }
  catch { /* penyimpanan diblokir: memang tidak ada yang perlu dihapus */ }
}

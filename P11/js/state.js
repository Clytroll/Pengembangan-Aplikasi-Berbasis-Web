// =============================================================
// P11 — state.js: objek state tunggal dan fungsi pengubahnya
// Tidak ada bagian lain yang mengubah state langsung. Setiap fungsi
// pengubah di sini mengubah state, lalu memanggil render(state).
// =============================================================

import { KATEGORI, daftarProyek, formatTanggal, formSah } from "./data.js";
import { simpanCatatan } from "./api.js";
import { render } from "./dom.js";
import { simpan, muat, aturUlang } from "./simpanan.js";

// nilai bawaan pada kunjungan pertama, atau setelah simpanan dibuang
const BAWAAN = { kategoriAktif: "semua", temaDibalik: false };

const formKosong = () => ({ jenis: "", tanggal: "", durasi: "" });

const tersimpan = muat(); // null pada kunjungan pertama atau bila simpanan dibuang

// versi cocok belum tentu isinya benar: nilai yang tidak dikenal diganti nilai bawaan
const kategoriTersimpan = KATEGORI.includes(tersimpan?.kategoriAktif) ? tersimpan.kategoriAktif : null;
const temaTersimpan = typeof tersimpan?.temaDibalik === "boolean" ? tersimpan.temaDibalik : null;

export const state = {
  kategoriAktif: kategoriTersimpan ?? BAWAAN.kategoriAktif,
  temaDibalik: temaTersimpan ?? BAWAAN.temaDibalik, // true = kebalikan tema sistem (#tema dicentang)
  daftarProyek,
  form: {
    nilai: formKosong(),  // isi ketiga kolom, diperbarui tiap ketikan
    sudahDikirim: false,  // setelah submit pertama, semua kolom dinilai
    kolomDisentuh: [],    // kolom yang sudah selesai diisi (peristiwa change)
    pesan: "",            // teks di bawah tombol Simpan
  },
  referensi: { keadaan: "memuat", daftar: [], pesan: "" }, // data P10 dari wger.de
};

// ---------- Target dan filter ----------

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  simpan(state); // sesudah keadaan berubah, sebelum render
  render(state);
}

// ---------- Tema dan atur ulang ----------

export function pilihTema(dibalik) {
  state.temaDibalik = dibalik;
  simpan(state);
  render(state);
}

export function aturUlangPilihan() {
  aturUlang(); // simpanan benar-benar dihapus, bukan hanya tampilannya
  Object.assign(state, BAWAAN);
  render(state);
}

// ---------- Form Catat Latihan ----------

export function ubahKolom(kunci, nilai) {
  state.form.nilai[kunci] = nilai;
  state.form.pesan = "";
  render(state);
}

export function sentuhKolom(kunci) {
  if (!state.form.kolomDisentuh.includes(kunci)) state.form.kolomDisentuh.push(kunci);
  render(state);
}

// mengembalikan true bila catatan tersimpan, false bila masih ada kolom yang salah
export function kirimForm() {
  const { form } = state;
  form.sudahDikirim = true;

  if (!formSah(form.nilai)) {
    render(state);
    return false;
  }

  const catatan = { jenis: form.nilai.jenis.trim(), tanggal: form.nilai.tanggal, durasi: Number(form.nilai.durasi) };
  const jumlah = simpanCatatan(catatan); // catatan disimpan api.js (P10), bukan bagian dari state
  form.pesan = `Tersimpan: ${catatan.jenis}, ${formatTanggal(catatan.tanggal)}, ${catatan.durasi} menit (${jumlah} catatan di peramban ini).`;
  form.nilai = formKosong();
  form.sudahDikirim = false;
  form.kolomDisentuh = [];
  render(state);
  return true;
}

// ---------- Referensi latihan dari jaringan ----------

export function terimaReferensi(daftar) {
  state.referensi = { keadaan: "berhasil", daftar, pesan: "" };
  render(state);
}

export function gagalReferensi(galat) {
  state.referensi = { keadaan: "gagal", daftar: [], pesan: galat.message };
  render(state);
}

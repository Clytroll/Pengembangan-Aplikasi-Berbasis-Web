// =============================================================
// P12 — state.js: objek state P11 yang dibungkus reactive()
// Fungsi pengubah hanya mengubah state. Tidak ada pemanggilan gambar ulang manual:
// Vue menggambar ulang bagian template yang membaca nilai yang berubah.
// Isian form tidak lagi di sini: ia ref lokal di FormKontak.vue.
// =============================================================

import { reactive } from 'vue'
import { daftarProyek } from './data.js'

// nilai bawaan pada kunjungan pertama, atau setelah simpanan dibuang
export const BAWAAN = { kategoriAktif: 'semua', temaDibalik: false }

export const state = reactive({
  daftarProyek: daftarProyek,
  kategoriAktif: BAWAAN.kategoriAktif,
  temaDibalik: BAWAAN.temaDibalik, // true = kebalikan tema sistem (#tema dicentang)
  referensi: { keadaan: 'memuat', daftar: [], pesan: '' }, // data P10 dari wger.de
})

// ---------- Target dan filter ----------

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai // tanpa menggambar ulang sendiri
}

// ---------- Tema ----------

export function pilihTema(dibalik) {
  state.temaDibalik = dibalik
}

// ---------- Referensi latihan dari jaringan (api.js P10) ----------

export function terimaReferensi(daftar) {
  state.referensi = { keadaan: 'berhasil', daftar, pesan: '' }
}

export function gagalReferensi(galat) {
  state.referensi = { keadaan: 'gagal', daftar: [], pesan: galat.message }
}

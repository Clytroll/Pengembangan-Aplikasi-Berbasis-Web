// =============================================================
// P11 — state.js: objek state tunggal dan fungsi pengubahnya
// =============================================================

import { daftarProyek } from "./data.js";

export const state = {
  kategoriAktif: "semua",
  daftarProyek,
};

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
}

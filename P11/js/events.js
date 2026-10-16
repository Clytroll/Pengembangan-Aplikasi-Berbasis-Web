// =============================================================
// P11 — events.js: pemasangan seluruh pendengar peristiwa
// =============================================================

import { simpanCatatan } from "./api.js";
import { daftarProyek, formatTanggal } from "./data.js";
import { pilihKategori } from "./state.js";
import {
  barisFilter, form, inputJenis, inputTanggal, inputDurasi,
  render, tandaiTombolAktif, tandaiKolom, aturTombolSimpan, tulisStatusForm, fokusKolomGalat,
} from "./dom.js";

const aturanKolom = [
  { kolom: inputJenis, sah: (nilai) => nilai.length >= 3 && nilai.length <= 50 },
  // format tanggal ISO (YYYY-MM-DD) bisa dibandingkan sebagai teks
  { kolom: inputTanggal, sah: (nilai) => nilai !== "" && nilai >= inputTanggal.min && nilai <= inputTanggal.max },
  {
    kolom: inputDurasi,
    sah: (nilai) => {
      const menit = Number(nilai);
      return nilai !== "" && Number.isInteger(menit) && menit >= 5 && menit <= 240 && menit % 5 === 0;
    },
  },
];

let sudahDikirim = false;
const kolomDisentuh = new Set();

function periksaForm() {
  const hasil = aturanKolom.map(({ kolom, sah }) => {
    const layak = sah(kolom.value.trim());
    tandaiKolom(kolom, (sudahDikirim || kolomDisentuh.has(kolom)) && !layak);
    return layak;
  });
  const sah = hasil.every(Boolean);
  if (sudahDikirim || kolomDisentuh.size > 0) aturTombolSimpan(!sah);
  return sah;
}

export function pasangPendengar() {
  // satu pendengar di induk untuk semua tombol filter
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol) return; // klik di sela tombol, abaikan

    pilihKategori(tombol.dataset.kategori);
    tandaiTombolAktif(tombol);
    render(daftarProyek.filter((proyek) => tombol.dataset.kategori === "semua" || proyek.kategori === tombol.dataset.kategori));
  });

  form.addEventListener("input", (event) => {
    tulisStatusForm("");
    if (event.target.getAttribute("aria-invalid") === "true") kolomDisentuh.add(event.target);
    periksaForm();
  });

  form.addEventListener("change", (event) => {
    kolomDisentuh.add(event.target);
    periksaForm();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // halaman tidak dimuat ulang
    sudahDikirim = true;

    if (!periksaForm()) {
      fokusKolomGalat();
      return;
    }

    const catatan = { jenis: inputJenis.value.trim(), tanggal: inputTanggal.value, durasi: Number(inputDurasi.value) };
    const jumlah = simpanCatatan(catatan);
    tulisStatusForm(`Tersimpan: ${catatan.jenis}, ${formatTanggal(catatan.tanggal)}, ${catatan.durasi} menit (${jumlah} catatan di peramban ini).`);

    form.reset();
    sudahDikirim = false;
    kolomDisentuh.clear();
    periksaForm();
    aturTombolSimpan(false);
  });
}

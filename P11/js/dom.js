// =============================================================
// P11 — dom.js: seluruh sentuhan ke halaman (pemilih, render, kelas)
// Tidak memasang pendengar peristiwa; itu tugas events.js.
// =============================================================

import { buatPerkenalan, formatKeahlian, hitungTotal, formatAngka, formatTanggal } from "./data.js";

// ---------- Pemilih ----------

// querySelector yang langsung melapor bila hasilnya null
function ambil(selektor) {
  const elemen = document.querySelector(selektor);
  if (elemen === null) console.error(`Pemilih ${selektor} menghasilkan null — cek profil.html`);
  return elemen;
}

const wadah = ambil("#daftar");
const kosong = ambil("#pesan-kosong");

export const barisFilter = ambil("#filter");
export const form = ambil("#form-latihan");
export const inputJenis = ambil("#jenis-olahraga");
export const inputTanggal = ambil("#tanggal-latihan");
export const inputDurasi = ambil("#durasi");
const tombolSimpan = ambil("#tombol-simpan");
const statusForm = ambil("#status-form");

const wadahLatihan = ambil("#daftar-latihan");
const statusLatihan = ambil("#status-latihan");

// ---------- Elemen kecil dan kartu ----------

// tag, kelas, teks — semua lewat textContent, bukan innerHTML
function buatElemen(tag, kelas, teks) {
  const el = document.createElement(tag);
  if (kelas) el.className = kelas;
  if (teks !== undefined) el.textContent = teks;
  return el;
}

function buatKartu(proyek) {
  const li = buatElemen("li", proyek.utama ? "kartu papan" : "kartu");
  li.dataset.kategori = proyek.kategori;

  const isi = buatElemen("div", "kartu__isi");
  isi.append(buatElemen("h3", "kartu__judul", proyek.judul), buatElemen("p", "", proyek.keterangan));

  if (proyek.tahap?.length) {
    const ol = buatElemen("ol", "kartu__tahap");
    ol.append(...proyek.tahap.map((langkah) => buatElemen("li", "", langkah)));
    isi.append(ol);
  }

  const kaki = buatElemen("div", "kartu__kaki");
  const waktu = proyek.tenggat ? buatElemen("time", "", formatTanggal(proyek.tenggat)) : buatElemen("span", "", "Tiap minggu");
  if (proyek.tenggat) waktu.dateTime = proyek.tenggat;
  kaki.append(buatElemen("span", "lencana", proyek.status), waktu);

  li.append(isi, kaki);
  return li;
}

function buatBarisLatihan({ hari, jenis, durasi, kalori }) {
  const tr = document.createElement("tr");
  const th = buatElemen("th", "", hari);
  th.scope = "row";
  tr.append(th, buatElemen("td", "", jenis), buatElemen("td", "", `${durasi} menit`), buatElemen("td", "", `${formatAngka(kalori)} kkal`));
  return tr;
}

// ---------- Bagian yang tidak pernah berubah: digambar sekali ----------

export function gambarProfil(profil, daftarLatihan) {
  const judulHalaman = `Jadwal Olahraga ${profil.panggilan}`;
  document.title = judulHalaman;
  ambil("#judul-halaman").textContent = judulHalaman;
  ambil("#deskripsi").textContent = profil.deskripsi;
  ambil("#perkenalan").textContent = buatPerkenalan(profil);
  ambil("#keahlian").textContent = `Keahlian: ${formatKeahlian(profil.keahlian)}`;

  ambil("#ringkasan-hari").textContent = `${daftarLatihan.length} hari`;
  ambil("#ringkasan-durasi").textContent = `${hitungTotal(daftarLatihan, "durasi")} menit`;
  ambil("#ringkasan-kalori").textContent = `${formatAngka(hitungTotal(daftarLatihan, "kalori"))} kkal`;

  ambil("#isi-jadwal").replaceChildren(...daftarLatihan.map(buatBarisLatihan));
  ambil("#kaki").textContent = `${profil.nama} · ${profil.nim} · ${profil.tahun}`;
}

// ---------- Daftar target ----------

export function render(daftar) {
  wadah.textContent = ""; // 1. kosongkan lebih dulu

  if (daftar.length === 0) { // 2. periksa keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment(); // halaman digambar sekali
  daftar.forEach((proyek) => fragmen.append(buatKartu(proyek))); // 3. isi ulang
  wadah.append(fragmen);
}

export function tandaiTombolAktif(tombolAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
    tombol.setAttribute("aria-pressed", String(tombol === tombolAktif));
  });
}

// ---------- Form: tanda galat per kolom ----------

export function tandaiKolom(kolom, tampilkanGalat) {
  const galat = document.getElementById(kolom.getAttribute("aria-describedby"));
  if (tampilkanGalat) kolom.setAttribute("aria-invalid", "true");
  else kolom.removeAttribute("aria-invalid");
  galat.hidden = !tampilkanGalat;
}

export function aturTombolSimpan(nonaktif) {
  tombolSimpan.disabled = nonaktif;
}

export function tulisStatusForm(teks) {
  statusForm.textContent = teks;
}

export function fokusKolomGalat() {
  form.querySelector('[aria-invalid="true"]')?.focus(); // pindah ke kolom pertama yang perlu diperbaiki
}

// ---------- Referensi latihan dari jaringan (P10) ----------

// keadaan memuat/gagal/kosong ditulis di satu paragraf; data-keadaan dipakai CSS
export function tampilkanStatus(keadaan, teks) {
  statusLatihan.dataset.keadaan = keadaan;
  statusLatihan.textContent = teks;
  statusLatihan.hidden = false;
}

export function gambarLatihan(daftar) {
  wadahLatihan.textContent = ""; // kartu tidak berlipat saat dimuat ulang

  if (daftar.length === 0) {
    tampilkanStatus("kosong", "Belum ada referensi latihan dari peladen untuk kategori ini.");
    return;
  }
  statusLatihan.hidden = true;

  const fragmen = document.createDocumentFragment();
  daftar.forEach((latihan) => {
    const li = buatElemen("li", "kartu");
    const isi = buatElemen("div", "kartu__isi");
    // textContent: isi dari jaringan tidak pernah dibaca sebagai HTML
    isi.append(
      buatElemen("h3", "kartu__judul", latihan.nama),
      buatElemen("p", "", `Otot: ${latihan.otot.join(", ") || "tidak dicatat"}`),
      buatElemen("p", "", `Alat: ${latihan.alat.join(", ") || "tanpa alat"}`)
    );
    const kaki = buatElemen("div", "kartu__kaki");
    kaki.append(buatElemen("span", "lencana", latihan.kategori), buatElemen("span", "", `wger #${latihan.id}`));
    li.append(isi, kaki);
    fragmen.append(li);
  });
  wadahLatihan.append(fragmen);
}

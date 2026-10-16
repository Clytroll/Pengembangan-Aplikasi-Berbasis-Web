// =============================================================
// P9/P10 — DOM dan event halaman Jadwal Olahraga Arif
// app.js menyimpan data dan fungsi murni, api.js mengambil data dari jaringan;
// berkas ini yang menyentuh halaman.
// =============================================================

import { daftarProyek, formatTanggal } from "./app.js";
import { ambilLatihan, simpanCatatan } from "./api.js";

// ---------- Lembar A: pilih dulu elemennya ----------

// querySelector yang langsung melapor bila hasilnya null (lembar E, kasus 1)
function ambil(selektor) {
  const elemen = document.querySelector(selektor);
  if (elemen === null) console.error(`Pemilih ${selektor} menghasilkan null — cek profil.html`);
  return elemen;
}

const wadah = ambil("#daftar");
const kosong = ambil("#pesan-kosong");
const barisFilter = ambil("#filter");

const form = ambil("#form-latihan");
const inputJenis = ambil("#jenis-olahraga");
const inputTanggal = ambil("#tanggal-latihan");
const inputDurasi = ambil("#durasi");
const tombolSimpan = ambil("#tombol-simpan");
const statusForm = ambil("#status-form");

// ---------- Lembar B: satu isi array, satu kartu ----------

// elemen kecil: tag, kelas, teks — semua lewat textContent, bukan innerHTML
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

// ---------- Lembar D.1: satu fungsi render untuk daftar target ----------

function render(daftar) {
  wadah.textContent = ""; // 1. kosongkan lebih dulu

  if (daftar.length === 0) { // 2. periksa keadaan kosong
    kosong.hidden = false;
    console.log("render: 0 kartu, pesan kosong ditampilkan");
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment(); // halaman digambar sekali
  daftar.forEach((proyek) => fragmen.append(buatKartu(proyek))); // 3. isi ulang
  wadah.append(fragmen);
  console.log(`render: ${daftar.length} kartu`); // satu baris per klik; dua baris = pendengar ganda
}

// ---------- Lembar C: satu pendengar di induk untuk semua tombol filter ----------

function tandaiTombolAktif(tombolAktif) {
  document.querySelectorAll("#filter button").forEach((tombol) => {
    tombol.classList.toggle("aktif", tombol === tombolAktif);
    tombol.setAttribute("aria-pressed", String(tombol === tombolAktif));
  });
}

// dipasang sekali, di luar render (lembar E, kasus 2)
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol) return; // klik di sela tombol, abaikan

  const kategori = tombol.dataset.kategori;
  const terpilih = daftarProyek.filter(
    (proyek) => kategori === "semua" || proyek.kategori === kategori
  );

  tandaiTombolAktif(tombol);
  render(terpilih);
});

render(daftarProyek); // tampilan awal: semua target, tombol "Semua" sudah .aktif di HTML

// ---------- Lembar D.2: validasi form per kolom ----------

const aturanKolom = [
  {
    kolom: inputJenis,
    sah: (nilai) => nilai.length >= 3 && nilai.length <= 50,
  },
  {
    kolom: inputTanggal,
    // format tanggal ISO (YYYY-MM-DD) bisa dibandingkan sebagai teks
    sah: (nilai) => nilai !== "" && nilai >= inputTanggal.min && nilai <= inputTanggal.max,
  },
  {
    kolom: inputDurasi,
    sah: (nilai) => {
      const menit = Number(nilai);
      return nilai !== "" && Number.isInteger(menit) && menit >= 5 && menit <= 240 && menit % 5 === 0;
    },
  },
];

let sudahDikirim = false;      // setelah submit pertama, semua kolom diperiksa
const kolomDisentuh = new Set(); // kolom yang sudah pernah diubah pengguna

// periksa satu kolom; pesan galat hanya ditampilkan bila kolom itu sudah "boleh dinilai"
function periksaKolom({ kolom, sah }) {
  const layak = sah(kolom.value.trim()); // spasi di tepi tidak dihitung
  const tampilkan = sudahDikirim || kolomDisentuh.has(kolom);
  const galat = document.getElementById(kolom.getAttribute("aria-describedby"));

  if (tampilkan && !layak) {
    kolom.setAttribute("aria-invalid", "true");
    galat.hidden = false;
  } else {
    kolom.removeAttribute("aria-invalid");
    galat.hidden = true;
  }
  return layak;
}

function periksaForm() {
  const hasil = aturanKolom.map(periksaKolom); // map, bukan every: semua kolom tetap diperbarui
  const sah = hasil.every(Boolean);
  if (sudahDikirim || kolomDisentuh.size > 0) tombolSimpan.disabled = !sah;
  return sah;
}

// satu pendengar di form untuk ketiga kolom
form.addEventListener("input", (event) => {
  statusForm.textContent = "";
  // kolom yang sedang bergalat diperiksa tiap ketikan, supaya pesannya hilang begitu layak
  if (event.target.getAttribute("aria-invalid") === "true") kolomDisentuh.add(event.target);
  periksaForm();
});

form.addEventListener("change", (event) => {
  kolomDisentuh.add(event.target); // selesai mengisi satu kolom: mulai dinilai
  periksaForm();
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // halaman tidak dimuat ulang
  sudahDikirim = true;

  if (!periksaForm()) {
    form.querySelector('[aria-invalid="true"]')?.focus(); // pindah ke kolom pertama yang perlu diperbaiki
    return;
  }

  const catatan = { jenis: inputJenis.value.trim(), tanggal: inputTanggal.value, durasi: Number(inputDurasi.value) };
  const jumlah = simpanCatatan(catatan); // P10: disimpan lewat JSON.stringify di api.js
  statusForm.textContent = `Tersimpan: ${catatan.jenis}, ${formatTanggal(catatan.tanggal)}, ${catatan.durasi} menit (${jumlah} catatan di peramban ini).`;

  form.reset();
  sudahDikirim = false;
  kolomDisentuh.clear();
  periksaForm();
  tombolSimpan.disabled = false;
});

// ---------- P10 Lembar D: data dari jaringan tampil di halaman ----------

const wadahLatihan = ambil("#daftar-latihan");
const statusLatihan = ambil("#status-latihan");

// keadaan memuat/gagal/kosong ditulis di satu paragraf; data-keadaan dipakai CSS
function tampilkanStatus(keadaan, teks) {
  statusLatihan.dataset.keadaan = keadaan;
  statusLatihan.textContent = teks;
  statusLatihan.hidden = false;
}

// penggambar: hanya menyusun elemen, tidak tahu dari mana datanya
function gambarLatihan(daftar) {
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

// pemanggil api.js: try/catch kedua ada di sini
async function tampilkanLatihan() {
  wadahLatihan.textContent = "";
  tampilkanStatus("memuat", "Memuat referensi latihan…");
  try {
    const daftar = await ambilLatihan();
    gambarLatihan(daftar);
  } catch (galat) {
    tampilkanStatus("gagal", `Gagal memuat data: ${galat.message}. Periksa koneksi, lalu muat ulang halaman.`);
  }
}

window.gambar = gambarLatihan; // lembar F.1: uji keadaan kosong dengan gambar([]) dari Console
tampilkanLatihan();

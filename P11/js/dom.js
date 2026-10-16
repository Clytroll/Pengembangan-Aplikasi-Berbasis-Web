// =============================================================
// P11 — dom.js: seluruh sentuhan ke halaman (pemilih, render, kelas)
// Tidak memasang pendengar dan tidak menyimpan keadaan: semua yang
// tampil dibaca dari objek state yang diterima render(state).
// =============================================================

import { buatPerkenalan, formatKeahlian, hitungTotal, formatAngka, formatTanggal, aturanForm } from "./data.js";

// ---------- Pemilih ----------

// querySelector yang langsung melapor bila hasilnya null
function ambil(selektor) {
  const elemen = document.querySelector(selektor);
  if (elemen === null) console.error(`Pemilih ${selektor} menghasilkan null — cek profil.html`);
  return elemen;
}

const wadah = ambil("#daftar");
const kosong = ambil("#pesan-kosong");

export const kotakTema = ambil("#tema");
export const barisFilter = ambil("#filter");
export const tombolAturUlang = ambil("#atur-ulang");
export const form = ambil("#form-latihan");
const kolomForm = {
  jenis: ambil("#jenis-olahraga"),
  tanggal: ambil("#tanggal-latihan"),
  durasi: ambil("#durasi"),
};
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

// ---------- render(state): satu-satunya jalan tampilan berubah ----------

export function render(state) {
  kotakTema.checked = state.temaDibalik; // tema.css membaca :checked, jadi cukup centangnya yang digambar
  gambarFilter(state.kategoriAktif);
  gambarDaftar(state);
  gambarForm(state.form);
  gambarReferensi(state.referensi);
}

function gambarFilter(kategoriAktif) {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategoriAktif; // kelas .aktif hanya hasil gambar, tidak pernah dibaca
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
}

// pengganti penyaring di pendengar klik P9: kategori dibaca dari state, bukan dari dataset tombol
function saring(state) {
  return state.daftarProyek.filter(
    (proyek) => state.kategoriAktif === "semua" || proyek.kategori === state.kategoriAktif
  );
}

function gambarDaftar(state) {
  wadah.textContent = ""; // 1. kosongkan

  const tampil = saring(state); // dari state, bukan argumen
  if (tampil.length === 0) { // 2. keadaan kosong
    kosong.hidden = false;
    return;
  }
  kosong.hidden = true;

  const fragmen = document.createDocumentFragment(); // halaman digambar sekali
  tampil.forEach((proyek) => fragmen.append(buatKartu(proyek))); // 3. isi ulang
  wadah.append(fragmen);
}

// ---------- Form: isian, tanda galat per kolom, tombol, pesan ----------

function gambarForm({ nilai, sudahDikirim, kolomDisentuh, pesan }) {
  let semuaSah = true;

  Object.entries(kolomForm).forEach(([kunci, kolom]) => {
    // hanya ditulis bila berbeda, supaya kursor tidak melompat saat mengetik
    if (kolom.value !== nilai[kunci]) kolom.value = nilai[kunci];

    const sah = aturanForm[kunci](nilai[kunci]);
    const tampilkanGalat = (sudahDikirim || kolomDisentuh.includes(kunci)) && !sah;
    if (tampilkanGalat) kolom.setAttribute("aria-invalid", "true");
    else kolom.removeAttribute("aria-invalid");
    document.getElementById(kolom.getAttribute("aria-describedby")).hidden = !tampilkanGalat;

    semuaSah &&= sah;
  });

  // tombol nonaktif hanya setelah pengguna mulai mengisi atau menekan Simpan
  tombolSimpan.disabled = (sudahDikirim || kolomDisentuh.length > 0) && !semuaSah;
  statusForm.textContent = pesan;
}

// pindah ke kolom pertama yang perlu diperbaiki; dihitung dari state, bukan dari aria-invalid
export function fokusKolomGalat({ nilai }) {
  const kunci = Object.keys(kolomForm).find((k) => !aturanForm[k](nilai[k]));
  if (kunci) kolomForm[kunci].focus();
}

// ---------- Referensi latihan dari jaringan (P10) ----------

// keadaan memuat/gagal/kosong ditulis di satu paragraf; data-keadaan dipakai CSS
function tampilkanStatus(keadaan, teks) {
  statusLatihan.dataset.keadaan = keadaan;
  statusLatihan.textContent = teks;
  statusLatihan.hidden = false;
}

function gambarReferensi({ keadaan, daftar, pesan }) {
  wadahLatihan.textContent = ""; // kartu tidak berlipat saat digambar ulang

  if (keadaan === "memuat") {
    tampilkanStatus("memuat", "Memuat referensi latihan…");
    return;
  }
  if (keadaan === "gagal") {
    tampilkanStatus("gagal", `Gagal memuat data: ${pesan}. Periksa koneksi, lalu muat ulang halaman.`);
    return;
  }
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

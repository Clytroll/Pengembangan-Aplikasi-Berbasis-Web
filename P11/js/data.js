// =============================================================
// P11 — data.js: data mentah dan fungsi murni pemformat
// Tidak menyentuh halaman dan tidak menyimpan keadaan.
// =============================================================

// ---------- Data halaman (dari app.js P8/P9) ----------

export const profil = {
  nama: "Muhammad Arif Rahman Jalil",
  panggilan: "Arif",
  nim: "23523132",
  peran: "Mahasiswa Informatika yang sedang membangun kebiasaan olahraga",
  deskripsi: "Jadwal latihan mingguan saya beserta durasi, target kalori, dan catatan latihan.",
  keahlian: ["Lari", "Bersepeda", "Latihan beban tubuh"],
  tahun: 2026,
};

export const daftarLatihan = [
  { hari: "Senin", jenis: "Lari pagi", durasi: 30, kalori: 300 },
  { hari: "Rabu", jenis: "Push-up, sit-up, dan plank", durasi: 45, kalori: 250 },
  { hari: "Jumat", jenis: "Bersepeda", durasi: 60, kalori: 400 },
  { hari: "Minggu", jenis: "Jalan santai", durasi: 45, kalori: 200 },
];

// "proyek" di halaman ini adalah target olahraga
// kategori harus sama huruf per huruf dengan data-kategori tombol filter di profil.html
export const daftarProyek = [
  {
    judul: "Lari 5 km tanpa berhenti",
    kategori: "kardio",
    keterangan: "Target utama semester ini. Jarak dinaikkan bertahap supaya lutut tidak cedera.",
    status: "Berjalan",
    tenggat: "2026-12-31",
    tahap: ["Minggu 1–4: lari 2 km", "Minggu 5–8: lari 3,5 km", "Minggu 9–12: lari 5 km"],
    utama: true,
  },
  {
    judul: "Rutin 4 kali seminggu",
    kategori: "kebiasaan",
    keterangan: "Berolahraga minimal 4 kali seminggu, masing-masing minimal 30 menit.",
    status: "Berjalan",
  },
  {
    judul: "Bakar 1.150 kkal per minggu",
    kategori: "kebiasaan",
    keterangan: "Membakar sekitar 1.150 kkal per minggu dari latihan terjadwal.",
    status: "Berjalan",
  },
  {
    judul: "Plank 2 menit",
    kategori: "kekuatan",
    keterangan: "Naik dari 60 detik sekarang, tambah 10 detik tiap minggu.",
    status: "Mulai",
    tenggat: "2026-11-30",
  },
  {
    judul: "Bersepeda 20 km sekali jalan",
    kategori: "kardio",
    keterangan: "Rute kampus–rumah pulang-pergi setiap Jumat.",
    status: "Mulai",
    tenggat: "2027-01-31",
  },
];

// ---------- Fungsi murni: hanya bergantung pada argumen ----------

export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

export const hitungTotal = (daftar, kunci) => daftar.reduce((jumlah, isi) => jumlah + isi[kunci], 0);

export const formatAngka = (angka) => angka.toLocaleString("id-ID");

export const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

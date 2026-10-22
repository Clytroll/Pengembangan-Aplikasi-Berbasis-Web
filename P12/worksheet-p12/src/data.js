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

// nilai data-kategori tombol filter di profil.html; dipakai untuk memeriksa isi simpanan
// (P12: tombolnya digambar TombolFilter.vue dari daftar ini)
export const KATEGORI = ["semua", "kardio", "kekuatan", "kebiasaan", "fleksibilitas"];

// "proyek" di halaman ini adalah target olahraga
// P12: setiap butir diberi id unik untuk :key pada v-for di DaftarProyek.vue
// kategori harus sama huruf per huruf dengan data-kategori tombol filter di profil.html
export const daftarProyek = [
  {
    id: 1,
    judul: "Lari 5 km tanpa berhenti",
    kategori: "kardio",
    keterangan: "Target utama semester ini. Jarak dinaikkan bertahap supaya lutut tidak cedera.",
    status: "Berjalan",
    tenggat: "2026-12-31",
    tahap: ["Minggu 1–4: lari 2 km", "Minggu 5–8: lari 3,5 km", "Minggu 9–12: lari 5 km"],
    utama: true,
  },
  {
    id: 2,
    judul: "Rutin 4 kali seminggu",
    kategori: "kebiasaan",
    keterangan: "Berolahraga minimal 4 kali seminggu, masing-masing minimal 30 menit.",
    status: "Berjalan",
  },
  {
    id: 3,
    judul: "Bakar 1.150 kkal per minggu",
    kategori: "kebiasaan",
    keterangan: "Membakar sekitar 1.150 kkal per minggu dari latihan terjadwal.",
    status: "Berjalan",
  },
  {
    id: 4,
    judul: "Plank 2 menit",
    kategori: "kekuatan",
    keterangan: "Naik dari 60 detik sekarang, tambah 10 detik tiap minggu.",
    status: "Mulai",
    tenggat: "2026-11-30",
  },
  {
    id: 5,
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

// ---------- Aturan form Catat Latihan (murni: nilai masuk, benar/salah keluar) ----------

const TANGGAL_MIN = "2026-09-01"; // sama dengan atribut min/max di profil.html
const TANGGAL_MAKS = "2027-01-31";

// spasi di tepi tidak dihitung; tanggal ISO (YYYY-MM-DD) bisa dibandingkan sebagai teks
export const aturanForm = {
  jenis: (nilai) => nilai.trim().length >= 3 && nilai.trim().length <= 50,
  tanggal: (nilai) => nilai !== "" && nilai >= TANGGAL_MIN && nilai <= TANGGAL_MAKS,
  durasi: (nilai) => {
    const menit = Number(nilai);
    return nilai.trim() !== "" && Number.isInteger(menit) && menit >= 5 && menit <= 240 && menit % 5 === 0;
  },
};

export const formSah = (nilai) => Object.keys(aturanForm).every((kunci) => aturanForm[kunci](nilai[kunci]));

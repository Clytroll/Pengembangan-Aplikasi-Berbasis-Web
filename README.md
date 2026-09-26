# PABW — Muhammad Arif Rahman Jalil — 23523132

Repo ini memuat pekerjaan mata kuliah Pengembangan Aplikasi
Berbasis Web, satu folder untuk setiap pertemuan.

## Pertemuan 3 — Halaman profil saya

Topik halaman saya: jadwal dan target olahraga saya.

- Judul halaman: Jadwal Olahraga Arif
- Deskripsi: jadwal latihan mingguan saya beserta durasi, target kalori, dan catatan latihan
- Tautan navigasi: Jadwal Latihan, Catat Latihan, Target Saya
- Dua bagian utama: Jadwal Latihan, Catat Latihan
- Kolom tabel: hari, jenis olahraga, durasi, target kalori
- Kolom form: jenis olahraga, tanggal latihan, durasi
- Gambar: olahraga.jpg

## Catatan penggunaan AI

- Dibantu AI (Claude): draf kode `worksheet-p3/profil.html` dan draf jawaban lembar kerja.
- Gambar `olahraga.jpg` saya siapkan sendiri.
- Saya kerjakan sendiri: pemilihan topik, penyesuaian jadwal latihan, pemeriksaan ulang
  halaman di peramban (tautan, label, Tab), dan jawaban tiket keluar.

## Pertemuan 4 — Design token halaman profil

- Berkas gaya: tokens.css, base.css, layout.css, komponen.css, tema.css
- Warna utama: #15803D (hijau), dipilih karena sesuai tema olahraga dan
  kebugaran, serta lolos kontras 5.02:1 untuk teks putih di atas tombol.
- Tema gelap tidak memakai hex baru untuk warna utama. Nilainya diturunkan
  dari warna utama memakai color-mix(), jadi ikut berubah dari satu baris.

### Token yang saya tetapkan

| Token | Nilai | Untuk apa |
|---|---|---|
| --color-primary | #15803D | tombol, tautan, judul, garis fokus |
| --color-fg | #0F172A | warna teks utama |
| --color-bg | #F8FAFC | latar halaman |
| --color-border | #64748B | tepi kartu dan isian (≥ 3:1) |
| --radius-md | 0.5rem | sudut tombol, kartu, isian |
| --space-4 | 1rem | jarak standar antar elemen |

Kriteria selesai saya: mengubah --green-700 di satu baris harus mengubah
warna tombol, tautan, judul, dan garis fokus di kedua tema.


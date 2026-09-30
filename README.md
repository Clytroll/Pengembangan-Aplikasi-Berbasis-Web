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


## Pertemuan 5 — Layout modern: flexbox dan grid

Berkas di folder `P5/`: profil.html, tokens.css, base.css, layout.css,
komponen.css, tema.css. Isi, warna, dan token dari Pertemuan 4 tetap; yang
berubah hanya CSS pengatur posisi, plus sidebar "Minggu Ini" dan galeri target.

### A.1 Sketsa kerangka

```
┌──────────────────────────────────────────────┐
│ header  (auto)  judul · menu · tombol tema    │  baris 1
├──────────────┬───────────────────────────────┤
│ sisi         │ utama: jadwal + catat latihan  │  baris 2 (1fr)
│ (16rem)      ├───────────────────────────────┤
│ Minggu Ini   │ bawah: galeri Target Saya      │
├──────────────┴───────────────────────────────┤
│ footer  (auto)                                │  baris 3
└──────────────────────────────────────────────┘
```

| Bagian halaman | Nilai yang saya pakai |
|---|---|
| Baris halaman | `grid-template-rows: auto 1fr auto; min-height: 100dvh` |
| Kolom isi | `grid-template-columns: 16rem 1fr` |
| Area isi | `"sisi utama" "sisi bawah"` |
| Di bawah 48rem | satu kolom: `"sisi" "utama" "bawah"` |

### A.3 Kapan flex, kapan grid

| Bagian | Pilihan | Alasan |
|---|---|---|
| Kepala halaman | flex | isinya satu deret (judul, menu, tombol), cukup satu sumbu |
| Isi dua kolom | grid | butuh baris dan kolom sekaligus, sidebar merentang dua baris |
| Galeri kartu | grid | kolom harus sama lebar dan jumlahnya menyesuaikan sendiri |
| Isi satu kartu | flex | isi disusun satu arah (kolom), kaki didorong ke dasar kartu |

### D.3 Penempatan

| Blok | Cara | Potongan kode |
|---|---|---|
| Sidebar, konten utama, galeri | area bernama | `grid-template-areas: "sisi utama" "sisi bawah";` |
| Kartu "Lari 5 km" (target utama) | span | `.papan { grid-row: span 2; }` |

Kartu utama memakai `grid-row: span 2`, bukan `grid-column: span 2`: di 360 px
galeri hanya satu kolom, dan span kolom akan memaksa kolom kedua lalu meluber.

### F. Pemeriksaan

Diuji di Chrome pada 360 px dan 1 280 px dengan skrip yang membandingkan tepi
kanan setiap elemen dengan induk dan viewport.

| Periksa | Hasil |
|---|---|
| Kerangka halaman | 3 baris grid, kaki tetap di dasar |
| Jarak memakai gap | tidak ada `margin` di layout.css dan komponen.css, tidak ada `float` |
| Lebar memakai fr/rem | `16rem 1fr`, `minmax(min(16rem, 100%), 1fr)` |
| Galeri adaptif | 1 kolom di 360 px, 3 kolom di 1 280 px, tanpa media query |
| Tidak meluber | 0 elemen meluber di 360 px dan 1 280 px |
| Tema gelap | tombol pengalih tetap bekerja (selektor diganti ke `.navbar`) |

- **F.2** `grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr));`, dipakai pada galeri target.
- **F.4 Flex:** navbar, sidebar, dan isi kartu, karena isinya berderet satu arah dan cukup diatur `gap` serta `align-items`.
- **F.4 Grid:** kerangka halaman, area isi, dan galeri, karena perlu mengatur baris dan kolom sekaligus.
- **F.4 Kasus meluber:** di 360 px kolom `16rem 1fr` menyisakan ±50 px untuk konten sehingga tabel dan form meluber; diperbaiki dengan menumpuk area jadi satu kolom di bawah 48rem. Tabel juga lebih lebar 13 px dari wadahnya; padding sel dikecilkan jadi `var(--space-2)`.

### Catatan penggunaan AI (P5)

- Dibantu AI (Claude): draf kode `P5/` dan draf jawaban lembar kerja.
- Saya kerjakan sendiri: pemeriksaan ulang di peramban, penilaian mandiri (F.3), dan catatan untuk pengampu (F.5).

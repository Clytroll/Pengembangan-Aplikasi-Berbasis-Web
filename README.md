# PABW — Muhammad Arif Rahman Jalil — 23523132

Repo ini memuat pekerjaan mata kuliah Pengembangan Aplikasi
Berbasis Web, satu folder untuk setiap pertemuan.

## Pertemuan 2 — Analisis HTTP

Berkas di folder `P2/`: starter `analisis_http.html`, soal `tugas.pdf`, dan jawaban `tugas_23523132.docx`. Topik: HTTP,
URL, tautan mailto, kode status, serta GET vs POST.

## Pertemuan 3 — Halaman profil saya

Berkas di folder `P3/`: profil.html dan olahraga.jpg.

Topik halaman saya: jadwal dan target olahraga saya.

- Judul halaman: Jadwal Olahraga Arif
- Deskripsi: jadwal latihan mingguan saya beserta durasi, target kalori, dan catatan latihan
- Tautan navigasi: Jadwal Latihan, Catat Latihan, Target Saya
- Dua bagian utama: Jadwal Latihan, Catat Latihan
- Kolom tabel: hari, jenis olahraga, durasi, target kalori
- Kolom form: jenis olahraga, tanggal latihan, durasi
- Gambar: olahraga.jpg

### Deklarasi AI

Dibantu AI (Claude): draf kode `profil.html`.

## Pertemuan 4 — Design token halaman profil

- Berkas di folder `P4/`: profil.html, olahraga.jpg, dan berkas gaya tokens.css,
  base.css, layout.css, komponen.css, tema.css
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

### Deklarasi AI

Dibantu AI (Claude): draf kode `P5/`.

## Pertemuan 6 — Responsif mobile-first

Berkas di folder `P6/`: profil.html, tokens.css, base.css, layout.css,
komponen.css, tema.css (dari P5) ditambah **responsif.css**. Tangkapan layar
ada di `P6/tangkapan/` (360 px, 768 px, 1 280 px; tema terang dan gelap).

Perubahan dari P5: aturan kolom `.isi` dan `.galeri` dipindah ke responsif.css.
Di P5, `.isi` ditulis dua kolom lalu ditimpa `@media (width < 48rem)` (gaya
desktop-first/max-width). Sekarang dasarnya satu kolom, lalu ditambah dengan
`min-width`. Galeri yang dulu `auto-fit` kini 1 → 2 → 3 kolom lewat titik henti.

## Pertemuan 8 — JavaScript modern ES6+ dan array methods

Berkas di folder `P8/`: profil.html dan seluruh CSS dari P6, ditambah
**js/app.js** yang dimuat lewat `<script type="module" src="js/app.js">`
tepat sebelum `</body>`. Halaman harus dibuka lewat server lokal (Live Server
atau `python -m http.server`), bukan klik dua kali.

Perubahan dari P6: isi halaman tidak lagi ditulis di HTML. profil.html hanya
menyisakan wadah kosong ber-id; isinya dipasang dari data di app.js.

| Data | Variabel | Bentuk |
|---|---|---|
| Identitas (nama, peran, deskripsi, NIM) | `profil` | object |
| Daftar keahlian | `profil.keahlian` | array teks |
| Jadwal latihan | `daftarLatihan` | array of object |
| Target olahraga (pengganti "proyek") | `daftarTarget` | array of object |
| Jumlah target | `jumlahTarget` | angka |

- Fungsi murni: `buatPerkenalan`, `formatKeahlian`, `hitungTotal`,
  `formatAngka`, `formatTanggal`, `buatBarisLatihan`, `buatKartuTarget`.
- Array methods: `map` (baris tabel dan kartu target), `filter` (target
  berstatus "Berjalan"), `find` (target "Plank 2 menit"), `reduce` (total
  durasi dan kalori di sidebar), `[...daftarLatihan].sort()` (salinan, data
  asli tetap).
- Ringkasan sidebar (4 hari, 180 menit, 1.150 kkal) kini dihitung dari
  `daftarLatihan`, bukan diketik.

## Pertemuan 9 — DOM, event, dan interaktivitas

Berkas di folder `P9/`: salinan halaman Pertemuan 8, ditambah `js/dom.js`.
`app.js` tetap menyimpan data dan fungsi murni. Perubahannya hanya: setiap
target diberi `kategori`, `daftarProyek` (alias `daftarTarget`) dan
`formatTanggal` diberi `export`, dan baris yang mengisi galeri dengan
`innerHTML` dihapus karena kartu kini dipasang `dom.js`. Halaman tetap dibuka
lewat server lokal.

- Daftar target dipasang ke `#daftar` dengan `createElement`, `textContent`,
  dan `append` (lewat `DocumentFragment`). Wadah dikosongkan di baris pertama
  `render`.
- Filter kategori (Semua, Kardio, Kekuatan, Kebiasaan, Fleksibilitas) memakai
  satu pendengar di `#filter`. Klik dibaca lewat `event.target.closest("button")`
  dan `dataset.kategori`. Tombol aktif ditandai kelas `.aktif`.
- Kategori Fleksibilitas tidak punya data, jadi `#pesan-kosong` muncul.
- Form Catat Latihan memanggil `preventDefault`. Pesan galat per kolom
  mengikuti `aria-invalid`. Setelah form dikirim atau kolom diubah, tombol
  Simpan nonaktif sampai jenis (3–50 karakter), tanggal (1 Sep 2026–31 Jan
  2027), dan durasi (5–240 menit, kelipatan 5) semuanya layak. Spasi di tepi
  tidak dihitung.

### Deklarasi AI

Dibantu AI (Claude Code): penyusunan `js/dom.js` (render, filter, validasi
form), penyesuaian `app.js`, `profil.html`, dan `komponen.css` untuk P9, serta
bagian README ini.

## Pertemuan 10 — JavaScript asinkron: fetch, Promise, dan JSON

Berkas di folder `P10/`: salinan halaman Pertemuan 9, ditambah satu berkas
baru `js/api.js`. `app.js` tidak diubah. Halaman tetap dibuka lewat server
lokal.

- API: **wger.de** (`https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=6`),
  API publik tanpa kunci akses yang mengizinkan CORS. Datanya enam latihan
  perut, ditampilkan di bagian baru "Referensi Latihan Perut" (`#bagian-4`)
  sebagai pendukung target "Plank 2 menit". Tidak memakai `notisia.json` lokal.
- `js/api.js` (lapisan data): alamat ditulis sekali di konstanta `ALAMAT`.
  Fungsi `ambilLatihan()` memanggil `fetch`, memeriksa `respons.ok` sebelum
  `json()`, lalu memetakan `data.results` menjadi objek kecil
  `{ id, nama, kategori, alat, otot }`. Galat dicatat lalu dilempar ulang.
  `simpanCatatan()` dan `bacaCatatan()` menyimpan catatan dari form ke
  localStorage dengan `JSON.stringify` dan membacanya dengan `JSON.parse`.
- `js/dom.js` (lapisan tampilan): mengimpor `ambilLatihan` dan
  `simpanCatatan`. `tampilkanLatihan()` memasang try/catch kedua dan
  menampilkan empat keadaan di `#status-latihan`: memuat, berhasil (kartu di
  `#daftar-latihan`), gagal (pesan galat di halaman), dan kosong. Isi dari
  jaringan dipasang dengan `textContent`. `gambar([])` bisa dipanggil dari
  Console untuk menguji keadaan kosong.
- Kata `fetch` hanya ada di `js/api.js`.

### Deklarasi AI

Dibantu AI (Claude Code): penyusunan `js/api.js`, penambahan bagian
pengambilan data dan penyimpanan catatan di `js/dom.js`, penyesuaian
`profil.html` dan `komponen.css` untuk P10, serta bagian README ini.

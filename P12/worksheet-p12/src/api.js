// =============================================================
// P10 — Lapisan data halaman Jadwal Olahraga Arif
// Hanya berkas ini yang memanggil fetch. Yang menggambar ke halaman ada di dom.js.
// =============================================================

// ---------- Lembar A.2: alamat ditulis sekali, di sini saja ----------

// API publik wger.de, tanpa kunci akses, mengizinkan CORS (Access-Control-Allow-Origin: *)
// language=2 → nama latihan berbahasa Inggris, category=10 → latihan perut (Abs), limit=6 → enam butir
const ALAMAT = "https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=6";

const BAHASA_INGGRIS = 2; // nilai "language" di dalam translations

// ---------- Lembar A.3 + B.1: ambil, periksa respons.ok, baca JSON ----------

export async function ambilLatihan() {
  try {
    const respons = await fetch(ALAMAT);
    console.log("status", respons.status, "ok", respons.ok, respons.headers.get("Content-Type"));

    // fetch tidak menolak Promise pada 404/500, jadi galatnya dilempar sendiri
    if (!respons.ok) throw new Error(`status ${respons.status} dari peladen`);

    const data = await respons.json(); // teks → nilai; menolak dengan SyntaxError bila badan bukan JSON
    console.log(data); // lembar C.3: lihat bentuknya sebelum menggambar

    // bentuk balasan: { count, next, previous, results: [ ... ] }
    if (!Array.isArray(data.results)) throw new Error("bentuk balasan tidak dikenali (results bukan larik)");

    return data.results.map(sederhanakan);
  } catch (galat) {
    console.error("gagal memuat", galat.message);
    throw galat; // diteruskan ke pemanggil (dom.js) supaya pesannya tampil di halaman
  }
}

// satu butir mentah wger → objek kecil yang dipakai penggambar
function sederhanakan(butir) {
  const terjemahan = butir.translations.find((t) => t.language === BAHASA_INGGRIS) ?? butir.translations[0];

  return {
    id: butir.id,
    nama: terjemahan?.name ?? "(tanpa nama)",
    kategori: butir.category.name,
    alat: butir.equipment.map((alat) => alat.name),
    otot: butir.muscles.map((otot) => otot.name_en || otot.name),
  };
}

// ---------- Lembar C.1: arah sebaliknya, nilai → teks ----------

const KUNCI_CATATAN = "catatan-latihan";

// membaca teks yang dipegang sendiri (localStorage), jadi JSON.parse, bukan json()
export function bacaCatatan() {
  const teks = localStorage.getItem(KUNCI_CATATAN);
  if (teks === null) return [];
  try {
    return JSON.parse(teks); // teks → larik
  } catch {
    return []; // isi localStorage rusak, mulai dari kosong
  }
}

// catatan baru disimpan sebagai teks JSON, bentuk yang sama yang nanti dikirim ke peladen
export function simpanCatatan(catatan) {
  const daftar = [...bacaCatatan(), catatan];
  const badan = JSON.stringify(daftar); // larik → teks
  console.log(typeof badan, badan); // "string"
  localStorage.setItem(KUNCI_CATATAN, badan);
  return daftar.length;
}

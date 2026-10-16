// =============================================================
// P11 — app.js: perakit. Hanya import dan pemanggilan.
// =============================================================

import { profil, daftarLatihan } from "./data.js";
import { state } from "./state.js";
import { pasangPendengar } from "./events.js";
import { gambarProfil, render, tampilkanStatus, gambarLatihan } from "./dom.js";
import { ambilLatihan } from "./api.js"; // dari P10, tidak diubah

gambarProfil(profil, daftarLatihan);
render(state.daftarProyek);
pasangPendengar();

tampilkanStatus("memuat", "Memuat referensi latihan…");
ambilLatihan().then(gambarLatihan, (galat) =>
  tampilkanStatus("gagal", `Gagal memuat data: ${galat.message}. Periksa koneksi, lalu muat ulang halaman.`)
);

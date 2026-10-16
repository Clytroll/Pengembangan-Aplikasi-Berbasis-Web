// =============================================================
// P11 — app.js: perakit. Hanya import dan pemanggilan.
// =============================================================

import { profil, daftarLatihan } from "./data.js";
import { state, terimaReferensi, gagalReferensi } from "./state.js";
import { pasangPendengar } from "./events.js";
import { gambarProfil, render } from "./dom.js";
import { ambilLatihan } from "./api.js"; // dari P10, tidak diubah
import { muat } from "./simpanan.js";

gambarProfil(profil, daftarLatihan); // bagian yang tidak pernah berubah, digambar sekali
render(state);
pasangPendengar();
ambilLatihan().then(terimaReferensi, gagalReferensi);

// modul tidak global: dua nama ini dibuka supaya console.log(state) dan
// console.log(muat()) bisa dicoba dari Console (lembar C.4 dan E.3)
Object.assign(window, { state, muat });

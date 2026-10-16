// =============================================================
// P11 — app.js: perakit. Hanya import dan pemanggilan.
// =============================================================

import { profil, daftarLatihan } from "./data.js";
import { state, terimaReferensi, gagalReferensi } from "./state.js";
import { pasangPendengar } from "./events.js";
import { gambarProfil, render } from "./dom.js";
import { ambilLatihan } from "./api.js"; // dari P10, tidak diubah

gambarProfil(profil, daftarLatihan); // bagian yang tidak pernah berubah, digambar sekali
render(state);
pasangPendengar();
ambilLatihan().then(terimaReferensi, gagalReferensi);

window.state = state; // supaya console.log(state) bisa dicoba dari Console (modul tidak global)

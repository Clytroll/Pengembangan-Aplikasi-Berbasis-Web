<!-- =============================================================
     P12 — App.vue: komponen induk
     Memasang empat komponen dan bagian halaman P11 yang tidak berubah
     (ringkasan, jadwal, referensi, kaki). Isi dan kelas sama dengan profil.html P11.
     ============================================================= -->
<script setup>
import { computed, onMounted } from 'vue'
import { profil, daftarLatihan, hitungTotal, formatAngka } from './data.js'
import { state, BAWAAN, terimaReferensi, gagalReferensi } from './state.js'
import { ambilLatihan } from './api.js' // dari P10, tidak diubah

// tanpa empat baris impor ini Vue hanya memberi peringatan
// "Failed to resolve component" dan halaman tampil kosong
import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

document.title = `Jadwal Olahraga ${profil.panggilan}` // <title> berada di luar #app

const ringkasan = {
  hari: `${daftarLatihan.length} hari`,
  durasi: `${hitungTotal(daftarLatihan, 'durasi')} menit`,
  kalori: `${formatAngka(hitungTotal(daftarLatihan, 'kalori'))} kkal`,
}

// keadaan memuat/gagal/kosong ditulis di satu paragraf; data-keadaan dipakai CSS
const statusReferensi = computed(() => {
  const { keadaan, daftar, pesan } = state.referensi
  if (keadaan === 'memuat') return { keadaan, teks: 'Memuat referensi latihan…' }
  if (keadaan === 'gagal') return { keadaan, teks: `Gagal memuat data: ${pesan}. Periksa koneksi, lalu muat ulang halaman.` }
  if (daftar.length === 0) return { keadaan: 'kosong', teks: 'Belum ada referensi latihan dari peladen untuk kategori ini.' }
  return null
})

onMounted(() => {
  ambilLatihan().then(terimaReferensi, gagalReferensi)
})

function aturUlangPilihan() {
  Object.assign(state, BAWAAN)
}
</script>

<template>
  <!-- baris 1 kerangka: kepala halaman -->
  <KepalaProfil :profil="profil" />

  <!-- baris 2 kerangka: isi, dua kolom (sisi | utama, sisi | bawah) -->
  <main class="isi">
    <aside class="sisi" aria-labelledby="judul-sisi">
      <h2 id="judul-sisi">Minggu Ini</h2>

      <dl class="ringkasan">
        <div>
          <dt>Hari latihan</dt>
          <dd id="ringkasan-hari">{{ ringkasan.hari }}</dd>
        </div>
        <div>
          <dt>Total durasi</dt>
          <dd id="ringkasan-durasi">{{ ringkasan.durasi }}</dd>
        </div>
        <div>
          <dt>Target kalori</dt>
          <dd id="ringkasan-kalori">{{ ringkasan.kalori }}</dd>
        </div>
      </dl>

      <nav aria-label="Pintasan">
        <ul class="menu-samping">
          <li><a href="#bagian-1">Lihat jadwal</a></li>
          <li><a href="#bagian-2">Catat latihan baru</a></li>
          <li><a href="#bagian-3">Cek target</a></li>
        </ul>
      </nav>
    </aside>

    <div class="utama">
      <section id="bagian-1">
        <h2>Jadwal Latihan</h2>

        <div class="jadwal">
          <div class="tabel-wadah">
            <table>
              <caption>Jadwal latihan mingguan dan target kalori yang terbakar</caption>
              <thead>
                <tr>
                  <th scope="col">Hari</th>
                  <th scope="col">Jenis Olahraga</th>
                  <th scope="col">Durasi</th>
                  <th scope="col">Target Kalori</th>
                </tr>
              </thead>
              <tbody id="isi-jadwal">
                <tr v-for="latihan in daftarLatihan" :key="latihan.hari">
                  <th scope="row">{{ latihan.hari }}</th>
                  <td>{{ latihan.jenis }}</td>
                  <td>{{ latihan.durasi }} menit</td>
                  <td>{{ formatAngka(latihan.kalori) }} kkal</td>
                </tr>
              </tbody>
            </table>
          </div>

          <figure>
            <!-- gambar di src/assets/: jalur relatif ini diubah Vite menjadi impor -->
            <img src="./assets/olahraga.jpg"
                 alt="Seorang pria berkaus biru, celana pendek hitam, dan sepatu lari sedang berlari cepat dengan satu lutut terangkat tinggi, di latar belakang putih."
                 width="300" height="400" loading="lazy">
            <figcaption>Lari, olahraga utama dalam jadwal saya: target minimal 30 menit, empat kali seminggu.</figcaption>
          </figure>
        </div>
      </section>

      <section id="bagian-2">
        <h2>Catat Latihan</h2>
        <FormKontak />
      </section>

      <!-- P10: daftar diisi dari data yang diambil api.js (wger.de) -->
      <section id="bagian-4">
        <h2>Referensi Latihan Perut</h2>
        <p>Latihan perut dari basis data terbuka wger.de, pendukung target "Plank 2 menit".</p>
        <p id="status-latihan" class="status-latihan" role="status"
           :data-keadaan="statusReferensi?.keadaan" :hidden="!statusReferensi">{{ statusReferensi?.teks }}</p>
        <ul class="galeri" id="daftar-latihan">
          <li v-for="latihan in state.referensi.daftar" :key="latihan.id" class="kartu">
            <div class="kartu__isi">
              <h3 class="kartu__judul">{{ latihan.nama }}</h3>
              <p>Otot: {{ latihan.otot.join(', ') || 'tidak dicatat' }}</p>
              <p>Alat: {{ latihan.alat.join(', ') || 'tanpa alat' }}</p>
            </div>
            <div class="kartu__kaki">
              <span class="lencana">{{ latihan.kategori }}</span>
              <span>wger #{{ latihan.id }}</span>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <section id="bagian-3" class="bawah">
      <h2>Target Saya</h2>

      <TombolFilter />

      <!-- P11: menghapus pilihan tersimpan (kategori dan tema), lalu kembali ke nilai bawaan -->
      <button type="button" id="atur-ulang" class="tombol-atur-ulang" @click="aturUlangPilihan">Atur ulang pilihan</button>

      <DaftarProyek />
    </section>
  </main>

  <!-- baris 3 kerangka: kaki halaman -->
  <footer>
    <p id="kaki">{{ profil.nama }} · {{ profil.nim }} · {{ profil.tahun }}</p>
  </footer>
</template>

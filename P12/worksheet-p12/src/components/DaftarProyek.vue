<!-- Daftar kartu target beserta penyaringannya. Pengganti saring(state) dan
     gambarDaftar() di dom.js P11: daftar terhitung + v-for. -->
<script setup>
import { computed } from 'vue'
import { formatTanggal } from '../data.js'
import { state } from '../state.js'

const tampil = computed(() =>
  state.daftarProyek.filter(
    (proyek) => state.kategoriAktif === 'semua' || proyek.kategori === state.kategoriAktif
  )
)
</script>

<template>
  <!-- galeri: 1 kolom (dasar), 2 kolom mulai 48rem, 3 kolom mulai 60rem -->
  <ul class="galeri" id="daftar">
    <li v-for="proyek in tampil" :key="proyek.id"
        :class="proyek.utama ? 'kartu papan' : 'kartu'" :data-kategori="proyek.kategori">
      <div class="kartu__isi">
        <h3 class="kartu__judul">{{ proyek.judul }}</h3>
        <p>{{ proyek.keterangan }}</p>
        <ol v-if="proyek.tahap?.length" class="kartu__tahap">
          <li v-for="langkah in proyek.tahap" :key="langkah">{{ langkah }}</li>
        </ol>
      </div>
      <div class="kartu__kaki">
        <span class="lencana">{{ proyek.status }}</span>
        <time v-if="proyek.tenggat" :datetime="proyek.tenggat">{{ formatTanggal(proyek.tenggat) }}</time>
        <span v-else>Tiap minggu</span>
      </div>
    </li>
  </ul>
  <p id="pesan-kosong" class="pesan-kosong" :hidden="tampil.length > 0">Tidak ada target pada kategori itu.</p>
</template>

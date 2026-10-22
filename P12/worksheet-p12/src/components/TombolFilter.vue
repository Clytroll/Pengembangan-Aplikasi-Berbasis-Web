<!-- Deretan tombol kategori. Kelas .aktif dan aria-pressed hanya hasil gambar
     dari state.kategoriAktif, tidak pernah dibaca kembali. -->
<script setup>
import { KATEGORI } from '../data.js'
import { state, pilihKategori } from '../state.js'

// "kardio" → "Kardio"
const label = (kategori) => kategori[0].toUpperCase() + kategori.slice(1)
</script>

<template>
  <div id="filter" class="filter" role="group" aria-label="Saring target menurut kategori">
    <button v-for="kategori in KATEGORI" :key="kategori" type="button"
            :class="{ aktif: state.kategoriAktif === kategori }"
            :aria-pressed="String(state.kategoriAktif === kategori)"
            @click="pilihKategori(kategori)">
      {{ label(kategori) }}
    </button>
  </div>
</template>

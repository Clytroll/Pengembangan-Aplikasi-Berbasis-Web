<!-- Bagian identitas di atas halaman. Data identitas datang dari App.vue lewat props
     dan hanya dibaca. Kotak tema ikut di sini karena di P11 ia bagian dari <header>;
     nilainya state bersama, bukan props. -->
<script setup>
import { computed } from 'vue'
import { buatPerkenalan, formatKeahlian } from '../data.js'
import { state, pilihTema } from '../state.js'

const props = defineProps({
  profil: { type: Object, required: true },
})

const judul = computed(() => `Jadwal Olahraga ${props.profil.panggilan}`)
</script>

<template>
  <header>
    <input type="checkbox" id="tema" class="pengalih-tema"
           :checked="state.temaDibalik" @change="pilihTema($event.target.checked)">
    <div class="navbar">
      <h1 id="judul-halaman">{{ judul }}</h1>
      <nav aria-label="Navigasi utama">
        <ul>
          <li><a href="#bagian-1">Jadwal Latihan</a></li>
          <li><a href="#bagian-2">Catat Latihan</a></li>
          <li><a href="#bagian-3">Target Saya</a></li>
          <li><a href="#bagian-4">Referensi Latihan</a></li>
        </ul>
      </nav>
      <label for="tema" class="tombol-tema">Ganti tema</label>
    </div>
    <p id="deskripsi">{{ props.profil.deskripsi }}</p>
    <p id="perkenalan">{{ buatPerkenalan(props.profil) }}</p>
    <p id="keahlian">Keahlian: {{ formatKeahlian(props.profil.keahlian) }}</p>
  </header>
</template>

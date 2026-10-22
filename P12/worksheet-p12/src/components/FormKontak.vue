<!-- Formulir halaman ini: "Catat Latihan" (nama berkas mengikuti worksheet P12).
     Isian form adalah ref lokal komponen ini, bukan state bersama.
     Aturan validasinya sama dengan P11 (aturanForm di data.js). -->
<script setup>
import { ref, computed } from 'vue'
import { aturanForm, formSah, formatTanggal } from '../data.js'
import { simpanCatatan } from '../api.js' // dari P10, tidak diubah

const formKosong = () => ({ jenis: '', tanggal: '', durasi: '' })

const nilai = ref(formKosong())   // isi ketiga kolom, lewat v-model
const sudahDikirim = ref(false)   // setelah submit pertama, semua kolom dinilai
const kolomDisentuh = ref([])     // kolom yang sudah selesai diisi (peristiwa change)
const pesan = ref('')             // teks di bawah tombol Simpan

// elemen kolom, hanya untuk memindahkan fokus ke kolom yang salah
const elJenis = ref(null)
const elTanggal = ref(null)
const elDurasi = ref(null)
const elemenKolom = { jenis: elJenis, tanggal: elTanggal, durasi: elDurasi }

// v-model pada type="number" memberi angka, aturan P11 membaca teks
const teks = () => Object.fromEntries(Object.entries(nilai.value).map(([k, v]) => [k, String(v)]))

const sah = computed(() => {
  const isi = teks()
  return Object.fromEntries(Object.keys(aturanForm).map((k) => [k, aturanForm[k](isi[k])]))
})

const tampilkanGalat = (kunci) =>
  (sudahDikirim.value || kolomDisentuh.value.includes(kunci)) && !sah.value[kunci]

// tombol nonaktif hanya setelah pengguna mulai mengisi atau menekan Simpan
const tombolNonaktif = computed(
  () => (sudahDikirim.value || kolomDisentuh.value.length > 0) && !Object.values(sah.value).every(Boolean)
)

function sentuhKolom(kunci) {
  if (kunci && !kolomDisentuh.value.includes(kunci)) kolomDisentuh.value.push(kunci)
}

function kirimForm() {
  sudahDikirim.value = true

  if (!formSah(teks())) {
    const kunci = Object.keys(aturanForm).find((k) => !sah.value[k])
    elemenKolom[kunci].value.focus()
    return
  }

  const catatan = { jenis: nilai.value.jenis.trim(), tanggal: nilai.value.tanggal, durasi: Number(nilai.value.durasi) }
  const jumlah = simpanCatatan(catatan) // catatan disimpan api.js (P10)
  pesan.value = `Tersimpan: ${catatan.jenis}, ${formatTanggal(catatan.tanggal)}, ${catatan.durasi} menit (${jumlah} catatan di peramban ini).`
  nilai.value = formKosong()
  sudahDikirim.value = false
  kolomDisentuh.value = []
}
</script>

<template>
  <form action="/simpan" method="post" class="form" id="form-latihan" novalidate
        @input="pesan = ''" @change="sentuhKolom($event.target.dataset.kolom)" @submit.prevent="kirimForm">
    <div class="form-kolom">
      <label for="jenis-olahraga">Jenis olahraga</label>
      <input ref="elJenis" v-model="nilai.jenis" type="text" id="jenis-olahraga" data-kolom="jenis" name="jenis-olahraga"
             required minlength="3" maxlength="50" aria-describedby="galat-jenis"
             :aria-invalid="tampilkanGalat('jenis') ? 'true' : null">
      <p class="pesan-galat" id="galat-jenis" :hidden="!tampilkanGalat('jenis')">⚠ Isi 3–50 karakter, misalnya "Lari pagi".</p>
    </div>
    <div class="form-kolom">
      <label for="tanggal-latihan">Tanggal latihan</label>
      <input ref="elTanggal" v-model="nilai.tanggal" type="date" id="tanggal-latihan" data-kolom="tanggal" name="tanggal-latihan"
             required min="2026-09-01" max="2027-01-31" aria-describedby="galat-tanggal"
             :aria-invalid="tampilkanGalat('tanggal') ? 'true' : null">
      <p class="pesan-galat" id="galat-tanggal" :hidden="!tampilkanGalat('tanggal')">⚠ Pilih tanggal antara 1 September 2026 dan 31 Januari 2027.</p>
    </div>
    <div class="form-kolom">
      <label for="durasi">Durasi (menit)</label>
      <input ref="elDurasi" v-model="nilai.durasi" type="number" id="durasi" data-kolom="durasi" name="durasi"
             required min="5" max="240" step="5" aria-describedby="galat-durasi"
             :aria-invalid="tampilkanGalat('durasi') ? 'true' : null">
      <p class="pesan-galat" id="galat-durasi" :hidden="!tampilkanGalat('durasi')">⚠ Isi 5–240 menit, kelipatan 5.</p>
    </div>
    <button type="submit" id="tombol-simpan" :disabled="tombolNonaktif">Simpan</button>
    <p id="status-form" class="status-form" role="status">{{ pesan }}</p>
  </form>
</template>

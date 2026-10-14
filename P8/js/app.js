// =============================================================
// P8 — Data halaman Jadwal Olahraga Arif
// Isi halaman ditulis sekali di sini sebagai data, lalu dipasang ke HTML.
// =============================================================

// ---------- Lembar B/D: data halaman ----------

const profil = {
  nama: "Muhammad Arif Rahman Jalil",
  panggilan: "Arif",
  nim: "23523132",
  peran: "Mahasiswa Informatika yang sedang membangun kebiasaan olahraga",
  deskripsi: "Jadwal latihan mingguan saya beserta durasi, target kalori, dan catatan latihan.",
  keahlian: ["Lari", "Bersepeda", "Latihan beban tubuh"],
  tahun: 2026,
};

const daftarLatihan = [
  { hari: "Senin", jenis: "Lari pagi", durasi: 30, kalori: 300 },
  { hari: "Rabu", jenis: "Push-up, sit-up, dan plank", durasi: 45, kalori: 250 },
  { hari: "Jumat", jenis: "Bersepeda", durasi: 60, kalori: 400 },
  { hari: "Minggu", jenis: "Jalan santai", durasi: 45, kalori: 200 },
];

// "proyek" di halaman ini adalah target olahraga
const daftarTarget = [
  {
    judul: "Lari 5 km tanpa berhenti",
    keterangan: "Target utama semester ini. Jarak dinaikkan bertahap supaya lutut tidak cedera.",
    status: "Berjalan",
    tenggat: "2026-12-31",
    tahap: ["Minggu 1–4: lari 2 km", "Minggu 5–8: lari 3,5 km", "Minggu 9–12: lari 5 km"],
    utama: true,
  },
  {
    judul: "Rutin 4 kali seminggu",
    keterangan: "Berolahraga minimal 4 kali seminggu, masing-masing minimal 30 menit.",
    status: "Berjalan",
  },
  {
    judul: "Bakar 1.150 kkal per minggu",
    keterangan: "Membakar sekitar 1.150 kkal per minggu dari latihan terjadwal.",
    status: "Berjalan",
  },
  {
    judul: "Plank 2 menit",
    keterangan: "Naik dari 60 detik sekarang, tambah 10 detik tiap minggu.",
    status: "Mulai",
    tenggat: "2026-11-30",
  },
  {
    judul: "Bersepeda 20 km sekali jalan",
    keterangan: "Rute kampus–rumah pulang-pergi setiap Jumat.",
    status: "Mulai",
    tenggat: "2027-01-31",
  },
];

const jumlahTarget = daftarTarget.length; // angka, bukan "5"

// ---------- Lembar C: fungsi murni (hanya bergantung pada argumen) ----------

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

const hitungTotal = (daftar, kunci) => daftar.reduce((jumlah, isi) => jumlah + isi[kunci], 0);

const formatAngka = (angka) => angka.toLocaleString("id-ID");

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const buatBarisLatihan = ({ hari, jenis, durasi, kalori }) => `
  <tr>
    <th scope="row">${hari}</th>
    <td>${jenis}</td>
    <td>${durasi} menit</td>
    <td>${formatAngka(kalori)} kkal</td>
  </tr>`;

const buatKartuTarget = ({ judul, keterangan, status, tenggat, tahap, utama }) => {
  const daftarTahap = tahap?.map((langkah) => `<li>${langkah}</li>`).join("") ?? "";
  const waktu = tenggat ? `<time datetime="${tenggat}">${formatTanggal(tenggat)}</time>` : "<span>Tiap minggu</span>";

  return `
  <li class="kartu${utama ? " papan" : ""}">
    <div class="kartu__isi">
      <h3 class="kartu__judul">${judul}</h3>
      <p>${keterangan}</p>
      ${daftarTahap && `<ol class="kartu__tahap">${daftarTahap}</ol>`}
    </div>
    <div class="kartu__kaki">
      <span class="lencana">${status}</span>
      ${waktu}
    </div>
  </li>`;
};

// ---------- Memasang data ke halaman (bukan fungsi murni: mengubah DOM) ----------

function isiElemen(selektor, html) {
  const elemen = document.querySelector(selektor);
  if (elemen === null) {
    console.error(`Elemen ${selektor} tidak ditemukan di profil.html`);
    return;
  }
  elemen.innerHTML = html;
}

const judulHalaman = `Jadwal Olahraga ${profil.panggilan}`;
document.title = judulHalaman;
isiElemen("#judul-halaman", judulHalaman);
isiElemen("#deskripsi", profil.deskripsi);
isiElemen("#perkenalan", buatPerkenalan(profil));
isiElemen("#keahlian", `Keahlian: ${formatKeahlian(profil.keahlian)}`);

isiElemen("#ringkasan-hari", `${daftarLatihan.length} hari`);
isiElemen("#ringkasan-durasi", `${hitungTotal(daftarLatihan, "durasi")} menit`);
isiElemen("#ringkasan-kalori", `${formatAngka(hitungTotal(daftarLatihan, "kalori"))} kkal`);

isiElemen("#isi-jadwal", daftarLatihan.map(buatBarisLatihan).join(""));
isiElemen("#galeri-target", daftarTarget.map(buatKartuTarget).join(""));

isiElemen("#kaki", `${profil.nama} · ${profil.nim} · ${profil.tahun}`);

// ---------- Pemeriksaan di Console (lembar B, C, D) ----------

console.log(typeof profil.nama, typeof jumlahTarget); // "string" "number"
console.log(`Nama saya ${profil.nama}, dan saya punya ${jumlahTarget} target olahraga.`);
console.log(profil.kontak?.email ?? "email belum diisi"); // ?. dan ?? : tidak galat walau kontak belum ada

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

console.table(profil.keahlian);
console.table(daftarLatihan);
console.table(daftarTarget);

const targetBerjalan = daftarTarget.filter((target) => target.status === "Berjalan");
console.table(targetBerjalan);

const targetPlank = daftarTarget.find((target) => target.judul === "Plank 2 menit");
console.log(targetPlank);

const judulTarget = daftarTarget.map((target) => target.judul);
console.log(judulTarget.length === daftarTarget.length, judulTarget);

const urutKalori = [...daftarLatihan].sort((a, b) => b.kalori - a.kalori); // salinan, data asli tetap
console.table(urutKalori);
console.log("Hari pertama data asli tetap:", daftarLatihan[0].hari);

const salinanProfil = { ...profil, panggilan: "Rif" }; // salinan, profil asli tetap
console.log(profil.panggilan, salinanProfil.panggilan); // "Arif" "Rif"

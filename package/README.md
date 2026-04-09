
![1000476284](https://github.com/user-attachments/assets/5c8eaf63-ec30-447a-b7f6-fdc0dbec4532)


<div align="center">

# JKT48Connect API

**🚀 Gateway Lengkap Anda Menuju Dunia JKT48 — Langsung dari Terminal atau Proyek Node.js Anda!**

</div>

<p align="center">
<img src="https://img.shields.io/npm/v/@jkt48connect-corp/sdk?color=CB3837&label=NPM&logo=npm" alt="NPM Version"/>
<img src="https://img.shields.io/npm/dt/@jkt48connect-corp/sdk?color=brightgreen" alt="NPM Downloads"/>
</p>

<p align="center">
<a href="#fitur-unggulan">Fitur</a> •
<a href="#instalasi">Instalasi</a> •
<a href="#panduan-penggunaan">Penggunaan</a> •
<a href="#api-key">API Key</a> •
<a href="#dokumentasi-lengkap">Dokumentasi</a>
</p>

---

**JKT48Connect API** adalah sebuah *Command Line Interface (CLI)* dan modul Node.js yang dirancang untuk memudahkan interaksi dengan [JKT48Connect API](https://www.jkt48connect.my.id). Dapatkan akses instan ke berbagai data JKT48 seperti jadwal teater, detail member, live streaming terbaru, berita, dan banyak lagi.

> [!IMPORTANT]
>
> ## 📢 **Versi Terbaru Telah Tersedia: `@jkt48/core`**
>
> Proyek ini telah berkembang! Untuk mendapatkan fitur terbaru, performa yang lebih baik, dan dukungan jangka panjang, kami sangat merekomendasikan Anda untuk beralih ke versi baru: **`@jkt48/core`**.
>
> Versi `@jkt48connect-corp/sdk` ini tidak akan lagi menerima pembaruan fitur.
>
> **Lihat paket baru di NPM: [@jkt48/core](https://www.npmjs.com/package/@jkt48/core)**

---

## ✨ Fitur Unggulan

Alat ini dibekali dengan berbagai fitur untuk memenuhi kebutuhan Anda, baik sebagai penggemar maupun developer.

### JKT48 Data Center

- **👤 Semua Member**: Dapatkan daftar lengkap member JKT48 aktif dan trainee.
- **🎭 Jadwal Teater**: Lihat jadwal pertunjukan teater yang akan datang beserta detailnya.
- **🗓️ Event & News**: Tetap update dengan event terbaru dan berita resmi dari JKT48.
- **🔴 Live Streaming**: Akses data real-time untuk live Showroom, IDN Live, dan live terbaru lainnya.
- **📺 Konten Multimedia**: Ambil data video terbaru dari channel YouTube JKT48 dan JKT48 TV, serta replay teater.
- **🎂 Ulang Tahun Member**: Cari tahu jadwal ulang tahun para member.

### Utilitas Tambahan

- **🔑 Validasi API Key**: Cek validitas dan sisa kuota API key Anda.
- **💳 Manajemen Pembayaran**: Buat dan periksa status pembayaran melalui integrasi API Orkut.
- **🖼️ Media Downloader**: Unduh video dari TikTok dan cari gambar dari Pinterest.
- **Sticker Brat**: Buat stiker kustom dengan mudah.

---

## 🚀 Instalasi

Anda dapat menginstal alat ini secara global untuk penggunaan CLI atau sebagai dependensi dalam proyek Node.js Anda.

### 1. Untuk Penggunaan Global (CLI)

Instal secara global untuk menjalankan perintah `jkt48connect` langsung dari terminal Anda.

```bash
npm install -g @jkt48connect-corp/sdk
```

### 2. Sebagai Modul Proyek (Node.js)

Tambahkan ke proyek Anda untuk mengintegrasikan fungsionalitasnya ke dalam aplikasi Anda.

```bash
npm install @jkt48connect-corp/sdk
```

---

## 🔑 API Key

Untuk mulai menggunakan, Anda bisa memakai salah satu dari API key gratis di bawah ini. Setiap key memiliki **limit 50 request**.

- `J48-9F2A7B1D`
- `JKT-4F5C3D8A`
- `J48-2E9D4B7C`

**Butuh lebih banyak?** Anda dapat membeli API key kustom dengan limit dan durasi yang lebih tinggi.

1. **Hubungi Manual**: Kirim pesan ke WhatsApp **+62 857-0147-9245**.
2. **Gunakan Bot WhatsApp**: Kirim perintah ke nomor yang sama dengan format:
   ```plaintext
   .buyapi <NamaKustom> <JumlahRequest> <Durasi>
   ```
   Contoh: `.buyapi MyProject 500 1bulan`

---

## 📖 Panduan Penggunaan

Berikut cara menggunakan `@jkt48connect-corp/sdk` baik melalui CLI maupun sebagai modul.

### Via CLI

Gunakan format perintah berikut di terminal:
`jkt48connect <perintah> <api_key> [parameter_tambahan]`

**Contoh Perintah Populer:**

| Perintah | Deskripsi | Contoh Penggunaan |
| :--- | :--- | :--- |
| `check` | Validasi API key Anda. | `jkt48connect check <api_key>` |
| `allMembers` | Ambil data semua member. | `jkt48connect allMembers <api_key>` |
| `recentLive` | Dapatkan data live terbaru. | `jkt48connect recentLive <api_key>` |
| `theater` | Lihat jadwal teater. | `jkt48connect theater <api_key>` |
| `eventDetail` | Lihat detail sebuah event. | `jkt48connect eventDetail <api_key> <event_id>` |

### Sebagai Modul Node.js

Impor fungsi yang Anda butuhkan dan gunakan dalam kode JavaScript Anda.

**Contoh Penggunaan (`async/await`):**

```javascript
const {
  checkApiKey,
  getTheater,
  getEvents,
  getEventDetail,
  getTheaterDetail,
  getMemberDetail,
  getAllMembers,
  getLive,
  createPayment,
  checkPaymentStatus,
} = require("@jkt48connect-corp/sdk");

const API_KEY = 'J48-9F2A7B1D'; // Gunakan API Key Anda

async function fetchMemberData() {
  try {

    // 1. Ambil data semua member
    const members = await getAllMembers(API_KEY);
    console.log('Sukses mengambil data member:', members.slice(0, 3)); // Tampilkan 3 member pertama

    // 2. Ambil jadwal teater
    const schedule = await getTheater(API_KEY);
    console.log('Jadwal Teater:', schedule);

  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
  }
}

fetchMemberData();
```

---

## 📚 Dokumentasi Lengkap

Untuk panduan yang lebih mendalam, daftar lengkap semua fungsi, contoh kode, dan penjelasan parameter, silakan kunjungi dokumentasi resmi kami.

### **[docs.jkt48connect.my.id](https://docs.jkt48connect.my.id)**

## Kontributor & Komunitas

Proyek ini dibuat dan dikelola oleh **Valzyy**.

- **GitHub**: [@JKT48Connect](https://github.com/jkt48connect)
- **Situs Web**: [jkt48connect.my.id](https://www.jkt48connect.my.id)

Punya pertanyaan atau ingin bergabung dengan komunitas?

<a href='#' target="_blank"><img alt='discord' src='https://img.shields.io/badge/Discord_Channel-100000?style=social&logo=discord&logoColor=82BAFD&labelColor=F4ECEC&color=2F2D2D'/></a>

## Lizensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file `LICENSE` untuk detail lengkap.

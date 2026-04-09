const fetchData = require("../utils/fetchData");

// Fungsi untuk mengambil daftar berita
async function getNews(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/news?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons untuk diproses lebih lanjut
}

// Fungsi untuk mengambil detail berita berdasarkan ID berita
async function getNewsDetail(apiKey, idNews) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/news/${idNews}?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons untuk diproses lebih lanjut
}

module.exports = { getNews, getNewsDetail };

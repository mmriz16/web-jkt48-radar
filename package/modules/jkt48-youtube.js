const fetchData = require("../utils/fetchData");

async function getYoutube(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/youtube?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

async function getReplay(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/replay?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

module.exports = { getYoutube, getReplay };

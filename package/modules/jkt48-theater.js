const fetchData = require("../utils/fetchData");

async function getTheater(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/theater?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

async function getTheaterDetail(apiKey, theaterId) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/theater/${theaterId}?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

module.exports = { getTheater, getTheaterDetail };

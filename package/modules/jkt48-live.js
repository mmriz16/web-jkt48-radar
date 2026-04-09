const fetchData = require("../utils/fetchData");

async function getLive(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/live?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

async function getDetailRecentLive(data_id, apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/recent/${data_id}?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

async function getRecentLive(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/recent?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

async function getIdn(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/live/idn?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

async function getShowroom(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/live/showroom?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

module.exports = { getLive, getRecentLive, getShowroom, getIdn, getDetailRecentLive };

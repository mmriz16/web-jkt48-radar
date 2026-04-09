const fetchData = require("../utils/fetchData");

async function getEvents(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/events?apikey=${apiKey}`;
  const response = await fetchData(url); // Mendapatkan data dari API
  return response; // Mengembalikan respons data langsung
}

module.exports = getEvents;

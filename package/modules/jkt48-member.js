const fetchData = require("../utils/fetchData");

async function getMemberDetail(apiKey, memberId) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/member/${memberId}?apikey=${apiKey}`;
  const response = await fetchData(url);
  return response;
}

async function getAllMembers(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/members?apikey=${apiKey}`;
  const response = await fetchData(url);
  return response;
}

async function getBirthdayMembers(apiKey) {
  const url = `https://v2.jkt48connect.my.id/api/jkt48/birthday?apikey=${apiKey}`;
  const response = await fetchData(url);
  return response;
}

module.exports = { getMemberDetail, getAllMembers, getBirthdayMembers };
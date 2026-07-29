const axios = require("axios");
const cheerio = require("cheerio");

async function verifyCirugiaPlastica(full_name) {
  try {
    const response = await axios.get("https://cirugiaplastica.mx/directorio");
    const $ = cheerio.load(response.data);

    let match = null;
    $("table tbody tr").each((i, el) => {
      const rowName = $(el).find("td").eq(0).text().trim();
      if (rowName.toLowerCase().includes(full_name.toLowerCase())) {
        match = {
          verified: true,
          full_name: rowName,
          institution: "cirugiaplastica.mx",
        };
      }
    });

    return match || { verified: false };
  } catch (err) {
    console.error("CirugiaPlastica error:", err.message);
    return { verified: false };
  }
}

module.exports = verifyCirugiaPlastica;
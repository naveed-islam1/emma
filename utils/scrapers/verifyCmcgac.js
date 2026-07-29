const axios = require("axios");
const cheerio = require("cheerio");

async function verifyCmcgac(full_name) {
  try {
    const response = await axios.get("https://www.cmcgac.org.mx/cgi-bin/DirectorioMedicos");
    const $ = cheerio.load(response.data);
    let match = null;

    $("table tbody tr").each((i, el) => {
      const rowName = $(el).find("td").eq(0).text().trim();
      if (rowName.toLowerCase().includes(full_name.toLowerCase())) {
        match = {
          verified: true,
          full_name: rowName,
          institution: "cmcgac.org.mx",
        };
      }
    });

    return match || { verified: false };
  } catch (err) {
    console.error("CMCgac error:", err.message);
    return { verified: false };
  }
}

module.exports = verifyCmcgac;
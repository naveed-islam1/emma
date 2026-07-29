const axios = require("axios");
const cheerio = require("cheerio");

async function verifyCmcper(full_name) {
  try {
    const [firstName, ...lastNames] = full_name.split(" ");
    const paternal = lastNames[0] || "";
    const maternal = lastNames[1] || "";

    const response = await axios.post(
      "https://directorio.cmcper.mx/busqueda",
      new URLSearchParams({
        nombre: firstName,
        paterno: paternal,
        materno: maternal,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const $ = cheerio.load(response.data);
    const result = $(".table tbody tr").first();

    const name = result.find("td").eq(0).text().trim();
    const institution = result.find("td").eq(1).text().trim();

    const matched = name.toLowerCase().includes(full_name.toLowerCase());

    return matched
      ? {
          verified: true,
          full_name: name,
          institution: "cmcper.mx",
        }
      : { verified: false };
  } catch (err) {
    console.error("CMCPer error:", err.message);
    return { verified: false };
  }
}

module.exports = verifyCmcper;
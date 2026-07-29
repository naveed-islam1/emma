// utils/verifyCedula.js
const axios = require("axios");

/**
 * Verify a Mexican professional license (cédula) using BuhoLegal API.
 *
 * @param {string} cedula - The professional license number
 * @returns {Promise<{ verified: boolean, name?: string, institution?: string, year?: string, error?: string }>}
 */
async function verifyCedula(cedula) {
  try {
    const response = await axios.get(`https://www.buholegal.com/api/cedulas/${cedula}`, {
      headers: {
        Authorization: `Token ${process.env.BUHOLEGAL_API_TOKEN}`,
      },
    });

    const data = response.data;
    console.log("✅ Buholegal response:", data); // Optional debug log

    if (!data || data.error) {
      return {
        verified: false,
        error: data.error || "Not found",
      };
    }

    return {
      verified: true,
      name: data.nombre,
      institution: data.institucion,
      year: data.anio,
    };
  } catch (err) {
    console.error("❌ Cédula verification failed:", err.message);
    return { verified: false, error: err.message };
  }
}

module.exports = verifyCedula;
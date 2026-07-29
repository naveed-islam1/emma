// utils/verifyCertification.js
const verifyCmcper = require("./scrapers/verifyCmcper");
const verifyCmcgac = require("./scrapers/verifyCmcgac");
const verifyCirugiaPlastica = require("./scrapers/verifyCirugiaPlastica");

/**
 * Attempts to verify certification of a doctor across multiple certification directories.
 *
 * @param {string} full_name - Full name of the doctor
 * @returns {Promise<{ verified: boolean, certification_body: string | null, full_name: string }>}
 */
async function verifyCertification(full_name) {
  if (!full_name || typeof full_name !== "string") {
    return {
      verified: false,
      certification_body: null,
      full_name: "",
    };
  }

  let cert1 = {}, cert2 = {}, cert3 = {};

  try {
    cert1 = await verifyCmcper(full_name);
  } catch (err) {
    console.warn("❌ Error verifying CMCPer:", err.message);
  }

  try {
    cert2 = await verifyCirugiaPlastica(full_name);
  } catch (err) {
    console.warn("❌ Error verifying CirugiaPlastica:", err.message);
  }

  try {
    cert3 = await verifyCmcgac(full_name);
  } catch (err) {
    console.warn("❌ Error verifying CMCGAC:", err.message);
  }

  const verified = [cert1, cert2, cert3].some((c) => c.verified);
  const match = [cert1, cert2, cert3].find((c) => c.verified) || {};

  return {
    verified,
    certification_body: match.institution || null,
    full_name: match.full_name || full_name,
  };
}

module.exports = verifyCertification;
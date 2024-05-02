const XLSX_CALC = require("xlsx-calc");

self.onmessage = async (e) => {
  const reference = e.data;
  XLSX_CALC(reference, { continue_after_error: true });
  self.postMessage(reference);
};

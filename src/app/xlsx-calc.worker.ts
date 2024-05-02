const XLSX_CALC = require("xlsx-calc");

self.onmessage = async (e) => {
  const _workbook = e.data;
  XLSX_CALC(_workbook, { continue_after_error: true });
  self.postMessage(_workbook);
};

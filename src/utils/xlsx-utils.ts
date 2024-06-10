import { CellObject, WorkSheet, read, utils } from "xlsx";

/**
 * Curried (preconfigured) read function to use everywhere files are parsed
 * @param data
 * @returns
 */
export const readCustom = (data: ArrayBuffer) => read(data, { cellNF: true });

/**
 * Get an array of cells from a worksheet and an xlsx range
 * @param sheet
 * @param range
 * @returns an array of rows
 */
export const getCellRangeValues = (
  sheet: WorkSheet,
  range: string
): CellObject[][] => {
  if (sheet) {
    // Get the decoded range for the named range..
    var rangeDecoded = utils.decode_range(range);

    // Get the range of the worksheet..
    var worksheetRange = utils.decode_range(sheet["!ref"] ?? "");

    // If our named range overlaps the worksheet range set this for the columns.
    if (!rangeDecoded.s.c || rangeDecoded.s.c <= 0)
      rangeDecoded.s.c = worksheetRange.s.c;
    if (!rangeDecoded.e.c || rangeDecoded.e.c <= 0)
      rangeDecoded.e.c = worksheetRange.e.c;

    // Loop over the referenced range..
    var result: CellObject[][] = [];
    for (var R = rangeDecoded.s.r; R <= rangeDecoded.e.r; ++R) {
      const temp = [];
      for (var C = rangeDecoded.s.c; C <= rangeDecoded.e.c; ++C) {
        var cell_address = { c: C, r: R };
        temp.push(sheet[utils.encode_cell(cell_address)]);
      }

      result.push(temp);
    }
    //console.log(result);
    return result;
  }

  return [[]];
};

export const customFormat = (cell: CellObject): number => {
  if (!cell.v || typeof cell.v !== "number") return NaN;
  return Math.floor(cell.v * 100) / 100;
};

export const timeFormat = (min: number): string => {
  let res = "";

  const hours = Math.floor(min / 60);
  if (hours) res = `${hours}h`;

  const rem = Math.round(min % 60);
  if (rem) res += `${rem}m`;

  return res;
};

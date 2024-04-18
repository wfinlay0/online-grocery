import { CellObject, WorkSheet, read, utils } from "xlsx";

/**
 * Curried (preconfigured) read function to use everywhere files are parsed
 * @param data
 * @returns
 */
export const readCustom = (data: ArrayBuffer) => read(data, { dense: true });

/**
 * Get an array of cells from a worksheet and an xlsx range
 * @param sheet must be passed in dense mode
 * @param range
 * @returns an array of rows
 */
export const getDenseCellRange = (
  sheet: WorkSheet,
  range: string
): CellObject[][] => {
  const cr = utils.decode_range(range);
  return sheet?.["!data"]!.slice(cr.s.r, cr.e.r + 1).map((row) =>
    row.slice(cr.s.c, cr.e.c + 1)
  );
};

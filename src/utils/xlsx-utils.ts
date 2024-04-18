import { read } from "xlsx";

/**
 * Curried (preconfigured) read function to use everywhere files are parsed
 * @param data
 * @returns
 */
export const readCustom = (data: ArrayBuffer) => read(data, { dense: true });

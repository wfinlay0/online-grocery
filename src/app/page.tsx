"use client";

import InputGroup from "@/components/InputGroup/InputGroup";
import * as React from "react";
import { WorkBook, utils } from "xlsx";
import OutputTable from "@/components/OutputTable/OutputTable";
import nextConfig from "../../next.config.mjs";
import Welcome from "@/components/Welcome/Welcome";
import { readCustom } from "@/utils/xlsx-utils";
import { InputRow } from "@/types/xlsx-types";

const XLSX_CALC = require("xlsx-calc");

// install a webpack loader for this?
const MODEL_LINK = nextConfig.basePath + "/model.xlsm";

export default function Home() {
  // [ ] add a loading state
  const [workbook, setWorkbook] = React.useState<WorkBook>();

  React.useEffect(() => {
    fetch(MODEL_LINK)
      .then((res) => res.arrayBuffer())
      .then(readCustom)
      .then(setWorkbook)
      .catch(console.error);
  }, []);

  // [ ] test out the `bookDeps` flag in `xlsx.read` for performance
  const recalculate = (wb: WorkBook) => {
    setWorkbook(XLSX_CALC(wb));
  };

  const onInputSubmit = (data: InputRow[]) => {
    const tmp = structuredClone(workbook);
    // FIXME: origin should be in the callback, parse it out from the cellRange prop
    utils.sheet_add_aoa(tmp!.Sheets["Main Page"], data, { origin: "B9" });
    console.log(tmp);
    const recalc = XLSX_CALC(tmp, { continue_after_error: true });
    console.log(recalc);

    setWorkbook(recalc);
  };

  return (
    <>
      <Welcome />
      <div style={{ height: "50vh", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%" }}>
          <InputGroup
            workbook={workbook!}
            sheet="Main Page"
            cellRange="B9:C16"
            onSubmit={onInputSubmit}
          />
        </div>
        <div style={{ width: "50%" }}>
          <OutputTable
            workbook={workbook!}
            sheet="Main Page"
            cellRange="B20:C30"
            labels
          />
        </div>
      </div>
    </>
  );
}

"use client";

import InputGroup from "@/components/InputGroup/InputGroup";
import * as React from "react";
import { WorkBook } from "xlsx";
import OutputTable from "@/components/OutputTable/OutputTable";
import nextConfig from "../../next.config.mjs";
import Welcome from "@/components/Welcome/Welcome";
import { readCustom } from "@/utils/xlex-utils";

const XLSX_CALC = require("xlsx-calc");

// install a webpack loader for this?
const MODEL_LINK = nextConfig.basePath + "/model.xlsm";

export default function Home() {
  const [workbook, setWorkbook] = React.useState<WorkBook>();

  React.useEffect(() => {
    fetch(MODEL_LINK)
      .then((res) => res.arrayBuffer())
      .then(readCustom)
      .then(setWorkbook)
      .catch(console.error);
  }, []);

  const recalculate = (wb: WorkBook) => {
    setWorkbook(XLSX_CALC(wb));
  };

  return (
    <>
      <Welcome />
      <div style={{ height: "50vh", display: "flex", flexDirection: "row" }}>
        <div style={{ width: "50%" }}>
          <InputGroup
            workbook={workbook!}
            sheet="Main Page"
            cellRange="B9:C14"
            onSubmit={recalculate}
          />
        </div>
        <div style={{ width: "50%" }}>
          <OutputTable workbook={workbook!} cellRange="B20:C30" />
        </div>
      </div>
    </>
  );
}

"use client";

import InputGroup from "@/components/InputGroup/InputGroup";
import * as React from "react";
import { WorkBook, utils, read } from "xlsx";
import OutputTable from "@/components/OutputTable/OutputTable";
import nextConfig from "../../next.config.mjs";
import Welcome from "@/components/Welcome/Welcome";
import { InputRow } from "@/types/xlsx-types";

// install a webpack loader for this?
const MODEL_LINK = nextConfig.basePath + "/model.xlsm";

export default function Home() {
  const [workbook, setWorkbook] = React.useState<WorkBook>();
  // [ ] https://codepen.io/gareys/pen/meRgLG
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    fetch(MODEL_LINK)
      .then((res) => res.arrayBuffer())
      .then(read)
      .then(setWorkbook)
      .catch(console.error);
  }, []);

  const onInputSubmit = (data: InputRow[], origin: string) => {
    setLoading(true);

    // xlsx-calc is doing a lot of work and will block the UI, so we must run it in a web worker
    if (typeof Worker !== "undefined") {
      const recalcWorker = new Worker(
        new URL("./xlsx-calc.worker.ts", import.meta.url)
      );

      recalcWorker.onmessage = (e) => {
        setWorkbook(e.data);
        setLoading(false);
      };

      const tmp = structuredClone(workbook);
      utils.sheet_add_aoa(tmp!.Sheets["Main Page"], data, { origin });

      // start the worker
      recalcWorker.postMessage(tmp);
    } else {
      setError("Your browser does not support this app.");
    }
  };

  // [ ] extract all cell references to a config file
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
            loading={loading}
          />
        </div>
        <div style={{ width: "50%" }}>
          <OutputTable
            workbook={workbook!}
            sheet="Main Page"
            cellRange="B20:C30"
            labels
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

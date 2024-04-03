"use client";

import InputGroup from "@/components/InputGroup/InputGroup";
import styles from "./page.module.css";
import * as React from "react";
import { WorkBook, read } from "xlsx";
import OutputTable from "@/components/OutputTable/OutputTable";
import nextConfig from "../../next.config.mjs";

const XLSX_CALC = require("xlsx-calc");

// install a webpack loader for this?
const MODEL_LINK = nextConfig.basePath + "/model.xlsm";

export default function Home() {
  const [workbook, setWorkbook] = React.useState<WorkBook>();

  React.useEffect(() => {
    fetch(MODEL_LINK)
      .then((res) => res.arrayBuffer())
      .then(read)
      .then(setWorkbook)
      .catch(console.error);
  }, []);

  const recalculate = (wb: WorkBook) => {
    setWorkbook(XLSX_CALC(wb));
  };

  return (
    <main className={styles.main}>
      <InputGroup
        workbook={workbook!}
        sheet="Main Page"
        cellRange="B9:C14"
        onSubmit={recalculate}
      />
      <OutputTable workbook={workbook!} cellRange="B20:C30" />
    </main>
  );
}

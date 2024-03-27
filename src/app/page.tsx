"use client";

import styles from "./page.module.css";
import * as React from "react";
import { WorkBook, read, utils } from "xlsx";
const XLSX_CALC = require("xlsx-calc");

const MODEL_LINK = "/model.xlsm";

export default function Home() {
  const [workbook, setWorkbook] = React.useState<WorkBook>();

  React.useEffect(() => {
    fetch(MODEL_LINK)
      .then((res) => res.arrayBuffer())
      .then(read)
      .then(setWorkbook)
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    if (workbook) console.log(workbook);
  }, [workbook]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tmp = structuredClone(workbook);
    utils.sheet_add_aoa(
      tmp!.Sheets["Main Page"],
      [[parseInt(e.target.value)]],
      {
        origin: "C9",
      }
    );
    /* the XLSX_CALC package has a hard time parsing implicit intersection operator but it seems like it's 
      still working?
      ex: 'Home Delivery_In Store'!C21 =VLOOKUP(@B:B,'Sub Op Table'!A:C,2,0) throws an error */
    XLSX_CALC(tmp, { continue_after_error: true });
    setWorkbook(tmp);
  };

  return (
    <main className={styles.main}>
      <h1>online-grocery</h1>
      <label>
        Online order size (C9)
        <input
          type="number"
          min={0}
          value={workbook?.Sheets["Main Page"]["C9"].v || 0}
          onChange={onInputChange}
        />
      </label>
      <label>
        Base Case Labor Time Per Order (min) (C21)
        <span>{workbook?.Sheets["Main Page"]["C21"].v}</span>
      </label>
    </main>
  );
}

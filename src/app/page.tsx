"use client";

import styles from "./page.module.css";
import * as React from "react";
import { WorkBook, read, utils } from "xlsx";

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
    if (!tmp) return;
    utils.sheet_add_aoa(tmp.Sheets["Main Page"], [[parseInt(e.target.value)]], {
      origin: "C9",
    });
    setWorkbook(tmp);
  };

  return (
    <main className={styles.main}>
      <h1>online-grocery</h1>
      <label>
        Online order size
        <input
          type="number"
          min={0}
          value={workbook?.Sheets["Main Page"]["C9"].v || 0}
          onChange={onInputChange}
        />
      </label>
      <label>
        Base Case Labor Time Per Order (min)
        <span>{workbook?.Sheets["Main Page"]["C21"].v}</span>
      </label>
    </main>
  );
}

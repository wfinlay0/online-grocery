"use client";

import styles from "./page.module.css";
import * as React from "react";
import { read } from "xlsx";

const MODEL_LINK = "/model.xlsm";

export default function Home() {
  React.useEffect(() => {
    fetch(MODEL_LINK)
      .then((res) => res.arrayBuffer())
      .then(read)
      .then(console.log)
      .catch(console.error);
  }, []);

  return (
    <main className={styles.main}>
      <h1>online-grocery</h1>
      <table></table>
    </main>
  );
}

"use client";

import InputGroup from "@/components/InputGroup/InputGroup";
import * as React from "react";
import { WorkBook, utils, read } from "xlsx";
import OutputTable from "@/components/OutputTable/OutputTable";
import nextConfig from "../../next.config.mjs";
import { InputRow } from "@/types/xlsx-types";
import styles from "./page.module.css";
import { Box, Flex, Title } from "@mantine/core";

// install a webpack loader for this?
const MODEL_LINK = nextConfig.basePath + "/modelv6.xlsm";

export default function Home() {
  const [workbook, setWorkbook] = React.useState<WorkBook>();
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
    <div>
      <Flex direction={"column"} align={"center"} my={100}>
        <Title order={1} my={10} ta={"center"}>
          Welcome to the{" "}
          <Box display={"inline"} c={"var(--mantine-primary-color-filled)"}>
            grocery store picker
          </Box>{" "}
          simulator
        </Title>
        <Box maw={1200} ta={"center"}>
          Simulate grocery store picking scenarios to inform your decisions on
          whether or not to provide full service grocery store picking based on
          a Wharton Univerity research model
        </Box>
      </Flex>
      <Flex className={styles.ioContainer} maw={1200} mx={"auto"} gap={"xl"}>
        <div>
          <InputGroup
            workbook={workbook!}
            sheet="Main Page"
            cellRange="B9:C17"
            onSubmit={onInputSubmit}
            loading={loading}
          />
        </div>
        <div>
          <OutputTable
            workbook={workbook!}
            sheet="Main Page"
            cellRange="B26:C36"
            labels
            loading={loading}
          />
        </div>
      </Flex>
    </div>
  );
}

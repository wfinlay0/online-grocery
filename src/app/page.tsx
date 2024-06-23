"use client";

import InputGroup, { InputRow } from "@/components/InputGroup/InputGroup";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";
import OutputTable from "@/components/OutputTable/OutputTable";
import nextConfig from "../../next.config.mjs";
import styles from "./page.module.css";
import { Text, Flex, Title, Box, Image } from "@mantine/core";
import { readCustom } from "@/utils/xlsx-utils";
import { SHEET_NAME, inputRange, outputRange } from "@/constants";

// install a webpack loader for this?
const MODEL_LINK = nextConfig.basePath + "/modelv7.xlsx";
const WHARTON_LOGO_URL = nextConfig.basePath + "/images/Wharton-Logo.png";
const WM_LOGO_URL = nextConfig.basePath + "/images/WestMonroe_Logo.png";

export default function Home() {
  const [workbook, setWorkbook] = React.useState<WorkBook>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    fetch(MODEL_LINK)
      .then((res) => res.arrayBuffer())
      .then(readCustom)
      .then(setWorkbook)
      .catch(console.error);
  }, []);

  const onInputSubmit = (data: CellObject[][], origin: string) => {
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

      utils.sheet_add_aoa(tmp!.Sheets[SHEET_NAME], data, {
        origin,
      });

      // start the worker
      recalcWorker.postMessage(tmp);
    } else {
      setError("Your browser does not support this app.");
    }
  };

  return (
    <Box maw={1200} mx={"auto"} mt={"md"} p={"md"}>
      <Flex wrap={"wrap"}>
        <Box maw={500}>
          <Title order={4}>What is this?</Title>
          <Text mb={10}>
            This is a grocery store picking simulation where you can create
            scenarios to inform your decisions on whether or not to provide
            full-service grocery store picking using a research model created by
            Wharton University.
          </Text>
        </Box>
        <Flex wrap={"wrap"} gap={30}>
          <Image alt="Wharton Logo" src={WHARTON_LOGO_URL} h={50} mt={5} />
          <Image alt="West Monroe logo" src={WM_LOGO_URL} h={45} mt={5} />
        </Flex>
      </Flex>
      <Flex className={styles.ioContainer} gap={"xl"} mt={"xl"}>
        <div>
          <InputGroup
            workbook={workbook!}
            sheet={SHEET_NAME}
            cellRange={inputRange}
            onSubmit={onInputSubmit}
            loading={loading}
          />
        </div>
        <div>
          <OutputTable
            workbook={workbook!}
            sheet={SHEET_NAME}
            cellRange={outputRange}
            loading={loading}
          />
        </div>
      </Flex>
    </Box>
  );
}

import { getCellRangeValues } from "@/utils/xlsx-utils";
import {
  Accordion,
  Box,
  Button,
  Flex,
  Image,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";
import { IconHelp } from "@tabler/icons-react";
import styles from "./InputGroup.module.css";
import CellInput from "./CellInput";
import nextConfig from "../../../next.config.mjs";

interface IInputGroupProps {
  workbook: WorkBook;
  sheet: string;
  /**
   * a string representing a cell range e.g. `"B9:C14"`
   * - one column will be interpreted simply as a column of numbers
   * - two columns will be interpreted as a column of labels and a column of numbers
   * - third and fourth columns are min and max, respectively
   * - fifth column is tooltips/comments
   */
  cellRange: string;
  /**
   *
   * @param content
   * @param origin the cell where the content should be reinserted (top left of the range)
   * @returns
   */
  onSubmit: (content: CellObject[][], origin: string) => void;
  loading: boolean;
}

const WHARTON_LOGO_URL = nextConfig.basePath + "/images/Wharton-Logo.png";
const WM_LOGO_URL = nextConfig.basePath + "/images/WestMonroe_Logo.png";
const SKU_TOOLTIP = "SKU Count is a calculated value equal to the sum of the Fast Moving and Slow Moving SKUs";

/**
 * renders number inputs with labels specified by a two column cell range in a sheet, also responsible for updating the
 * sheet/book and recalculating
 * @param props
 * @returns
 */
const InputGroup: React.FunctionComponent<IInputGroupProps> = (props) => {
  const [data, setData] = React.useState<CellObject[][]>();
  const [skuCount, setSkuCount] = React.useState<number>();
  // [ ] mantine use form

  React.useEffect(() => {
    const inputRows = getCellRangeValues(
      props.workbook?.Sheets[props.sheet],
      props.cellRange
    );

    setData(inputRows);
  }, [props.cellRange, props.sheet, props.workbook]);

  React.useEffect(() => {
    const _skuCount =
      (data?.[2]?.[1]?.v as number) + (data?.[3]?.[1]?.v as number);
    setSkuCount(_skuCount);
  }, [data]);

  const onInputChange = (newValue: string | number, rowIndex: number) => {
    setData((old) => {
      const tmp = old!.slice();
      tmp[rowIndex][1].v = Number(newValue);
      return tmp;
    });
  };

  // Hard coding the validation for the sake of time
  const determineMax = (idx: number): number | undefined => {
    if (idx === 2) {
      return (data?.[0]?.[1].v as number) - (data?.[3]?.[1].v as number);
    }
    if (idx === 3) {
      return (data?.[0]?.[1].v as number) - (data?.[2]?.[1].v as number);
    }
    return undefined;
  };

  return (
    data && (
      <Box className={styles.InputGroup} pos={"relative"}>
        <Box>
          <Flex wrap={"wrap"} gap={30} mb={"xl"}>
            <Image alt="Wharton Logo" src={WHARTON_LOGO_URL} h={50} />
            <Image alt="West Monroe logo" src={WM_LOGO_URL} h={45} />
          </Flex>
          <Title order={4}>What is this?</Title>
          <Text mb={20}>
            This simulator estimates the picking times for online grocery orders
            under various fulfillment options. It also calculates the additional
            revenue needed for online orders to break even with equivalent
            in-store purchases. Professors Marshall Fisher and Santiago Gallino
            from the Wharton School developed the simulation in collaboration
            with West Monroe.
          </Text>
        </Box>
        <Title order={2}>Make Your Selections</Title>
        <Accordion
          chevron={false}
          multiple
          styles={{ content: { padding: "0 0 15px" } }}
        >
          {data.map((row, idx) => (
            <Accordion.Item key={idx} value={idx.toString()}>
              <Flex justify={"space-between"} py={"xs"} wrap={"wrap"}>
                <Flex align={"center"} py={"xs"} miw={370}>
                  {utils.format_cell(row[0])}&nbsp;
                  <Flex align={"center"}>
                    <Accordion.Control
                      className={styles.infoIcon}
                      icon={<IconHelp size={17} color="lightgray" />}
                      p={0}
                    />
                  </Flex>
                </Flex>
                <CellInput
                  row={row}
                  onChange={(value) => onInputChange(value, idx)}
                  disabled={idx === 1}
                  value={(idx === 1 && skuCount) || undefined}
                  max={determineMax(idx)}
                  min={(idx === 0 && skuCount) || undefined}
                  label={(idx === 1 && SKU_TOOLTIP) || undefined}
                />
              </Flex>
              <Accordion.Panel>
                <Paper bg={"#F6F5F5"} p={"1rem"} fz={"sm"}>
                  {row[4]?.v?.toString()}
                </Paper>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
        <Flex justify={"flex-end"}>
          <Button
            className={styles.wmButton}
            my={"1em"}
            onClick={() => props.onSubmit(data, props.cellRange.split(":")[0])}
            disabled={props.loading}
          >
            Calculate
          </Button>
        </Flex>
        <Text>
          The different fulfillment options encompass various locations for
          order picking: a dedicated fulfillment center, a small dark store, a
          back room in an existing store, and directly from the store floor.
          Additionally, the options include different delivery methods: in-store
          pickup, curbside pickup, or home delivery.
        </Text>
      </Box>
    )
  );
};

export default InputGroup;

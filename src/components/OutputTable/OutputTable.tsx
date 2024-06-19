import {
  customFormat,
  getCellRangeValues,
  timeFormat,
} from "@/utils/xlsx-utils";
import { LoadingOverlay, Paper, Table, Text, Title } from "@mantine/core";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";
import CustomSpinner from "./CustomSpinner";
import BeasonOutput from "./BeasonOutput/BeasonOutput";
import { IconClock, IconPremiumRights } from "@tabler/icons-react";
import { SHEET_NAME } from "@/constants";
import OutputGRoups from "./OutputGroups";

interface IOutputTableProps {
  workbook: WorkBook;
  sheet: string;
  cellRange: string;
  loading: boolean;
}

export type TSubGroup = Map<string, TSubGroup | CellObject>;

const ROW_KEY = "Fulfillment Approach";

const OutputTable: React.FunctionComponent<IOutputTableProps> = (props) => {
  const [groups, setGroups] = React.useState<TSubGroup>(new Map());
  /* TODO: might be able to use utils.sheet_to_json here instead of custom */
  const rows = getCellRangeValues(
    props.workbook?.Sheets[SHEET_NAME],
    props.cellRange
  );

  const labelRow: CellObject[] | boolean = rows[0];

  React.useEffect(() => {
    if (!props.workbook) return;

    const output: TSubGroup = new Map();
    const xlData: any[] = utils
      .sheet_to_json(props.workbook?.Sheets[SHEET_NAME], {
        range: props.cellRange,
      })
      .sort((a, b) =>
        [a, b]
          .map((r: any) => r[ROW_KEY].split(" - ").length)
          .reduce((p, q) => p - q)
      );

    const columnKeys: string[] = Object.keys(xlData[1]);
    const rowKey = columnKeys[0];

    for (const row of xlData) {
      const groupNames: string[] = row[rowKey]
        .split(" - ")
        .map((v: string) => v.trim());
      let currentLevel = output;
      groupNames.forEach((groupName, idx) => {
        if (idx == groupNames.length - 1) {
          currentLevel.set(groupName, row);
        }

        if (!currentLevel.has(groupName)) {
          currentLevel.set(groupName, new Map());
        }

        // @ts-ignore
        currentLevel = currentLevel.get(groupName);
      });
    }

    console.log(output);
    setGroups(output);
  }, [props.workbook, props.cellRange]);

  return (
    <Paper pos="relative" withBorder p={"lg"}>
      <Text tt="uppercase" c="gray">
        Calculation
      </Text>
      <Title order={2}>Fulfillment Time & Revenue</Title>
      <LoadingOverlay
        visible={props.loading}
        loaderProps={{ children: <CustomSpinner /> }}
      />
      <OutputGRoups data={groups} />
      <Table withRowBorders={false}>
        <Table.Tbody>
          {rows &&
            rows.slice(1).map((row, i) => (
              <Table.Tr key={i} py={"lg"}>
                <Table.Td>{utils.format_cell(row[0])}</Table.Td>
                <Table.Td>
                  {/* TODO: can't use format_cell because it uses the same .w property which is unchanged by recalc */}
                  <BeasonOutput
                    value={timeFormat(customFormat(row[1]))}
                    icon={IconClock}
                    label={utils.format_cell(labelRow[1])}
                  />
                </Table.Td>
                <Table.Td>
                  {/* conditional because base case has no incremental revenue */}
                  {row[3]?.v && (
                    <BeasonOutput
                      value={`${customFormat(row[3]) * 100}%`}
                      icon={IconPremiumRights}
                      label={utils.format_cell(labelRow[3])}
                    />
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default OutputTable;

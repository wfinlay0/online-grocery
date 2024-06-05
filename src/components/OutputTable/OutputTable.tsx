import { getCellRangeValues, timeFormat } from "@/utils/xlsx-utils";
import { LoadingOverlay, Paper, Table, Text, Title } from "@mantine/core";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";
import CustomSpinner from "./CustomSpinner";
import BeasonOutput from "./BeasonOutput/BeasonOutput";
import { IconClock, IconPremiumRights } from "@tabler/icons-react";
import { SHEET_NAME } from "@/constants";

interface IOutputTableProps {
  workbook: WorkBook;
  sheet: string;
  cellRange: string;
  loading: boolean;
}

interface ISubGroup {
  name: string;
  data: CellObject[];
}

const OutputTable: React.FunctionComponent<IOutputTableProps> = (props) => {
  /* TODO: might be able to use utils.sheet_to_json here instead of custom */
  const rows = getCellRangeValues(
    props.workbook?.Sheets[SHEET_NAME],
    props.cellRange
  );

  const labelRow: CellObject[] | boolean = rows[0];

  React.useEffect(() => {
    const test: any[] = utils.sheet_to_json(
      props.workbook?.Sheets[props.sheet],
      {
        range: props.cellRange,
      }
    );
    if (!test || !test.length) return;
    const colKeys = Object.keys(test[1]);
    const rowKey = colKeys[0];
    const getGroupName = (groups: string, n: number) =>
      groups.split(" - ").map((s) => s.trim())[n];
    const groups = [
      { name: test[0][rowKey], data: test[0] }, // base case
      { name: test[7][rowKey], data: test[7] }, // fulfillment center
      {
        name: getGroupName(test[1][rowKey], 0), // in-store fulfillment
        data: [
          {
            name: getGroupName(test[1][rowKey], 1), // salesfloor
            data: [{ name: getGroupName(test[1][rowKey], 2), data: test[1] }],
          },
          {
            name: getGroupName(test[4][rowKey], 1), // backroom
            data: [],
          },
        ],
      },
      {
        name: getGroupName(test[8][rowKey], 0), // dark store
        data: [
          {
            name: getGroupName(test[8][rowKey], 1), // ship to store
            data: [],
          },
        ],
      },
    ];
    console.log(test, groups);
  });

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
      <Table withRowBorders={false}>
        <Table.Tbody>
          {rows &&
            rows.slice(1).map((row, i) => (
              <Table.Tr key={i} py={"lg"}>
                <Table.Td>{utils.format_cell(row[0])}</Table.Td>
                <Table.Td>
                  {/* TODO: can't use format_cell because it uses the same .w property which is unchanged by recalc */}
                  <BeasonOutput
                    value={timeFormat(parseInt(utils.format_cell(row[1])))}
                    icon={IconClock}
                    label={utils.format_cell(labelRow[1])}
                  />
                </Table.Td>
                <Table.Td>
                  {/* conditional because base case has no incremental revenue */}
                  {row[3]?.v && (
                    <BeasonOutput
                      value={utils.format_cell(row[3])}
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

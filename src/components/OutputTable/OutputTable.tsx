import { customFormat, getCellRangeValues } from "@/utils/xlsx-utils";
import { LoadingOverlay, Paper, Table, Text, Title } from "@mantine/core";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";
import CustomSpinner from "./CustomSpinner";
import BeasonOutput from "./BeasonOutput";
import { IconClock } from "@tabler/icons-react";

interface IOutputTableProps {
  workbook: WorkBook;
  sheet: string;
  cellRange: string;
  /**
   * if true, the first row will be interpreted as column headers, defaults to `true`
   */
  labels: boolean;
  loading: boolean;
}

interface ISubGroup {
  name: string;
  data: CellObject[];
}

const OutputTable: React.FunctionComponent<IOutputTableProps> = (props) => {
  let rows = getCellRangeValues(
    props.workbook?.Sheets["Main Page"],
    props.cellRange
  );

  const labelRow: CellObject[] | boolean = rows[0];

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
      <Table>
        {labelRow && (
          <Table.Thead>
            <Table.Tr>
              {labelRow.map((labelCell, i) => (
                <Table.Th key={i}>{utils.format_cell(labelCell)}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
        )}
        <Table.Tbody>
          {rows &&
            rows.slice(+props.labels).map((row, i) => (
              <Table.Tr key={i}>
                <Table.Td>{utils.format_cell(row[0])}</Table.Td>
                <BeasonOutput
                  value={customFormat(row[1])}
                  icon={IconClock}
                  label={utils.format_cell(labelRow[1])}
                />
              </Table.Tr>
            ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default OutputTable;

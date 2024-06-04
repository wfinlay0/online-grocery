import { customFormat, getCellRangeValues } from "@/utils/xlsx-utils";
import { LoadingOverlay, Paper, Table, Text, Title } from "@mantine/core";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";
import CustomSpinner from "./CustomSpinner";
import BeasonOutput from "./BeasonOutput";
import { IconClock, IconPremiumRights } from "@tabler/icons-react";
import { SHEET_NAME } from "@/app/page";

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
  let rows = getCellRangeValues(
    props.workbook?.Sheets[SHEET_NAME],
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
      <Table withRowBorders={false}>
        <Table.Tbody>
          {rows &&
            rows.slice(1).map((row, i) => (
              <Table.Tr key={i} py={"lg"}>
                <Table.Td>{utils.format_cell(row[0])}</Table.Td>
                <Table.Td>
                  <BeasonOutput
                    value={customFormat(row[1])}
                    icon={IconClock}
                    label={utils.format_cell(labelRow[1])}
                  />
                </Table.Td>
                <Table.Td>
                  {/* conditional because base case has no incremental revenue */}
                  {row[3]?.v && (
                    <BeasonOutput
                      value={customFormat(row[3])}
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

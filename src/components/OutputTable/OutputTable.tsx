import { getDenseCellRange } from "@/utils/xlsx-utils";
import { Table } from "@mantine/core";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";

interface IOutputTableProps {
  workbook: WorkBook;
  sheet: string;
  cellRange: string;
  /**
   * if true, the first row will be interpreted as column headers, defaults to `true`
   */
  labels: boolean;
}

const OutputTable: React.FunctionComponent<IOutputTableProps> = (props) => {
  let rows = getDenseCellRange(
    props.workbook?.Sheets["Main Page"],
    props.cellRange
  );

  const labelRow: CellObject[] | boolean = props.labels && rows[0];

  return (
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
      {rows &&
        rows.slice(+props.labels).map((row, i) => (
          <Table.Tr key={i}>
            <Table.Td>{utils.format_cell(row[0])}</Table.Td>
            <Table.Td>{utils.format_cell(row[1])}</Table.Td>
          </Table.Tr>
        ))}
    </Table>
  );
};

export default OutputTable;

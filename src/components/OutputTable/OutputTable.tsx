import { getDenseCellRange } from "@/utils/xlsx-utils";
import { Table } from "@mantine/core";
import * as React from "react";
import { CellObject, WorkBook, utils } from "xlsx";

interface IOutputTableProps {
  headers: CellObject[] | undefined;
  rows: CellObject[][] | undefined;
}

const OutputTable: React.FunctionComponent<IOutputTableProps> = (props) => {

  return (
    <Table>
        <Table.Thead>
          <Table.Tr>
            {props.headers?.map((labelCell, i) => (
              <Table.Th key={i}>{utils.format_cell(labelCell)}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
      <Table.Tbody>
        {props.rows &&
          props.rows.map((row, i) => (
            <Table.Tr key={i}>
              <Table.Td>{utils.format_cell(row[0])}</Table.Td>
              <Table.Td>{utils.format_cell(row[1])}</Table.Td>
            </Table.Tr>
          ))}
      </Table.Tbody>
    </Table>
  );
};

export default OutputTable;

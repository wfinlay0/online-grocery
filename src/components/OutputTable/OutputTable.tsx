import { getDenseCellRange } from "@/utils/xlsx-utils";
import { Table } from "@mantine/core";
import * as React from "react";
import { WorkBook } from "xlsx";

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
  const rows = getDenseCellRange(
    props.workbook?.Sheets["Main Page"],
    props.cellRange
  );

  return (
    <Table>{rows && rows.map((row, i) => <Table.Tr key={i}></Table.Tr>)}</Table>
  );
};

export default OutputTable;

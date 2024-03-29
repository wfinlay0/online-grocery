import * as React from "react";
import { WorkBook } from "xlsx";

interface IOutputTableProps {
  workbook: WorkBook;
  cellRange: string;
}

const OutputTable: React.FunctionComponent<IOutputTableProps> = (props) => {
  return <div>TODO: OutputTable</div>;
};

export default OutputTable;

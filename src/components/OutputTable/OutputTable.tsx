import * as React from "react";
import { WorkBook } from "xlsx";

interface IOutputTableProps {
  workbook: WorkBook;
  cellRange: string;
}

const OutputTable: React.FunctionComponent<IOutputTableProps> = (props) => {
  /* TODO: * output table*/
  return <div>OutputTable</div>;
};

export default OutputTable;

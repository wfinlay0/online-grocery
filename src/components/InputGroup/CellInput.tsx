import * as React from "react";
import BeasonInput from "./BeasonInput";
import { CellObject } from "xlsx";

interface ICellInputProps {
  row: CellObject[];
  onChange: (value: string | number) => void;
}

const CellInput: React.FunctionComponent<ICellInputProps> = (props) => {
  const valueCell = props.row?.[1];
  const isDecimal =
    typeof valueCell?.z === "string" && valueCell.z.slice(-1) === "%";

  const onCellInputChange = (value: string | number) => {
    props.onChange(isDecimal ? (value as number) / 100 : value);
  };

  return (
    <BeasonInput
      value={(valueCell?.v as number) * (+isDecimal * 99 + 1)}
      allowNegative={false}
      onChange={onCellInputChange}
      suffix={isDecimal ? "%" : undefined}
      min={props.row[2]?.v as number}
      max={props.row[3]?.v as number}
    />
  );
};

export default CellInput;

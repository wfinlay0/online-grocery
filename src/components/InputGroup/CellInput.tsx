import * as React from "react";
import BeasonInput from "./BeasonInput";
import { CellObject } from "xlsx";

interface ICellInputProps {
  cell: CellObject;
  onChange: (value: string | number) => void;
}

const CellInput: React.FunctionComponent<ICellInputProps> = (props) => {
  const isDecimal =
    typeof props.cell?.z === "string" && props.cell.z.slice(-1) === "%";

  const onCellInputChange = (value: string | number) => {
    props.onChange(isDecimal ? (value as number) / 100 : value);
  };

  return (
    <BeasonInput
      value={(props.cell?.v as number) * (+isDecimal * 99 + 1)}
      allowNegative={false}
      onChange={onCellInputChange}
      suffix={isDecimal ? "%" : undefined}
    />
  );
};

export default CellInput;

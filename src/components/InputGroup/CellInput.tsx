import * as React from "react";
import BeasonInput, { IBeasonInputProps } from "./BeasonInput";
import { CellObject } from "xlsx";

interface ICellInputProps extends IBeasonInputProps {
  row: CellObject[];
  onChange: (value: string | number) => void;
  label?: string;
}

/**
 * Like a Beason input but can take a row of cells with a value, min, and max
 */
const CellInput: React.FunctionComponent<ICellInputProps> = (props) => {
  const valueCell = props.row?.[1];
  const isDecimal =
    typeof valueCell?.z === "string" && valueCell.z.slice(-1) === "%";

  const onCellInputChange = (value: string | number) => {
    props.onChange(isDecimal ? (value as number) / 100 : value);
  };

  return (
    <BeasonInput
      value={props.value ?? (valueCell?.v as number) * (+isDecimal * 99 + 1)}
      allowNegative={false}
      onChange={onCellInputChange}
      suffix={isDecimal ? "%" : undefined}
      min={props.min ?? (props.row[2]?.v as number)}
      max={props.max ?? (props.row[3]?.v as number)}
      disabled={props.disabled}
      toolTip={props.label}
    />
  );
};

export default CellInput;
